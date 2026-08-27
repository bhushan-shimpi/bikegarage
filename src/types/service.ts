export type ServiceCategory = 
  | 'maintenance'
  | 'repair'
  | 'restoration'
  | 'cosmetic';

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  marathiName?: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  included: string[];
  estimatedTime?: string;
  priceStartingAt?: string;
  category: ServiceCategory;
  imageUrl: string;
  isPopular?: boolean;
}
