export interface ICertificateType {
  name: string;
  description: string;
}

export interface ICertificateItem {
  certificateType: ICertificateType;
  issueDate: string;
  expiryDate: string;
}

export interface ICrewItem {
  name: string;
  lastName: string;
  nationality: string;
  title: string;
  daysOnBoard: string;
  dailyRate: string;
  currency: string;
  totalIncome: string;
  position: number;
  certificates?: ICertificateItem[];
}
