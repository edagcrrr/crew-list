import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CrewListComponent } from './crew-list/crew-list.component';
import { MatIconModule } from '@angular/material/icon';
import { CrewPageComponent } from './crew-page/crew-page.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppComponent,
    MatIconModule,
    CrewListComponent,
    CrewPageComponent,
    RouterModule.forRoot([]),
  ]
})

export class AppModule {}