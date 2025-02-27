import { Routes } from '@angular/router';
import { CrewListComponent } from './crew-list/crew-list.component';
import { CrewPageComponent } from './crew-page/crew-page.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'crew-list'
  },
  {
    path: 'crew-list',
    component: CrewListComponent
  },
  {
    path: 'crew-page',
    component: CrewPageComponent
  }
];