export interface ICertificateType {
  id: number;
  name: string;
  description: string;
}

export interface ICertificate {
  id: number;
  crewId: number;
  certificateType: ICertificateType;
  issueDate: Date;
  expiryDate: Date;
}

export interface ICrewItem {
  position: number;
  name: string;
  lastName: string;
  nationality: string;
  title: string;
  daysOnBoard: number;
  dailyRate: number;
  currency: string;
  discount?: number;
  certificates?: ICertificate[];
}
