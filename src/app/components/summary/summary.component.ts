import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormActions } from '../../store/form.actions';
import {
  selectSelectPlan,
  selectAddOns,
  selectYourInfo,
  selectStoredValue
} from '../../store/form.selectors';
import { Observable, combineLatest, EMPTY, Subject } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';
import { AppState, FormData, YourInfo, SelectPlan, AddOn } from '../../models';
import { LocalStorageService } from '../../service/form-data.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [SidebarComponent, CommonModule, CurrencyPipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit, OnDestroy {
  summaryData$: Observable<FormData> = EMPTY;
  totalPrice$: Observable<number> = EMPTY;
  isConfirmed = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>,
    private readonly localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadStoredData();
    this.initializeObservables();
  }

  private loadStoredData(): void {
    // Load all required data from localStorage
    this.localStorageService.getData('yourInfo');
    this.localStorageService.getData('selectPlan');
    this.localStorageService.getData('addOns');

    // Subscribe to stored values and dispatch actions if data exists
    this.store
      .select(selectStoredValue('yourInfo'))
      .pipe(
        takeUntil(this.destroy$),
        filter((storedData): storedData is YourInfo => storedData !== null)
      )
      .subscribe((yourInfo) => {
        this.store.dispatch(FormActions.setYourInfo({ yourInfo }));
      });

    this.store
      .select(selectStoredValue('selectPlan'))
      .pipe(
        takeUntil(this.destroy$),
        filter((storedData): storedData is SelectPlan => storedData !== null)
      )
      .subscribe((selectPlan) => {
        this.store.dispatch(FormActions.setSelectPlan({ selectPlan }));
      });

    this.store
      .select(selectStoredValue('addOns'))
      .pipe(
        takeUntil(this.destroy$),
        filter((storedData): storedData is AddOn[] => storedData !== null)
      )
      .subscribe((addOns) => {
        this.store.dispatch(FormActions.setAddOns({ addOns }));
      });
  }

  private initializeObservables(): void {
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
        const basePrice = selectPlan?.price || 0;
        const addOnsPrice = addOns?.reduce(
          (acc, addOn) => acc + (addOn.price || 0),
          0
        ) || 0;
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

    // Clear both store and localStorage
    this.store.dispatch(FormActions.clearFormData());
    this.localStorageService.clearFormData();

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
