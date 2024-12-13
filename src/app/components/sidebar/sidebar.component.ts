import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from '../../models';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() currentStep: number = 1;
  router: Router = inject(Router);

  steps: Step[] = [
    { number: 1, label: 'YOUR INFO', route: '/sign-up/your-info' },
    { number: 2, label: 'SELECT PLAN', route: '/sign-up/select-plan' },
    { number: 3, label: 'ADD-ONS', route: '/sign-up/add-ons' },
    { number: 4, label: 'SUMMARY', route: '/sign-up/summary' },
  ];

  navigateToStep(step: Step): void {
    this.router.navigate([step.route]);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
