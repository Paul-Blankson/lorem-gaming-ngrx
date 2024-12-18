import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { FormDataService } from './service/form-data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lorem-gaming';
  constructor(
    private readonly router: Router,
    private readonly formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    if (!this.formDataService.isFormDataEmpty()) {
      this.router.navigate(['/sign-up/your-info']);
    }
  }
}
