import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormActions } from '../../store/form.actions';
import { selectSelectPlan, selectAddOns } from '../../store/form.selectors';
import { AppState } from '../../models';

@Component({
  selector: 'app-add-ons',
  imports: [SidebarComponent, CommonModule, CurrencyPipe],
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

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectSelectPlan).subscribe(selectPlan => {
      this.isYearly = selectPlan?.isYearly ?? false;
    });

    // Restore selected add-ons from store
    this.store.select(selectAddOns).subscribe(storeAddOns => {
      if (storeAddOns?.length) {
        this.addOns = this.addOns.map(addOn => {
          const savedAddOn = storeAddOns.find(saved => saved.name === addOn.name);
          return savedAddOn
            ? { ...addOn, isSelected: true }
            : addOn;
        });
      }
    });
  }

  getAddOnPrice(addOnName: string): number {
    const priceMap: Record<string, { monthly: number; yearly: number }> = {
      'Online service': { monthly: 1, yearly: 10 },
      'Larger storage': { monthly: 2, yearly: 20 },
      'Customizable Profile': { monthly: 2, yearly: 20 }
    };

    const addOnPrices = priceMap[addOnName] ?? { monthly: 0, yearly: 0 };
    return this.isYearly ? addOnPrices.yearly : addOnPrices.monthly;
  }

  toggleAddOn(index: number): void {
    const updatedAddOns = this.addOns.map((addOn, i) =>
      i === index ? { ...addOn, isSelected: !addOn.isSelected } : addOn
    );

    this.addOns = updatedAddOns;

    const selectedAddOns = updatedAddOns
      .filter(addOn => addOn.isSelected)
      .map(addOn => ({
        name: addOn.name,
        description: addOn.description,
        price: this.getAddOnPrice(addOn.name)
      }));

    this.store.dispatch(FormActions.setAddOns({ addOns: selectedAddOns }));
  }

  goBack(): void {
    this.router.navigate(['/sign-up/select-plan']);
  }

  nextStep(): void {
    this.router.navigate(['/sign-up/summary']);
  }
}
