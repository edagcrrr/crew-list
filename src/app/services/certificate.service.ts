import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICertificate } from '../types/crew-type';
import { CertificateTypeService } from './certificate-type.service';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private certificates: ICertificate[] = [];
  private certificatesSubject = new BehaviorSubject<ICertificate[]>([]);

  constructor(private certificateTypeService: CertificateTypeService) {
    const mockCertificateType = this.certificateTypeService.getCertificateTypeById(1);
    if (mockCertificateType) {
      this.certificates = [
        {
          id: 1,
          certificateType: mockCertificateType,
          issueDate: new Date('2024-01-01'),
          expiryDate: new Date('2025-01-01')
        }
      ];
      this.certificatesSubject.next(this.certificates);
    }
  }

  getCertificates(): Observable<ICertificate[]> {
    return this.certificatesSubject.asObservable();
  }

  getCertificateById(id: number): ICertificate | undefined {
    return this.certificates.find(cert => cert.id === id);
  }

  getCertificatesByCrewId(crewId: number): Observable<ICertificate[]> {
    return this.certificatesSubject.asObservable();
  }

  addCertificate(certificate: Omit<ICertificate, 'id'>): void {
    const newCertificate = {
      ...certificate,
      id: this.getNextId()
    };
    this.certificates.push(newCertificate);
    this.certificatesSubject.next(this.certificates);
  }

  updateCertificate(certificate: ICertificate): void {
    const index = this.certificates.findIndex(cert => cert.id === certificate.id);
    if (index !== -1) {
      this.certificates[index] = certificate;
      this.certificatesSubject.next(this.certificates);
    }
  }

  deleteCertificate(id: number): void {
    this.certificates = this.certificates.filter(cert => cert.id !== id);
    this.certificatesSubject.next(this.certificates);
  }

  private getNextId(): number {
    return this.certificates.length > 0 
      ? Math.max(...this.certificates.map(cert => cert.id)) + 1 
      : 1;
  }
} 