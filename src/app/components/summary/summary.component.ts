import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { FormDataService } from '../../service/form-data.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-summary',
  imports: [SidebarComponent, CurrencyPipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {
  formData: any = {};
  totalPrice: number = 0;
  isConfirmed: boolean = false;

  constructor(
    private router: Router,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.formData = this.formDataService.getFormData();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    const basePrice = this.formData.selectPlan.price;
    const addOnsPrice = this.formData.addOns.reduce(
      (acc: number, addOn: any) => acc + (addOn.price || 0),
      0
    );
    this.totalPrice = basePrice + addOnsPrice;
  }

  onSelectPlanChange(){
    this.router.navigate(['/sign-up/select-plan']);
  }

  goBack(): void {
    this.router.navigate(['/sign-up/add-ons']);
  }

  confirm(): void {
    console.log('Confirmation complete:', this.formData);
    this.isConfirmed = true;
  }
}
