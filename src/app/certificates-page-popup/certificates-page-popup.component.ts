import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { ICertificateItem } from '../types/crew-type';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-certificates-page-popup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    CommonModule,
    MatCardModule,
    TranslateModule
  ],
  templateUrl: './certificates-page-popup.component.html',
  styleUrl: './certificates-page-popup.component.css'
})
export class CertificateComponentPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICertificateItem[],
    public dialogRef: MatDialogRef<CertificateComponentPopupComponent>
  ) {}

  onSave() {
    console.log('certificates comp');
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
