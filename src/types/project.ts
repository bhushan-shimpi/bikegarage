export interface ProjectItem {
  id: string;
  title: string;
  bikeModel: string;
  category: 'restoration' | 'servicing' | 'painting' | 'detailing';
  yearBuilt?: string;
  problem: string;
  workDone: string[];
  result: string;
  completionTime: string;
  beforeImage: string;
  afterImage: string;
  galleryImages?: string[];
  isFeatured?: boolean;
}
