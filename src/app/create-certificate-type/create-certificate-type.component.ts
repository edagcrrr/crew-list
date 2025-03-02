import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CertificateTypeService } from '../services/certificate-type.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-create-certificate-type',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    MatCardModule
  ],
  templateUrl: './create-certificate-type.component.html',
  styleUrls: ['./create-certificate-type.component.css']
})
export class CreateCertificateTypeComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private certificateTypeService: CertificateTypeService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onSave() {
    if (this.form.valid) {
      this.certificateTypeService.addCertificateType(this.form.value);
      this.router.navigate(['/']);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'VALIDATION.REQUIRED';
    }
    if (control?.hasError('minlength')) {
      return controlName === 'name' 
        ? 'VALIDATION.MIN_LENGTH_3' 
        : 'VALIDATION.MIN_LENGTH_10';
    }
    return '';
  }
}
