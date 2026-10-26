export type BookingStatus = "confirmed" | "cancelled" | "rescheduled";
export type BookingTab = "confirmed" | "cancelled" | "rescheduled";
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
  imageUrl: string;
  status: BookingStatus;
  statusText: string;
  date: string;
  dateText: string;
  timeText: string;
  address: string;
  qrCodeUrl: string;
  customer: BookingCustomerInfo;
  payment: BookingPaymentInfo;
}

export interface BookingFilterState {
  tab: BookingTab;
  filterMode: DateFilterMode;
  selectedDate?: Date;
  selectedMonth?: number;
  selectedYear?: number;
}
