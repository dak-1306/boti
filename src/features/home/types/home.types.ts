import { StaticImageData } from "next/image";

export interface Category {
  id: string;
  name: string;
  icon: StaticImageData | string;
}

export interface Venue {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  openTime: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
  };
  markerColor: string; // Màu sắc hiển thị marker trên bản đồ
}

export type ViewMode = "grid" | "map";
