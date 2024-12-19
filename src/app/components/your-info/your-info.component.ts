import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AppState, YourInfo } from '../../models';
import { Store } from '@ngrx/store';
import { FormActions } from '../../store/form.actions';
import { selectStoredValue } from '../../store/form.selectors';
import { LocalStorageService } from '../../service/form-data.service';
import { Subject, takeUntil, filter } from 'rxjs';

@Component({
  selector: 'app-your-info',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './your-info.component.html',
  styleUrl: './your-info.component.css',
})
export class YourInfoComponent implements OnInit, OnDestroy {
  yourInfoForm!: FormGroup;
  private readonly destroy$ = new Subject<void>();

  fields = [
    {
      label: 'Name',
      type: 'text',
      placeholder: 'e.g. Stephen King',
      name: 'name',
      validators: [Validators.required],
      errorMessage: 'Name is required'
    },
    {
      label: 'Email Address',
      type: 'email',
      placeholder: 'e.g. stephenking@lorem.com',
      name: 'email',
      validators: [Validators.required, Validators.email],
      errorMessage: 'Valid email is required'
    },
    {
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'e.g. +1 234 567 890',
      name: 'phone',
      validators: [Validators.required],
      errorMessage: 'Phone number is required'
    },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly store: Store<AppState>,
    private readonly localStorageService: LocalStorageService
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    const formControls: { [key: string]: FormControl } = {};
    this.fields.forEach((field) => {
      formControls[field.name] = new FormControl('', field.validators);
    });
    this.yourInfoForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
    this.loadStoredData();
    this.setupFormAutosave();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadStoredData(): void {
    // First, try to get data from localStorage
    this.localStorageService.getData('yourInfo');

    // Subscribe to the stored value and pre-fill form if data exists
    this.store
      .select(selectStoredValue('yourInfo'))
      .pipe(
        takeUntil(this.destroy$),
        filter((storedData): storedData is YourInfo => storedData !== null)
      )
      .subscribe((storedData) => {
        this.yourInfoForm.patchValue({
          name: storedData.name,
          email: storedData.email,
          phone: storedData.phone,
        }, { emitEvent: false }); // Prevent infinite loop with autosave
      });
  }

  private setupFormAutosave(): void {
    // Subscribe to form value changes to save to localStorage
    this.yourInfoForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValue) => {
        if (this.yourInfoForm.valid) {
          this.localStorageService.saveData('yourInfo', formValue);
        }
      });
    }

  getErrorMessage(fieldName: string): string | null {
    const control = this.yourInfoForm.get(fieldName);
    if (control?.touched && control?.invalid) {
      const field = this.fields.find(f => f.name === fieldName);
      if (control.errors?.['required']) {
        return field?.errorMessage ?? 'This field is required';
      }
      if (control.errors?.['email']) {
        return 'Please enter a valid email address';
      }
    }
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.yourInfoForm.get(fieldName);
    return !!control?.touched && !!control?.invalid;
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.yourInfoForm.controls).forEach(key => {
      const control = this.yourInfoForm.get(key);
      control?.markAsTouched();
    });
  }

  nextStep(): void {
    this.router.navigate(['/sign-up/select-plan']);
  }

  onSubmit(): void {
    if (this.yourInfoForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    const formData = this.yourInfoForm.value;

    // Update store and localStorage
    this.store.dispatch(FormActions.setYourInfo({ yourInfo: formData }));
    this.localStorageService.saveData('yourInfo', formData);

    this.nextStep();
  }

}
