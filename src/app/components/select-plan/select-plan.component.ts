import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../../service/form-data.service';

@Component({
  selector: 'app-select-plan',
  imports: [SidebarComponent, FormsModule, CurrencyPipe],
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.css'],
})
export class SelectPlanComponent implements OnInit {
  isYearly = false;
  selectedPlan = '';

  plans = [
    {
      name: 'Arcade',
      monthlyPrice: 9,
      yearlyPrice: 90,
      icon: 'images/icon-arcade.svg',
    },
    {
      name: 'Advanced',
      monthlyPrice: 12,
      yearlyPrice: 120,
      icon: 'images/icon-advanced.svg',
    },
    {
      name: 'Pro',
      monthlyPrice: 15,
      yearlyPrice: 150,
      icon: 'images/icon-pro.svg',
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    const existingFormData = this.formDataService.getFormData();

    if (existingFormData.selectPlan && existingFormData.selectPlan.plan) {
      this.selectedPlan = existingFormData.selectPlan.plan;
      this.isYearly = existingFormData.selectPlan.isYearly;
    } else {
      // Default to first plan if no existing data
      this.selectedPlan = this.plans[0].name;
    }

    this.updateFormData();
  }

  togglePlan(): void {
    this.isYearly = !this.isYearly;
    this.updateFormData();
  }

  selectPlan(plan: string): void {
    this.selectedPlan = plan;
    this.updateFormData();
  }

  updateFormData(): void {
    const selectedPlanObj = this.plans.find(
      (plan) => plan.name === this.selectedPlan
    );

    if (selectedPlanObj) {
      this.formDataService.setFormData('selectPlan', {
        plan: this.selectedPlan,
        price: this.isYearly
          ? selectedPlanObj.yearlyPrice
          : selectedPlanObj.monthlyPrice,
        isYearly: this.isYearly,
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/sign-up/your-info']);
  }

  nextStep(): void {
    if (this.selectedPlan) {
      this.router.navigate(['/sign-up/add-ons']);
    }
  }
}
