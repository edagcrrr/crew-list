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
        nationality: 'NATIONALITIES.BRITISH',
        title: 'TITLES.MASTER_CAPTAIN',
        daysOnBoard: 180,
        dailyRate: 250,
        currency: 'USD',
        certificates: []
      },
      {
        position: 2,
        name: 'Maria',
        lastName: 'Garcia',
        nationality: 'NATIONALITIES.SPANISH',
        title: 'TITLES.CHIEF_OFFICER',
        daysOnBoard: 150,
        dailyRate: 200,
        currency: 'EUR',
        certificates: []
      },
      {
        position: 3,
        name: 'Yuki',
        lastName: 'Tanaka',
        nationality: 'NATIONALITIES.JAPANESE',
        title: 'TITLES.CHIEF_ENGINEER',
        daysOnBoard: 160,
        dailyRate: 220,
        currency: 'USD',
        certificates: []
      },
      {
        position: 4,
        name: 'Andreas',
        lastName: 'Müller',
        nationality: 'NATIONALITIES.GERMAN',
        title: 'TITLES.SECOND_OFFICER',
        daysOnBoard: 140,
        dailyRate: 180,
        currency: 'EUR',
        certificates: []
      },
      {
        position: 5,
        name: 'Elena',
        lastName: 'Popov',
        nationality: 'NATIONALITIES.RUSSIAN',
        title: 'TITLES.SECOND_ENGINEER',
        daysOnBoard: 145,
        dailyRate: 190,
        currency: 'USD',
        certificates: []
      },
      {
        position: 6,
        name: 'Marco',
        lastName: 'Rossi',
        nationality: 'NATIONALITIES.ITALIAN',
        title: 'TITLES.THIRD_OFFICER',
        daysOnBoard: 130,
        dailyRate: 170,
        currency: 'EUR',
        certificates: []
      },
      {
        position: 7,
        name: 'Sophie',
        lastName: 'Laurent',
        nationality: 'NATIONALITIES.FRENCH',
        title: 'TITLES.DECK_CADET',
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

  getTitles(): string[] {
    return [
      'TITLES.MASTER_CAPTAIN',
      'TITLES.CHIEF_OFFICER',
      'TITLES.SECOND_OFFICER',
      'TITLES.THIRD_OFFICER',
      'TITLES.CHIEF_ENGINEER',
      'TITLES.SECOND_ENGINEER',
      'TITLES.THIRD_ENGINEER',
      'TITLES.FOURTH_ENGINEER',
      'TITLES.ELECTRICAL_ENGINEER',
      'TITLES.DECK_CADET',
      'TITLES.ENGINE_CADET',
      'TITLES.BOSUN',
      'TITLES.ABLE_SEAMAN',
      'TITLES.ORDINARY_SEAMAN',
      'TITLES.OILER',
      'TITLES.WIPER',
      'TITLES.COOK',
      'TITLES.STEWARD'
    ];
  }

  getNationalities(): string[] {
    return [
      'NATIONALITIES.BRITISH',
      'NATIONALITIES.SPANISH',
      'NATIONALITIES.JAPANESE',
      'NATIONALITIES.GERMAN',
      'NATIONALITIES.RUSSIAN',
      'NATIONALITIES.ITALIAN',
      'NATIONALITIES.FRENCH',
      'NATIONALITIES.TURKISH',
      'NATIONALITIES.GREEK',
      'NATIONALITIES.DUTCH',
      'NATIONALITIES.NORWEGIAN',
      'NATIONALITIES.SWEDISH',
      'NATIONALITIES.DANISH',
      'NATIONALITIES.FINNISH',
      'NATIONALITIES.PORTUGUESE',
      'NATIONALITIES.AMERICAN',
      'NATIONALITIES.CANADIAN',
      'NATIONALITIES.AUSTRALIAN'
    ];
  }
} 