import { StaticImageData } from "next/image";

export interface Category {
  id: string;
  name: string;
  icon: StaticImageData | string;
}

export interface LocationState {
  lat: number;
  lng: number;
}

export interface Venue {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  city?: string;
  district?: string;
  openTime: string;
  imageUrl: string;
  location: LocationState;
  markerColor: string;
  distance?: number;
  distanceText?: string;
}

export type ViewMode = "grid" | "map";

export interface FilterState {
  selectedSports: string[];
  city: string;
  district: string;
  ratingMin: number;
  openNow: boolean;
}
