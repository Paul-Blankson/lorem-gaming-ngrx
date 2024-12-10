import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { FormDataService } from '../../service/form-data.service';

@Component({
  selector: 'app-add-ons',
  imports: [SidebarComponent],
  templateUrl: './add-ons.component.html',
  styleUrl: './add-ons.component.css'
})
export class AddOnsComponent {
  addOns = [
    { name: 'Online service', description: 'Access to multiplayer games', price: '$1/mo', isSelected: false },
    { name: 'Larger storage', description: 'Extra 1TB of cloud save', price: '$2/mo', isSelected: false },
    { name: 'Customizable Profile', description: 'Custom theme on your profile', price: '$2/mo', isSelected: false },
  ];

  constructor(private router: Router, private formDataService: FormDataService) {}

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
  }
}
