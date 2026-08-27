export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  bikeModel: string;
  serviceType: string;
  rating: number;
  comment: string;
  marathiComment?: string;
  date: string;
  verifiedCustomer: boolean;
}
