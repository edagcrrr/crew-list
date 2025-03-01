import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ICrewItem } from '../types/crew-type';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-crew-popup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule
  ],
  templateUrl: './delete-crew-popup.component.html',
  styleUrl: './delete-crew-popup.component.css'
})
export class DeleteCrewPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICrewItem,
    public dialogRef: MatDialogRef<DeleteCrewPopupComponent>
  ) {}

  onSave() {
    console.log('deleted');
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
