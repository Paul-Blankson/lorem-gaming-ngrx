import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData: any = {
    yourInfo: {
      name: '',
      email: '',
      phone: '',
    },
    selectPlan: {
      selectedPlan: 'Arcade',
      isYearly: false,
    },
    addOns: []
  };

  getFormData(): any {
    return this.formData;
  }

  setFormData(step: string, data: any): void {
    this.formData[step] = data;
  }
}
