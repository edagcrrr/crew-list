import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { ICertificate, ICrewItem } from '../types/crew-type';
import { CertificateService } from '../services/certificate.service';

@Component({
  selector: 'app-certificates-page-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    TranslateModule
  ],
  templateUrl: './certificates-page-popup.component.html',
  styleUrls: ['./certificates-page-popup.component.css']
})
export class CertificateComponentPopupComponent implements OnInit {
  certificates: ICertificate[] = [];

  constructor(
    public dialogRef: MatDialogRef<CertificateComponentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICrewItem,
    private certificateService: CertificateService
  ) {}

  ngOnInit() {
    this.certificateService.getCertificatesByCrewId(this.data.position).subscribe(certs => {
      this.certificates = certs;
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString();
  }
}
