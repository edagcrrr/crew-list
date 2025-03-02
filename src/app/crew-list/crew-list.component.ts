import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CrewPopupComponent } from '../crew-popup/crew-popup.component';
import { DeleteCrewPopupComponent } from '../delete-crew-popup/delete-crew-popup.component';
import { CertificateComponentPopupComponent } from '../certificates-page-popup/certificates-page-popup.component';
import { ICrewItem } from '../types/crew-type';
import { TranslateModule } from '@ngx-translate/core';
import { CrewService } from '../services/crew.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crew-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './crew-list.component.html',
  styleUrl: './crew-list.component.css'
})
export class CrewListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'lastName',
    'nationality',
    'title',
    'daysOnBoard',
    'dailyRate',
    'currency',
    'discount',
    'totalIncome',
    'actions',
  ];

  dataSource = new MatTableDataSource<ICrewItem>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private crewService: CrewService
  ) {}

  ngOnInit() {
    this.loadCrewList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private loadCrewList() {
    this.crewService.getCrewList().subscribe(crews => {
      this.dataSource.data = crews;
    });
  }

  addCrewClicked() {
    const dialogRef = this.dialog.open(CrewPopupComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCrewList();
      }
    });
  }

  createCertificateClicked() {
    this.router.navigate(['/create-certificate-type']);
  }

  userClicked(id: number) {
    this.router.navigate(['/crew-page'], { queryParams: { position: id } });
  }

  editClicked(crewItem: ICrewItem) {
    const dialogRef = this.dialog.open(CrewPopupComponent, {
      data: crewItem,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCrewList();
      }
    });
  }

  deleteClicked(position: number) {
    const dialogRef = this.dialog.open(DeleteCrewPopupComponent, {
      data: position,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crewService.deleteCrew(position);
        this.loadCrewList();
      }
    });
  }

  certificatesClicked(crewItem: ICrewItem) {
    const dialogRef = this.dialog.open(CertificateComponentPopupComponent, {
      width: '800px',
      data: {
        position: crewItem.position
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCrewList();
      }
    });
  }

  calculateTotalIncome(element: ICrewItem): string {
    if (!element.dailyRate || !element.daysOnBoard) return '';
    const baseTotal = element.dailyRate * element.daysOnBoard;
    if (!element.discount) return baseTotal.toString();
    const discountAmount = (baseTotal * element.discount) / 100;
    return (baseTotal - discountAmount).toString();
  }

  onDiscountChange(value: number, element: ICrewItem) {
    let discount = Number(value);
    
    if (isNaN(discount)) {
      discount = 0;
    } else if (discount < 0) {
      discount = 0;
    } else if (discount > 100) {
      discount = 100;
    }
    
    if (discount !== element.discount) {
      const updatedCrew: ICrewItem = {
        ...element,
        discount: discount
      };
      this.crewService.updateCrew(updatedCrew);
    }
  }
}
