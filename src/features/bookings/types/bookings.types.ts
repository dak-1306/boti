import { BankInfo } from "@/features/profile/types/profile.types";

export type BookingStatus =
  | "confirmed"
  | "cancelled"
  | "rescheduled"
  | "passing"
  | "passed_success";

export type BookingTab =
  | "confirmed"
  | "passing"
  | "rescheduled"
  | "cancelled"
  | "passed_success";
export type DateFilterMode = "all" | "day" | "month" | "year";

export interface BookingPaymentInfo {
  method: string;
  status: "paid" | "pending" | "refunded";
  statusText: string;
  transactionId: string;
  paidAt: string;
  courtFee: number;
  discountFee: number;
  serviceFee: number;
  totalFee: number;
}

export interface BookingCustomerInfo {
  name: string;
  phone: string;
  playerCount: number;
  notes?: string;
}

export interface BookingItem {
  id: string;
  bookingCode: string;
  venueId: string;
  venueName: string;
  category: string;
  categorySlug?: string;
  imageUrl: string;
  status: BookingStatus;
  statusText: string;
  date: string;
  dateText: string;
  timeText: string;
  address: string;
  courtName?: string;
  qrCodeUrl: string;
  customer: BookingCustomerInfo;
  payment: BookingPaymentInfo;

  // --- Dữ liệu phục vụ Pass sân ---
  isPassing?: boolean;
  originalPrice?: number;
  passPrice?: number;
  passDiscountPercent?: number; // 0, 10, 20, 30, 50
  passCreatedAt?: string;
  sellerBankInfo?: BankInfo;
  sellerName?: string;
  sellerPhone?: string;
}

export interface BookingFilterState {
  tab: BookingTab;
  filterMode: DateFilterMode;
  selectedDate?: Date;
  selectedMonth?: number;
  selectedYear?: number;
}

export interface RescheduleSlotOption {
  slotId: string;
  courtId: string;
  courtName: string;
  startTime: string;
  endTime: string;
  price: number;
  isAvailable: boolean;
  isSamePrice: boolean;
}

export interface RescheduleDateOption {
  date: string;
  dayName: string;
  displayDate: string;
  isToday?: boolean;
}

export interface ReschedulePayload {
  bookingId: string;
  newDate: string;
  newDateText: string;
  newTimeText: string;
  slotId: string;
}

export interface PassCourtPayload {
  passPrice: number;
  discountPercent: number;
  bankInfo: BankInfo;
}
