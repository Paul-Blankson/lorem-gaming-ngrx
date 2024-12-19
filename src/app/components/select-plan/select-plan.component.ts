import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormActions } from '../../store/form.actions';
import { selectSelectPlan } from '../../store/form.selectors';
import { AppState } from '../../models';

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
    private readonly store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.store.select(selectSelectPlan).subscribe(selectPlan => {
      if (selectPlan) {
        this.selectedPlan = selectPlan.plan;
        this.isYearly = selectPlan.isYearly;
      }
    });
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
      this.store.dispatch(FormActions.setSelectPlan({
        selectPlan: {
          plan: this.selectedPlan,
          price: this.isYearly
            ? selectedPlanObj.yearlyPrice
            : selectedPlanObj.monthlyPrice,
          isYearly: this.isYearly,
        }
      }));
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
