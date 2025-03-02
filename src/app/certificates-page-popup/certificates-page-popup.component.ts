import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ICertificate } from '../types/crew-type';
import { CertificateService } from '../services/certificate.service';
import { CertificateAddPopupComponent } from '../certificate-add-popup/certificate-add-popup.component';

@Component({
  selector: 'app-certificates-page-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './certificates-page-popup.component.html',
  styleUrls: ['./certificates-page-popup.component.css']
})
export class CertificateComponentPopupComponent implements OnInit {
  certificates: ICertificate[] = [];

  constructor(
    public dialogRef: MatDialogRef<CertificateComponentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { position: number },
    private certificateService: CertificateService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCertificates();
  }

  loadCertificates() {
    this.certificateService.getCertificatesByCrewId(this.data.position).subscribe(certs => {
      this.certificates = certs;
    });
  }

  onAddCertificate(): void {
    const dialogRef = this.dialog.open(CertificateAddPopupComponent, {
      width: '600px',
      data: { crewId: this.data.position }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCertificates();
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
}
