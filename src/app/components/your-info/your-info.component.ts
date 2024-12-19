import { Component, OnInit } from '@angular/core';
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
import { AppState } from '../../models';
import { Store } from '@ngrx/store';
import { FormActions } from '../../store/form.actions';
import { selectYourInfo } from '../../store/form.selectors';
@Component({
  selector: 'app-your-info',
  imports: [SidebarComponent, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './your-info.component.html',
  styleUrl: './your-info.component.css',
})
export class YourInfoComponent implements OnInit {
  yourInfoForm: FormGroup;
  fields = [
    {
      label: 'Name',
      type: 'text',
      placeholder: 'e.g. Stephen King',
      name: 'name',
      validators: [Validators.required],
    },
    {
      label: 'Email Address',
      type: 'email',
      placeholder: 'e.g. stephenking@lorem.com',
      name: 'email',
      validators: [Validators.required, Validators.email],
    },
    {
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'e.g. +1 234 567 890',
      name: 'phone',
      validators: [Validators.required],
    },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {
    const formControls: { [key: string]: FormControl } = {};
    this.fields.forEach((field) => {
      formControls[field.name] = new FormControl('', field.validators);
    });

    this.yourInfoForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
    // Pre-fill form with existing data from store
    this.store.select(selectYourInfo).subscribe(yourInfo => {
      if (yourInfo) {
        this.yourInfoForm.patchValue(yourInfo);
      }
    });
  }

  nextStep() {
    this.router.navigate(['/sign-up/select-plan']);
  }

  onSubmit(): void {
    if (this.yourInfoForm.invalid) {
      Object.keys(this.yourInfoForm.controls).forEach((key) => {
        this.yourInfoForm.controls[key].markAsTouched();
      });
    } else {
      // Dispatch action to update store
      this.store.dispatch(FormActions.setYourInfo({
        yourInfo: this.yourInfoForm.value
      }));
      this.nextStep();
    }
  }
}
