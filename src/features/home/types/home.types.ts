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

// Kiểu dữ liệu cho Bảng giá sân
export interface PriceSlot {
  days: string; // Ví dụ: "T2 - T6" hoặc "T7 - CN"
  timeSlot: string; // Ví dụ: "06h - 16h"
  fixedPrice: string; // Giá cố định (Ví dụ: "150.000 đ")
  casualPrice: string; // Giá vãng lai (Ví dụ: "180.000 đ")
}

// Kiểu dữ liệu cho Điều khoản & Quy định
export interface VenueRuleSection {
  title: string;
  items: string[];
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
  phone?: string; // Số điện thoại liên hệ (Ví dụ: "0386558705 (Chị Lan)")
  images: string[]; // Mảng hình ảnh (images[0] dùng làm banner/card)
  imageUrl?: string; // Backward compatibility
  location: LocationState;
  markerColor: string;
  distance?: number;
  distanceText?: string;

  // Thông tin chi tiết cho Drawer
  description?: string; // Giới thiệu sân
  amenities?: string[]; // Tiện ích (Khu vực nghỉ ngơi, Bãi đỗ xe, Nhà vệ sinh, Nước uống...)
  preparationNotes?: string[]; // Lưu ý trước khi đến sân
  priceTable?: PriceSlot[]; // Danh sách bảng giá
  rules?: VenueRuleSection[]; // Điều khoản & quy định
}

export type ViewMode = "grid" | "map";

export interface FilterState {
  selectedSports: string[];
  city: string;
  district: string;
  ratingMin: number;
  openNow: boolean;
}
