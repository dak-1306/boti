import { Category, Venue } from "../types/home.types";

// Import các icon từ đường dẫn assets/icons
import pickleballIcon from "@/assets/icons/pickleball.svg";
import badmintonIcon from "@/assets/icons/badminton.svg";
import tennisIcon from "@/assets/icons/tennis.svg";
import footballIcon from "@/assets/icons/football.svg";
import basketballIcon from "@/assets/icons/basketball.svg";
import volleyballIcon from "@/assets/icons/volleyball.svg";

export const HOME_TEXTS = {
  searchPlaceholder: "Tìm sân theo tên, địa chỉ...",
  filterNearest: "Sân gần nhất",
  filterRegion: "Khu vực",
  sectionTitle: "Toàn bộ sân",
  viewGrid: "Dạng lưới",
  viewMap: "Bản đồ",
  bookBtn: "Đặt lịch",
  reviewsText: "đánh giá",
} as const;

export const CATEGORIES_DATA: Category[] = [
  {
    id: "pickleball",
    name: "Pickleball",
    icon: pickleballIcon,
  },
  {
    id: "badminton",
    name: "Cầu lông",
    icon: badmintonIcon,
  },
  {
    id: "tennis",
    name: "Quần vợt",
    icon: tennisIcon,
  },
  {
    id: "football",
    name: "Bóng đá",
    icon: footballIcon,
  },
  {
    id: "basketball",
    name: "Bóng rổ",
    icon: basketballIcon,
  },
  {
    id: "volleyball",
    name: "B.Chuyền",
    icon: volleyballIcon,
  },
];

export const VENUES_DATA: Venue[] = [
  {
    id: "v1",
    name: "Sân Pickleball 291",
    category: "Pickleball",
    rating: 3.4,
    reviewCount: 10,
    address: "142/5A Hoàng Dư Khương, Q.10, TP.HCM",
    openTime: "05:00 - 23:00",
    imageUrl:
      "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?w=500&auto=format&fit=crop&q=60",
    location: { lat: 10.778, lng: 106.669 },
    markerColor: "#0284c7", // Sky/Blue
  },
  {
    id: "v2",
    name: "Sân cầu lông Riverside",
    category: "Cầu lông",
    rating: 5.0,
    reviewCount: 110,
    address: "239/10 Nguyễn Duy Trinh, Q.2, TP.HCM",
    openTime: "12:00 - 22:00",
    imageUrl:
      "https://images.unsplash.com/photo-1626225967045-944088226228?w=500&auto=format&fit=crop&q=60",
    location: { lat: 10.789, lng: 106.735 },
    markerColor: "#10b981", // Emerald
  },
  {
    id: "v3",
    name: "Sân bóng đá An Phú",
    category: "Bóng đá",
    rating: 4.8,
    reviewCount: 45,
    address: "An Phú, Q.2, TP.HCM",
    openTime: "06:00 - 22:00",
    imageUrl:
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500&auto=format&fit=crop&q=60",
    location: { lat: 10.801, lng: 106.742 },
    markerColor: "#059669", // Teal/Green
  },
  {
    id: "v4",
    name: "Sân bóng rổ 3x3 Hoops",
    category: "Bóng rổ",
    rating: 4.6,
    reviewCount: 28,
    address: "Lê Văn Lương, Q.7, TP.HCM",
    openTime: "07:00 - 21:00",
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&auto=format&fit=crop&q=60",
    location: { lat: 10.732, lng: 106.711 },
    markerColor: "#f97316", // Orange/Amber
  },
];
