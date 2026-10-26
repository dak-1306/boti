import { StaticImageData } from "next/image";
import { CourtOption } from "@/features/bookings/types/booking-create.types";

export interface Category {
  id: string;
  name: string;
  icon: StaticImageData | string;
}

export interface LocationState {
  lat: number;
  lng: number;
}

export interface PriceSlot {
  days: string;
  timeSlot: string;
  fixedPrice: string;
  casualPrice: string;
}

export interface VenueRuleSection {
  title: string;
  items: string[];
}

export interface Venue {
  id: string;
  name: string;
  category: string;
  categorySlug?: string;
  rating: number;
  reviewCount: number;
  priceRange?: string;
  address: string;
  city?: string;
  district?: string;
  openTime?: string;
  phone?: string;
  images: string[];
  imageUrl?: string;
  location: LocationState;
  markerColor?: string;
  distanceKm?: number;
  distance?: number;
  distanceText?: string;
  description?: string;
  amenities?: string[];
  preparationNotes?: string[];
  priceTable?: PriceSlot[];
  rules?: (string | VenueRuleSection)[];
  courts?: CourtOption[];
}

export type ViewMode = "grid" | "map";

export interface FilterState {
  selectedSports: string[];
  city: string;
  district: string;
  ratingMin: number;
  openNow: boolean;
}
