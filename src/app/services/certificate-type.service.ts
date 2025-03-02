import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ICertificateType {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CertificateTypeService {
  private certificateTypes = new BehaviorSubject<ICertificateType[]>([]);

  constructor() {
    const savedTypes = localStorage.getItem('certificateTypes');
    if (savedTypes) {
      this.certificateTypes.next(JSON.parse(savedTypes));
    }
  }

  getCertificateTypes(): Observable<ICertificateType[]> {
    return this.certificateTypes.asObservable();
  }

  getCertificateTypeById(id: number): ICertificateType | undefined {
    const types = this.certificateTypes.value;
    return types.find(type => type.id === id);
  }

  addCertificateType(type: Omit<ICertificateType, 'id'>): void {
    const currentTypes = this.certificateTypes.value;
    const newType = {
      ...type,
      id: currentTypes.length > 0 ? Math.max(...currentTypes.map(t => t.id)) + 1 : 1
    };
    
    const updatedTypes = [...currentTypes, newType];
    this.certificateTypes.next(updatedTypes);
    localStorage.setItem('certificateTypes', JSON.stringify(updatedTypes));
  }

  updateCertificateType(certificateType: ICertificateType): void {
    const currentTypes = this.certificateTypes.value;
    const index = currentTypes.findIndex(type => type.id === certificateType.id);
    if (index !== -1) {
      const updatedTypes = [
        ...currentTypes.slice(0, index),
        certificateType,
        ...currentTypes.slice(index + 1)
      ];
      this.certificateTypes.next(updatedTypes);
      localStorage.setItem('certificateTypes', JSON.stringify(updatedTypes));
    }
  }

  deleteCertificateType(id: number): void {
    const updatedTypes = this.certificateTypes.value.filter(type => type.id !== id);
    this.certificateTypes.next(updatedTypes);
    localStorage.setItem('certificateTypes', JSON.stringify(updatedTypes));
  }
} 