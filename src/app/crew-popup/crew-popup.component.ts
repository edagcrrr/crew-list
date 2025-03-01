import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CertificateAddPopupComponent } from '../certificate-add-popup/certificate-add-popup.component';
import { ICrewItem } from '../types/crew-type';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-crew-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './crew-popup.component.html',
  styleUrl: './crew-popup.component.css'
})
export class CrewPopupComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICrewItem,
    public dialogRef: MatDialogRef<CrewPopupComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      name: [data.name || ''],
      lastName: [data.lastName || ''],
      nationality: [data.nationality || ''],
      title: [data.title || ''],
      daysOnBoard: [data.daysOnBoard || ''],
      dailyRate: [data.dailyRate || ''],
      currency: [data.currency || ''],
      totalIncome: [data.totalIncome || ''],
      certificates: [data.certificates || []],
    });
  }

  onSave() {
    console.log('Form verisi:', this.form.value);
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }

  onCertificatesOpen() {
    this.dialog.open(CertificateAddPopupComponent);
  }
}
