export type ServiceCategory = 
  | 'All'
  | 'Drywall & Walls'
  | 'Painting'
  | 'Plumbing & Fixtures'
  | 'Electrical & Mounting'
  | 'Flooring & Concrete'
  | 'Carpentry & Assembly'
  | 'General Maintenance & Remodeling';

export interface HandymanService {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  pricingType: 'flat' | 'hourly' | 'sqft';
  estimatedHours: string;
  popular?: boolean;
  includedTasks: string[];
  imageUrl: string;
  keywords: string[];
}

export interface BookingDetails {
  id: string;
  createdAt: string;
  services: {
    serviceId: string;
    serviceTitle: string;
    quantity: number;
    priceEstimate: number;
  }[];
  totalEstimate: number;
  propertyType: 'residential' | 'commercial';
  address: string;
  unit?: string;
  zipCode: string;
  date: string;
  timeSlot: string;
  urgency: 'standard' | 'same_day' | 'flexible';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  photoUrl?: string;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  serviceName: string;
  comment: string;
  verified: boolean;
}

export interface BeforeAfterProject {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  duration: string;
}

export interface QuoteItem {
  serviceId: string;
  quantity: number;
}
