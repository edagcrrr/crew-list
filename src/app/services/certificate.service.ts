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
    this.loadCertificates();
  }

  private loadCertificates(): void {
    const savedCertificates = localStorage.getItem('certificates');
    if (savedCertificates) {
      try {
        const parsed = JSON.parse(savedCertificates);
        this.certificates = Array.isArray(parsed) ? parsed : [];
        this.certificatesSubject.next(this.certificates);
      } catch (error) {
        this.certificates = [];
        this.certificatesSubject.next(this.certificates);
      }
    } else {
      const mockCertificateType = this.certificateTypeService.getCertificateTypeById(1);
      if (mockCertificateType) {
        this.certificates = [
          {
            id: 1,
            crewId: 1,
            certificateType: mockCertificateType,
            issueDate: new Date('2024-01-01'),
            expiryDate: new Date('2025-01-01')
          }
        ];
        this.certificatesSubject.next(this.certificates);
        this.saveCertificates();
      }
    }
  }

  private saveCertificates(): void {
    try {
      localStorage.setItem('certificates', JSON.stringify(this.certificates));
      this.certificatesSubject.next(this.certificates);
    } catch (error) {
      console.error('Error saving certificates:', error);
    }
  }

  getCertificates(): Observable<ICertificate[]> {
    return this.certificatesSubject.asObservable();
  }

  getCertificatesByCrewId(crewId: number): Observable<ICertificate[]> {
    const crewCertificates = this.certificates.filter(cert => cert.crewId === crewId);
    return new BehaviorSubject<ICertificate[]>(crewCertificates).asObservable();
  }

  getCertificateById(id: number): ICertificate | undefined {
    return this.certificates.find(cert => cert.id === id);
  }

  addCertificate(certificate: ICertificate): void {
    if (!certificate || !certificate.crewId) {
      console.error('Invalid certificate data:', certificate);
      return;
    }

    this.certificates.push(certificate);
    this.saveCertificates();
  }

  updateCertificate(certificate: ICertificate): void {
    if (!certificate || !certificate.id) {
      console.error('Invalid certificate data:', certificate);
      return;
    }

    const index = this.certificates.findIndex(c => c.id === certificate.id);
    if (index !== -1) {
      this.certificates[index] = certificate;
      this.saveCertificates();
    }
  }

  deleteCertificate(id: number): void {
    this.certificates = this.certificates.filter(c => c.id !== id);
    this.saveCertificates();
  }

  deleteCertificatesByCrewId(crewId: number): void {
    this.certificates = this.certificates.filter(c => c.crewId !== crewId);
    this.saveCertificates();
  }

  private getNextId(): number {
    return this.certificates.length > 0 
      ? Math.max(...this.certificates.map(cert => cert.id)) + 1 
      : 1;
  }
} 