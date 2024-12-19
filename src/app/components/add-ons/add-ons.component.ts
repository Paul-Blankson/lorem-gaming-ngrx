import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormActions } from '../../store/form.actions';
import {
  selectSelectPlan,
  selectStoredValue,
} from '../../store/form.selectors';
import { AppState, AddOn } from '../../models';
import { LocalStorageService } from '../../service/form-data.service';
import { Subject, takeUntil, filter } from 'rxjs';

@Component({
  selector: 'app-add-ons',
  standalone: true,
  imports: [SidebarComponent, CommonModule, CurrencyPipe],
  templateUrl: './add-ons.component.html',
  styleUrl: './add-ons.component.css',
})
export class AddOnsComponent implements OnInit, OnDestroy {
  isYearly: boolean = false;
  private readonly destroy$ = new Subject<void>();

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

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>,
    private readonly localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadStoredData();
  }

  private loadStoredData(): void {
    // Load plan data to determine if yearly
    this.store
      .select(selectSelectPlan)
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectPlan) => {
        this.isYearly = selectPlan?.isYearly ?? false;
      });

    // First, try to get addOns data from localStorage
    this.localStorageService.getData('addOns');

    // Subscribe to the stored value and restore selections if data exists
    this.store
      .select(selectStoredValue('addOns'))
      .pipe(
        takeUntil(this.destroy$),
        filter((storedData): storedData is AddOn[] => storedData !== null)
      )
      .subscribe((storedAddOns) => {
        if (storedAddOns?.length) {
          this.addOns = this.addOns.map((addOn) => {
            const savedAddOn = storedAddOns.find(
              (saved) => saved.name === addOn.name
            );
            return savedAddOn ? { ...addOn, isSelected: true } : addOn;
          });
        }
      });
  }

  private saveAddOns(selectedAddOns: AddOn[]): void {
    // Update both store and localStorage
    this.store.dispatch(FormActions.setAddOns({ addOns: selectedAddOns }));
    this.localStorageService.saveData('addOns', selectedAddOns);
  }

  getAddOnPrice(addOnName: string): number {
    const addOn = this.addOns.find((a) => a.name === addOnName);
    if (!addOn) {
      return 0;
    }
    const price = this.isYearly ? addOn.yearlyPrice : addOn.monthlyPrice;
    return price;
  }

  toggleAddOn(index: number): void {
    const updatedAddOns = this.addOns.map((addOn, i) =>
      i === index ? { ...addOn, isSelected: !addOn.isSelected } : addOn
    );

    this.addOns = updatedAddOns;

    const selectedAddOns = updatedAddOns
      .filter((addOn) => addOn.isSelected)
      .map((addOn) => ({
        name: addOn.name,
        description: addOn.description,
        price: this.getAddOnPrice(addOn.name),
      }));

    this.saveAddOns(selectedAddOns);
  }

  isAddOnSelected(addOnName: string): boolean {
    return (
      this.addOns.find((addOn) => addOn.name === addOnName)?.isSelected ?? false
    );
  }

  goBack(): void {
    // Save current state before navigation
    const selectedAddOns = this.addOns
      .filter((addOn) => addOn.isSelected)
      .map((addOn) => ({
        name: addOn.name,
        description: addOn.description,
        price: this.getAddOnPrice(addOn.name),
      }));

    this.saveAddOns(selectedAddOns);
    this.router.navigate(['/sign-up/select-plan']);
  }

  nextStep(): void {
    // Save current state before navigation
    const selectedAddOns = this.addOns
      .filter((addOn) => addOn.isSelected)
      .map((addOn) => ({
        name: addOn.name,
        description: addOn.description,
        price: this.getAddOnPrice(addOn.name),
      }));

    this.saveAddOns(selectedAddOns);
    this.router.navigate(['/sign-up/summary']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
