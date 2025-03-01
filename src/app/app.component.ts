import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  selectedLanguage: string;

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'pt']);
    translate.setDefaultLang('en');
    
    const browserLang = translate.getBrowserLang();
    this.selectedLanguage = browserLang && ['en', 'fr', 'pt'].includes(browserLang) 
      ? browserLang 
      : 'en';
    
    translate.use(this.selectedLanguage);
  }

  switchLanguage(language: string) {
    this.selectedLanguage = language;
    this.translate.use(language);
  }
}
