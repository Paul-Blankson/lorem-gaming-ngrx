import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData: any = {
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

  getFormData(): any {
    return this.formData;
  }

  setFormData(step: string, data: any): void {
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
}
