import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { CrewService } from '../services/crew.service';
import { ICrewItem, ICertificate } from '../types/crew-type';
import { CertificateService } from '../services/certificate.service';

@Component({
  selector: 'app-crew-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule
  ],
  templateUrl: './crew-page.component.html',
  styleUrl: './crew-page.component.css'
})
export class CrewPageComponent implements OnInit {
  crewMember: ICrewItem | undefined;
  certificates: ICertificate[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crewService: CrewService,
    private certificateService: CertificateService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const position = Number(params['position']);
      if (position) {
        this.crewMember = this.crewService.getCrewByPosition(position);
        if (this.crewMember) {
          this.certificateService.getCertificatesByCrewId(position).subscribe(certs => {
            this.certificates = certs;
          });
        } else {
          this.router.navigate(['/']);
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  calculateTotalIncome(): string {
    if (!this.crewMember || !this.crewMember.dailyRate || !this.crewMember.daysOnBoard) return '';
    const baseTotal = this.crewMember.dailyRate * this.crewMember.daysOnBoard;
    if (!this.crewMember.discount) return baseTotal.toString();
    const discountAmount = (baseTotal * this.crewMember.discount) / 100;
    return (baseTotal - discountAmount).toString();
  }
}
