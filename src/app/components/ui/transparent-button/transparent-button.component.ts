import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transparent-button',
  imports: [],
  templateUrl: './transparent-button.component.html',
  styleUrl: './transparent-button.component.css'
})
export class TransparentButtonComponent {
 @Input() isStep1: boolean = true;
}
