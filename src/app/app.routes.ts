import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { YourInfoComponent } from './components/your-info/your-info.component';
import { SelectPlanComponent } from './components/select-plan/select-plan.component';
import { AddOnsComponent } from './components/add-ons/add-ons.component';
import { SummaryComponent } from './components/summary/summary.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'sign-up',
    children: [
      { path: '', redirectTo: 'your-info', pathMatch: 'full' },
      { path: 'your-info', component: YourInfoComponent },
      { path: 'select-plan', component: SelectPlanComponent },
      { path: 'add-ons', component: AddOnsComponent },
      { path: 'summary', component: SummaryComponent },
    ],
  },
];
