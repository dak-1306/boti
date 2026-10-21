import { BookingTab } from "../types/bookings.types";

export const BOOKING_TABS: { id: BookingTab; label: string }[] = [
  { id: "confirmed", label: "Đã đặt" },
  { id: "cancelled", label: "Đã hủy" },
  { id: "rescheduled", label: "Đã dời" },
];

export const BOOKING_TEXTS = {
  headerTitle: "Lịch đặt",
  headerSubtitle: "Quản lý lịch đặt sân của bạn",
  emptyTitle: "Bạn chưa có lịch đặt nào",
  emptySubtitle:
    "Hãy đặt sân ngay để bắt đầu trải nghiệm những trận đấu thú vị!",
  bookNowBtn: "Đặt sân ngay",
  viewAllBtn: "Xem tất cả",
};
