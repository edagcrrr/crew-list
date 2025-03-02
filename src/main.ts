import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { CrewListComponent } from './app/crew-list/crew-list.component';
import { CrewPageComponent } from './app/crew-page/crew-page.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CreateCertificateTypeComponent } from './app/create-certificate-type/create-certificate-type.component';
import { provideNativeDateAdapter } from '@angular/material/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  { path: '', component: CrewListComponent },
  { path: 'crew-page', component: CrewPageComponent },
  {
    path: 'create-certificate-type',
    component: CreateCertificateTypeComponent,
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideNativeDateAdapter(),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
});
