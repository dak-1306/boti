import { Category, FilterState } from "../types/home.types";

import pickleballIcon from "@/assets/icons/pickleball.svg";
import badmintonIcon from "@/assets/icons/badminton.svg";
import tennisIcon from "@/assets/icons/tennis.svg";
import footballIcon from "@/assets/icons/football.svg";
import basketballIcon from "@/assets/icons/basketball.svg";
import volleyballIcon from "@/assets/icons/volleyball.svg";

export const HOME_TEXTS = {
  searchPlaceholder: "Tìm sân theo tên, địa chỉ...",
  filterNearest: "Sân gần nhất",
  advancedSearch: "Tìm kiếm nâng cao",
  sectionTitle: "Toàn bộ sân",
  viewGrid: "Dạng lưới",
  viewMap: "Bản đồ",
  bookBtn: "Đặt lịch",
  reviewsText: "đánh giá",
  emptyGridTitle: "Không tìm thấy sân phù hợp",
  emptyGridSubtitle: "Thử thay đổi từ khóa hoặc thiết lập lại bộ lọc nâng cao.",
  clearFilterBtn: "Xóa bộ lọc",

  // Filter Drawer Texts
  drawerTitle: "Bộ lọc tìm kiếm",
  drawerSubtitle: "Tùy chỉnh thông tin tìm kiếm sân phù hợp nhất",
  sportTypeLabel: "Bộ môn thể thao",
  locationLabel: "Khu vực",
  cityPlaceholder: "Chọn Thành phố / Tỉnh",
  districtPlaceholder: "Chọn Quận / Huyện",
  ratingLabel: "Đánh giá tối thiểu",
  openNowLabel: "Đang mở cửa",
  resetBtn: "Thiết lập lại",
  applyBtn: "Áp dụng bộ lọc",

  // Location Texts
  locating: "Đang lấy vị trí...",
  locationDenied: "Chưa cấp quyền vị trí",
  locationSuccess: "Đã sắp xếp theo vị trí gần nhất",

  // Venue Detail Texts
  galleryTitle: "Hình ảnh sân",
  noGalleryText: "Chưa có hình ảnh.",
  introTitle: "Giới thiệu sân",
  noDescriptionText: "Chưa có thông tin mô tả chi tiết.",
  amenitiesTitle: "Tiện ích tại sân",
  prepTitle: "Trước khi đến sân",
  priceTableTitle: "Bảng giá sân",
  noPriceText: "Chưa có thông tin bảng giá.",
  thDays: "Thẻ",
  thTimeSlot: "Khung giờ",
  thFixedPrice: "Cố định",
  thCasualPrice: "Vãng lai",
  rulesTitle: "Điều khoản & dịch vụ",
  noRulesText: "Chưa có điều khoản & quy định cụ thể.",
  tabDetailInfo: "Thông tin",
  tabDetailPrice: "Bảng giá",
  tabDetailGallery: "Hình ảnh",
  tabDetailRules: "Quy định",

  locationInCityLabel: "Khu vực tại",

  ratingAll: "Tất cả",
} as const;

export const DEFAULT_FILTER_STATE: FilterState = {
  selectedSports: [],
  city: "TP. Hồ Chí Minh",
  district: "",
  ratingMin: 0,
  openNow: false,
};

export const CITIES_DATA = [
  "TP. Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Bình Dương",
  "Đồng Nai",
];

export const DISTRICTS_BY_CITY: Record<string, string[]> = {
  "TP. Hồ Chí Minh": [
    "Tất cả Quận/Huyện",
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 7",
    "Quận 10",
    "Quận Bình Thạnh",
    "TP. Thủ Đức",
  ],
  "Hà Nội": [
    "Tất cả Quận/Huyện",
    "Ba Đình",
    "Hoàn Kiếm",
    "Cầu Giấy",
    "Đống Đa",
    "Hai Bà Trưng",
    "Nam Từ Liêm",
    "Hà Đông",
  ],
  "Đà Nẵng": [
    "Tất cả Quận/Huyện",
    "Hải Châu",
    "Thanh Khê",
    "Sơn Trà",
    "Ngũ Hành Sơn",
    "Cẩm Lệ",
  ],
  "Bình Dương": [
    "Tất cả Quận/Huyện",
    "Thủ Dầu Một",
    "Thuận An",
    "Dĩ An",
    "Bến Cát",
  ],
  "Đồng Nai": ["Tất cả Quận/Huyện", "Biên Hòa", "Long Thành", "Nhơn Trạch"],
};

export const CATEGORIES_DATA: Category[] = [
  { id: "pickleball", name: "Pickleball", icon: pickleballIcon },
  { id: "badminton", name: "Cầu lông", icon: badmintonIcon },
  { id: "tennis", name: "Quần vợt", icon: tennisIcon },
  { id: "football", name: "Bóng đá", icon: footballIcon },
  { id: "basketball", name: "Bóng rổ", icon: basketballIcon },
  { id: "volleyball", name: "B.Chuyền", icon: volleyballIcon },
];
