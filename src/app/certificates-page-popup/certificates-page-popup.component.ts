import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { ICrewItem } from '../crew-list/crew-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-certificates-page-popup',
  templateUrl: './certificates-page-popup.component.html',
  styleUrls: ['./certificates-page-popup.component.css'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
  ],
})
export class CertificateComponentPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICrewItem,
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
