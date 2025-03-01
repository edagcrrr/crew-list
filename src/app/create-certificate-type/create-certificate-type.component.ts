import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-certificate-type',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatIconModule
  ],
  templateUrl: './create-certificate-type.component.html',
  styleUrl: './create-certificate-type.component.css'
})
export class CreateCertificateTypeComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  onSave() {
    console.log('Form verisi:', this.form.value);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
