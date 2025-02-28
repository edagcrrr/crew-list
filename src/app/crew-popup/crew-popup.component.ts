import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CertificateAddPopupComponent } from '../certificate-add-popup/certificate-add-popup.component';
import { ICrewItem } from '../types/crew-type';

@Component({
  selector: 'app-crew-popup',
  templateUrl: './crew-popup.component.html',
  styleUrls: ['./crew-popup.component.css'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
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
