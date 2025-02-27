import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-crew-page',
  standalone: true,
  templateUrl: './crew-page.component.html',
  styleUrls: ['./crew-page.component.css'],
  imports: [MatTabsModule,MatCardModule,FormsModule, MatFormFieldModule, MatInputModule,MatListModule],
})

export class CrewPageComponent {
  position: number | null = null;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.position = params['position'];
    });
  }
}
