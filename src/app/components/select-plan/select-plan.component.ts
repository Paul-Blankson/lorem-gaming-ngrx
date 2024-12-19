import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormActions } from '../../store/form.actions';
import { selectStoredValue } from '../../store/form.selectors';
import { AppState, SelectPlan } from '../../models';
import { LocalStorageService } from '../../service/form-data.service';
import { Subject, takeUntil, filter } from 'rxjs';

@Component({
  selector: 'app-select-plan',
  standalone: true,
  imports: [SidebarComponent, FormsModule, CurrencyPipe],
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.css'],
})
export class SelectPlanComponent implements OnInit, OnDestroy {
  isYearly = false;
  selectedPlan = '';
  private readonly destroy$ = new Subject<void>();

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
    private readonly localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadStoredData();
  }

  private loadStoredData(): void {
    // First, try to get data from localStorage
    this.localStorageService.getData('selectPlan');

    // Subscribe to the stored value and pre-fill form if data exists
    this.store
      .select(selectStoredValue('selectPlan'))
      .pipe(
        takeUntil(this.destroy$),
        filter((storedData): storedData is SelectPlan => storedData !== null)
      )
      .subscribe((storedData) => {
        this.selectedPlan = storedData.plan;
        this.isYearly = storedData.isYearly;
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
      const planData = {
        plan: this.selectedPlan,
        price: this.isYearly
          ? selectedPlanObj.yearlyPrice
          : selectedPlanObj.monthlyPrice,
        isYearly: this.isYearly,
      };

      // Update both store and localStorage
      this.store.dispatch(FormActions.setSelectPlan({
        selectPlan: planData
      }));

      this.localStorageService.saveData('selectPlan', planData);
    }
  }

  isPlanSelected(planName: string): boolean {
    return this.selectedPlan === planName;
  }

  getPlanPrice(plan: { monthlyPrice: number; yearlyPrice: number }): number {
    return this.isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  }

  goBack(): void {
    this.router.navigate(['/sign-up/your-info']);
  }

  nextStep(): void {
    if (this.selectedPlan) {
      // Save final state before navigation
      this.updateFormData();
      this.router.navigate(['/sign-up/add-ons']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
