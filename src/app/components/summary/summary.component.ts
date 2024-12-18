import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormActions } from '../../store/form.actions';
import {
  selectSelectPlan,
  selectAddOns,
  selectYourInfo
} from '../../store/form.selectors';
import { Observable, combineLatest, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState, FormData } from '../../models';

@Component({
  selector: 'app-summary',
  imports: [SidebarComponent, CommonModule, CurrencyPipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {
  summaryData$: Observable<FormData> = EMPTY;
  totalPrice$: Observable<number> = EMPTY;
  isConfirmed = false;

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // Combine data from different selectors
    this.summaryData$ = combineLatest([
      this.store.select(selectYourInfo),
      this.store.select(selectSelectPlan),
      this.store.select(selectAddOns)
    ]).pipe(
      map(([yourInfo, selectPlan, addOns]) => ({
        yourInfo,
        selectPlan,
        addOns
      }))
    );

    // Calculate total price
    this.totalPrice$ = combineLatest([
      this.store.select(selectSelectPlan),
      this.store.select(selectAddOns)
    ]).pipe(
      map(([selectPlan, addOns]) => {
        const basePrice = selectPlan.price;
        const addOnsPrice = addOns.reduce(
          (acc, addOn) => acc + (addOn.price || 0),
          0
        );
        return basePrice + addOnsPrice;
      })
    );
  }

  onSelectPlanChange(): void {
    this.router.navigate(['/sign-up/select-plan']);
  }

  goBack(): void {
    this.router.navigate(['/sign-up/add-ons']);
  }

  confirm(): void {
    this.isConfirmed = true;
    // Clear form data in the store
    this.store.dispatch(FormActions.clearFormData());

    // Navigate back to home after 3 seconds
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
}
