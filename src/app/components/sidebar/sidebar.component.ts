import { Component, Input } from '@angular/core';

interface Step {
  number: number;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() currentStep: number = 1;

  steps: Step[] = [
    { number: 1, label: 'YOUR INFO' },
    { number: 2, label: 'SELECT PLAN' },
    { number: 3, label: 'ADD-ONS' },
    { number: 4, label: 'SUMMARY' }
  ];
}
