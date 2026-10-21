export type BookingStatus = "confirmed" | "cancelled" | "rescheduled";
export type BookingTab = "confirmed" | "cancelled" | "rescheduled";
export type DateFilterMode = "all" | "day" | "month" | "year";

export interface BookingItem {
  id: string;
  venueId: string;
  venueName: string;
  category: string;
  imageUrl: string;
  status: BookingStatus;
  statusText: string;
  date: string; // ISO format: "2025-07-28"
  dateText: string;
  timeText: string;
  address: string;
}

export interface BookingFilterState {
  tab: BookingTab;
  filterMode: DateFilterMode;
  selectedDate?: Date; // Dùng cho mode "day"
  selectedMonth?: number; // 0 - 11, dùng cho mode "month"
  selectedYear?: number; // e.g. 2025, dùng cho mode "month" & "year"
}
