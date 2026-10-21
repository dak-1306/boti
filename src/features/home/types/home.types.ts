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

// Kiểu dữ liệu Bảng giá chi tiết cho TabPrice
export interface PriceSlot {
  days: string; // "Thứ 2 - Thứ 6", "Thứ 7 & CN"
  timeSlot: string; // "06:00 - 16:00"
  fixedPrice: string; // "150.000 đ"
  casualPrice: string; // "180.000 đ"
}

// Kiểu dữ liệu Điều khoản dạng Section cho TabRules
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

  // Thông tin chi tiết cho Venue Detail Drawer
  description?: string;
  amenities?: string[];
  preparationNotes?: string[];
  priceTable?: PriceSlot[];
  rules?: (string | VenueRuleSection)[];
}

export type ViewMode = "grid" | "map";

export interface FilterState {
  selectedSports: string[];
  city: string;
  district: string;
  ratingMin: number;
  openNow: boolean;
}
