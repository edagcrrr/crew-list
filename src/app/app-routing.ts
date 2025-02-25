import { Routes } from '@angular/router';
import { CrewListComponent } from './crew-list/crew-list.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'crew-list'
  },
  {
    path: 'crew-list',
    component: CrewListComponent
  }
];