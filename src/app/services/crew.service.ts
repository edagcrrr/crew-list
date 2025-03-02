import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICrewItem } from '../types/crew-type';

@Injectable({
  providedIn: 'root'
})
export class CrewService {
  private crewList = new BehaviorSubject<ICrewItem[]>([]);

  constructor() {
    const mockData: ICrewItem[] = [
      {
        position: 1,
        name: 'John',
        lastName: 'Smith',
        nationality: 'British',
        title: 'Captain',
        daysOnBoard: 180,
        dailyRate: 250,
        currency: 'USD',
        certificates: []
      },
      {
        position: 2,
        name: 'Maria',
        lastName: 'Garcia',
        nationality: 'Spanish',
        title: 'Chief Officer',
        daysOnBoard: 150,
        dailyRate: 200,
        currency: 'EUR',
        certificates: []
      },
      {
        position: 3,
        name: 'Yuki',
        lastName: 'Tanaka',
        nationality: 'Japanese',
        title: 'Chief Engineer',
        daysOnBoard: 160,
        dailyRate: 220,
        currency: 'USD',
        certificates: []
      },
      {
        position: 4,
        name: 'Andreas',
        lastName: 'Müller',
        nationality: 'German',
        title: 'Second Officer',
        daysOnBoard: 140,
        dailyRate: 180,
        currency: 'EUR',
        certificates: []
      },
      {
        position: 5,
        name: 'Elena',
        lastName: 'Popov',
        nationality: 'Russian',
        title: 'Second Engineer',
        daysOnBoard: 145,
        dailyRate: 190,
        currency: 'USD',
        certificates: []
      },
      {
        position: 6,
        name: 'Marco',
        lastName: 'Rossi',
        nationality: 'Italian',
        title: 'Third Officer',
        daysOnBoard: 130,
        dailyRate: 170,
        currency: 'EUR',
        certificates: []
      },
      {
        position: 7,
        name: 'Sophie',
        lastName: 'Laurent',
        nationality: 'French',
        title: 'Deck Cadet',
        daysOnBoard: 120,
        dailyRate: 100,
        currency: 'EUR',
        certificates: []
      }
    ];

    this.crewList.next(mockData);
  }

  getCrewList(): Observable<ICrewItem[]> {
    return this.crewList.asObservable();
  }

  addCrew(crew: Omit<ICrewItem, 'position'>): void {
    const currentCrew = this.crewList.value;
    const newCrew = {
      ...crew,
      position: currentCrew.length > 0 ? Math.max(...currentCrew.map(c => c.position)) + 1 : 1,
      certificates: crew.certificates || []
    };
    
    const updatedCrew = [...currentCrew, newCrew];
    this.crewList.next(updatedCrew);
  }

  updateCrew(crew: ICrewItem): void {
    const currentCrew = this.crewList.value;
    const index = currentCrew.findIndex(c => c.position === crew.position);
    
    if (index !== -1) {
      const updatedCrew = [
        ...currentCrew.slice(0, index),
        {
          ...crew,
          certificates: crew.certificates || []
        },
        ...currentCrew.slice(index + 1)
      ];
      this.crewList.next(updatedCrew);
    }
  }

  deleteCrew(position: number): void {
    const updatedCrew = this.crewList.value.filter(crew => crew.position !== position);
    this.crewList.next(updatedCrew);
  }

  getCrewByPosition(position: number): ICrewItem | undefined {
    return this.crewList.value.find(crew => crew.position === position);
  }
} 