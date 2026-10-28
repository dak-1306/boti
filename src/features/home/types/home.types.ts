import { StaticImageData } from "next/image";
import { CourtOption } from "@/features/bookings/types/booking-create.types";
import { BankInfo } from "@/features/profile/types/profile.types";

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

// --- Thẻ Slot Pass hiển thị tại Trang chủ ---
export interface PassSlotItem {
  id: string;
  bookingId: string;
  bookingCode: string;
  venueId: string;
  venueName: string;
  category: string;
  categorySlug?: string;
  imageUrl: string;
  address: string;
  courtName: string;
  date: string; // YYYY-MM-DD
  dateText: string; // Thứ Bảy, 26/10/2026
  timeText: string; // 17:00 - 18:00
  startTime: string; // 17:00
  originalPrice: number;
  passPrice: number;
  discountPercent: number;
  sellerName: string;
  sellerPhone: string;
  sellerBankInfo: BankInfo;
  createdAt: string;
}
