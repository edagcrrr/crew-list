import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { CertificateTypeService, ICertificateType } from '../services/certificate-type.service';

@Component({
  selector: 'app-certificate-add-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './certificate-add-popup.component.html',
  styleUrl: './certificate-add-popup.component.css'
})
export class CertificateAddPopupComponent implements OnInit {
  form: FormGroup;
  certificateTypes: ICertificateType[] = [];

  constructor(
    public dialogRef: MatDialogRef<CertificateAddPopupComponent>,
    private fb: FormBuilder,
    private certificateTypeService: CertificateTypeService
  ) {
    this.form = this.fb.group({
      certificateType: ['', Validators.required],
      issueDate: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.certificateTypeService.getCertificateTypes().subscribe(types => {
      this.certificateTypes = types;
    });
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
