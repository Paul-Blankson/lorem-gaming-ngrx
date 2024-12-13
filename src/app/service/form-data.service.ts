import { Injectable } from '@angular/core';
import { FormData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData: FormData = {
    yourInfo: {
      name: '',
      email: '',
      phone: '',
    },
    selectPlan: {
      plan: '',
      price: 0,
      isYearly: false,
    },
    addOns: [],
  };

  constructor() {
    this.loadFormDataFromLocalStorage();
  }

  private saveFormDataToLocalStorage(): void {
    localStorage.setItem('formData', JSON.stringify(this.formData));
  }

  private loadFormDataFromLocalStorage(): void {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      this.formData = JSON.parse(savedData);
    }
  }

  getFormData(): FormData {
    return this.formData;
  }

  setFormData<K extends keyof FormData>(step: K, data: FormData[K]): void {
    this.formData[step] = data;
    this.saveFormDataToLocalStorage();
  }

  clearFormData(): void {
    this.formData = {
      yourInfo: {
        name: '',
        email: '',
        phone: '',
      },
      selectPlan: {
        plan: '',
        price: 0,
        isYearly: false,
      },
      addOns: [],
    };
    localStorage.removeItem('formData');
  }
  isFormDataEmpty(): boolean {
    return (
      !this.formData.yourInfo.name &&
      !this.formData.yourInfo.email &&
      !this.formData.yourInfo.phone &&
      !this.formData.selectPlan.plan
    );
  }
}
