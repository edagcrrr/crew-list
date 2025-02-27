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

@Component({
  selector: 'app-delete-crew-popup',
  templateUrl: './delete-crew-popup.component.html',
  styleUrls: ['./delete-crew-popup.component.css'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
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
