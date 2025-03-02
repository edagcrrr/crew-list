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
import { CrewService } from '../services/crew.service';

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
  isEditMode: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICrewItem,
    public dialogRef: MatDialogRef<CrewPopupComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private crewService: CrewService
  ) {
    this.isEditMode = !!data.position;
    this.form = this.fb.group({
      name: [data.name || ''],
      lastName: [data.lastName || ''],
      nationality: [data.nationality || ''],
      title: [data.title || ''],
      daysOnBoard: [data.daysOnBoard || ''],
      dailyRate: [data.dailyRate || ''],
      currency: [data.currency || ''],
      certificates: [data.certificates || []],
    });
  }

  get totalIncome(): number | string {
    const dailyRate = this.form.get('dailyRate')?.value;
    const daysOnBoard = this.form.get('daysOnBoard')?.value;
    return dailyRate && daysOnBoard ? dailyRate * daysOnBoard : '';
  }

  onSave() {
    if (this.form.valid) {
      const formData = this.form.value;
      
      if (this.isEditMode) {
        const updatedCrew: ICrewItem = {
          ...formData,
          position: this.data.position
        };
        this.crewService.updateCrew(updatedCrew);
      } else {
        this.crewService.addCrew(formData);
      }
      
      this.dialogRef.close(true);
    }
  }

  onClose() {
    this.dialogRef.close(false);
  }

  onCertificatesOpen() {
    this.dialog.open(CertificateAddPopupComponent);
  }
}
