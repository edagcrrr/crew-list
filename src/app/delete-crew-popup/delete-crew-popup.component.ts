import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-crew-popup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    TranslateModule
  ],
  templateUrl: './delete-crew-popup.component.html',
  styleUrl: './delete-crew-popup.component.css'
})
export class DeleteCrewPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public dialogRef: MatDialogRef<DeleteCrewPopupComponent>
  ) {}

  onSave() {
    this.dialogRef.close(true);
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
