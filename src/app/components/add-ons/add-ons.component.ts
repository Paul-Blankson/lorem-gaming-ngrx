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
    { name: 'Online service', description: 'Access to multiplayer games', monthlyPrice: 1, yearlyPrice: 10, isSelected: false },
    { name: 'Larger storage', description: 'Extra 1TB of cloud save', monthlyPrice: 2, yearlyPrice: 20, isSelected: false },
    { name: 'Customizable Profile', description: 'Custom theme on your profile', monthlyPrice: 2, yearlyPrice: 20, isSelected: false },
  ];

  constructor(private router: Router, private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.isYearly = this.formDataService.getFormData().selectPlan.isYearly;
  }

  toggleAddOn(index: number): void {
    this.addOns[index].isSelected = !this.addOns[index].isSelected;
  }

  goBack(): void {
    this.router.navigate(['/sign-up/select-plan']);
  }

  nextStep(): void {
    const selectedAddOns = this.addOns.filter(addOn => addOn.isSelected);
    this.formDataService.setFormData('addOns', selectedAddOns);
    this.router.navigate(['/sign-up/summary']);
    console.log(this.formDataService.getFormData());
  }
}
