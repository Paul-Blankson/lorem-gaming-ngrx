import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-plan',
  imports: [SidebarComponent, FormsModule],
  templateUrl: './select-plan.component.html',
  styleUrl: './select-plan.component.css'
})
export class SelectPlanComponent {
  isYearly = false;
  selectedPlan = 'Arcade';

  plans = [
    { name: 'Arcade', price: '$9/mo', icon: 'images/icon-arcade.svg' },
    { name: 'Advanced', price: '$12/mo', icon: 'images/icon-advanced.svg' },
    { name: 'Pro', price: '$15/mo', icon: 'images/icon-pro.svg' },
  ];

  constructor(private router: Router) {}

  togglePlan() {
    this.isYearly = !this.isYearly;
  }

  selectPlan(plan: string) {
    this.selectedPlan = plan;
  }
  goBack(): void {
    this.router.navigate(['/sign-up/your-info']);
  }

  nextStep(): void {
    this.router.navigate(['/sign-up/add-ons']);
  }
}