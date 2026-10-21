export type BookingStatus = "confirmed" | "cancelled" | "rescheduled";
export type BookingTab = "confirmed" | "cancelled" | "rescheduled";

export interface BookingItem {
  id: string;
  venueId: string;
  venueName: string;
  category: string;
  imageUrl: string;
  status: BookingStatus;
  statusText: string;
  date: string; // Dùng để so sánh chuẩn xác: "2025-07-28"
  dateText: string; // Dùng để hiển thị UI: "Thứ 2, 28/07/2025"
  timeText: string;
  address: string;
}

// State quản lý chung toàn bộ Bộ lọc Lịch đặt
export interface BookingFilterState {
  tab: BookingTab;
  selectedDate?: Date;
}
