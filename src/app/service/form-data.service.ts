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
    addOns: {
      name: '',
      description: '',
      price: 0
    },
  };

  getFormData(): any {
    return this.formData;
  }

  setFormData(step: string, data: any): void {
    this.formData[step] = data;
  }
}
