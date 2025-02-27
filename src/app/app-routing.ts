import { Routes } from '@angular/router';
import { CrewListComponent } from './crew-list/crew-list.component';
import { CrewPageComponent } from './crew-page/crew-page.component';
import { CreateCertificateTypeComponent } from './create-certificate-type/create-certificate-type.component';

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
  },
  {
    path: 'create-certificate-type',
    component: CreateCertificateTypeComponent
  }
];