import { Component } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-certificate-add-popup',
  templateUrl: './certificate-add-popup.component.html',
  styleUrls: ['./certificate-add-popup.component.css'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class CertificateAddPopupComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CertificateAddPopupComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
  }

  onSave() {
    console.log('Form verisi:', this.form.value);
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }
}
