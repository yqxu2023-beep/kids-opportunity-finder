export type Opportunity = {
  id: string;
  title: string;
  provider: string;
  category: string;
  description: string;
  city: string;
  ageMin: number;
  ageMax: number;
  isFree: boolean;
  cost: string;
  schedule: string;
  startDate?: string;
  endDate?: string;
  location: string;
  registrationUrl: string;
};
