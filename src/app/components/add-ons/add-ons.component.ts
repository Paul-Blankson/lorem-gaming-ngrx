import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { FormDataService } from '../../service/form-data.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-add-ons',
  imports: [SidebarComponent, CurrencyPipe],
  templateUrl: './add-ons.component.html',
  styleUrl: './add-ons.component.css'
})
export class AddOnsComponent implements OnInit {
  isYearly: boolean = false;

  addOns = [
    {
      name: 'Online service',
      description: 'Access to multiplayer games',
      monthlyPrice: 1,
      yearlyPrice: 10,
      isSelected: false,
    },
    {
      name: 'Larger storage',
      description: 'Extra 1TB of cloud save',
      monthlyPrice: 2,
      yearlyPrice: 20,
      isSelected: false,
    },
    {
      name: 'Customizable Profile',
      description: 'Custom theme on your profile',
      monthlyPrice: 2,
      yearlyPrice: 20,
      isSelected: false,
    },
  ];

  constructor(private readonly router: Router, private readonly formDataService: FormDataService) {}

  ngOnInit(): void {
    const existingFormData = this.formDataService.getFormData();
    this.isYearly = existingFormData.selectPlan.isYearly;

    if (existingFormData.addOns && existingFormData.addOns.length) {
      // Restore selected add-ons
      this.addOns = this.addOns.map(addOn => {
        const savedAddOn = existingFormData.addOns.find((saved: any) => saved.name === addOn.name);
        return savedAddOn
          ? { ...addOn, isSelected: true }
          : addOn;
      });
    }
  }

  toggleAddOn(index: number): void {
    this.addOns[index].isSelected = !this.addOns[index].isSelected;
    this.updateFormData();
  }

  updateFormData(): void {
    const selectedAddOns = this.addOns
      .filter(addOn => addOn.isSelected)
      .map(addOn => ({
        name: addOn.name,
        description: addOn.description,
        price: this.isYearly ? addOn.yearlyPrice : addOn.monthlyPrice
      }));

    this.formDataService.setFormData('addOns', selectedAddOns);
  }

  goBack(): void {
    this.router.navigate(['/sign-up/select-plan']);
  }

  nextStep(): void {
    this.updateFormData();
    this.router.navigate(['/sign-up/summary']);
  }
}
