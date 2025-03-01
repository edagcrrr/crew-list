import { AfterViewInit, Component, ViewChild } from '@angular/core';
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

const ELEMENT_DATA: ICrewItem[] = [
  {
    position: 1,
    name: 'Eda',
    lastName: 'Gecer',
    nationality: 'Turkish',
    title: 'Captain',
    daysOnBoard: '3',
    dailyRate: '150',
    currency: 'USD',
    totalIncome: '1800',
    certificates: [
      {
        certificateType: {
          name: 'Deneme1',
          description: 'DenemeDesc',
        },
        issueDate: '12/12/15',
        expiryDate: '12/12/2026',
      },
      {
        certificateType: {
          name: 'Deneme2',
          description: 'Deneme2Desc',
        },
        issueDate: '12/12/15',
        expiryDate: '12/12/2026',
      },
    ],
  },
  {
    position: 2,
    name: 'Eda2',
    lastName: 'Gecer',
    nationality: 'Turkish',
    title: 'Captain',
    daysOnBoard: '3',
    dailyRate: '150',
    currency: 'USD',
    totalIncome: '1800',
  },
  {
    position: 3,
    name: 'Eda3',
    lastName: 'Gecer',
    nationality: 'Turkish',
    title: 'Captain',
    daysOnBoard: '3',
    dailyRate: '150',
    currency: 'USD',
    totalIncome: '1800',
  },
  {
    position: 4,
    name: 'Eda4',
    lastName: 'Gecer',
    nationality: 'Turkish',
    title: 'Captain',
    daysOnBoard: '3',
    dailyRate: '150',
    currency: 'USD',
    totalIncome: '1800',
  },
  {
    position: 5,
    name: 'Eda5',
    lastName: 'Gecer',
    nationality: 'Turkish',
    title: 'Captain',
    daysOnBoard: '3',
    dailyRate: '150',
    currency: 'USD',
    totalIncome: '1800',
  },
];

@Component({
  selector: 'app-crew-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule
  ],
  templateUrl: './crew-list.component.html',
  styleUrl: './crew-list.component.css'
})
export class CrewListComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'position',
    'name',
    'lastName',
    'nationality',
    'title',
    'daysOnBoard',
    'dailyRate',
    'currency',
    'totalIncome',
    'actions',
  ];

  dataSource = new MatTableDataSource<ICrewItem>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addCrewClicked() {
    this.dialog.open(CrewPopupComponent, {
      data: {},
    });
  }

  createCertificateClicked() {
    this.router.navigate(['/create-certificate-type']);
  }

  userClicked(id: number) {
    this.router.navigate(['/crew-page'], { queryParams: { position: id } });
  }

  editClicked(crewItem: ICrewItem) {
    this.dialog.open(CrewPopupComponent, {
      data: crewItem,
    });
  }

  deleteClicked(position: number) {
    this.dialog.open(DeleteCrewPopupComponent, {
      data: position,
    });
  }

  certificatesClicked(crewItem: ICrewItem) {
    this.dialog.open(CertificateComponentPopupComponent, {
      data: crewItem.certificates,
    });
  }
}
