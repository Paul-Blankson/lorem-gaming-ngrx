import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CustomButtonComponent } from '../ui/custom-button/custom-button.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-your-info',
  imports: [SidebarComponent, CustomButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './your-info.component.html',
  styleUrl: './your-info.component.css'
})
export class YourInfoComponent {
  yourInfoForm: FormGroup;
  fields = [
    { label: 'Name', type: 'text', placeholder: 'e.g. Stephen King', name: 'name', validators: [Validators.required] },
    { label: 'Email Address', type: 'email', placeholder: 'e.g. stephenking@lorem.com', name: 'email', validators: [Validators.required, Validators.email] },
    { label: 'Phone Number', type: 'tel', placeholder: 'e.g. +1 234 567 890', name: 'phone', validators: [Validators.required] },
  ];

  constructor(private fb: FormBuilder) {
    const formControls: { [key: string]: FormControl } = {};
    this.fields.forEach(field => {
      formControls[field.name] = new FormControl('', field.validators);
    });

    this.yourInfoForm = this.fb.group(formControls);
  }

  onSubmit(): void {
    if (this.yourInfoForm.invalid) {
      Object.keys(this.yourInfoForm.controls).forEach((key) => {
        this.yourInfoForm.controls[key].markAsTouched();
      });
    } else {
      console.log('Form submitted:', this.yourInfoForm.value);
    }
  }
}
