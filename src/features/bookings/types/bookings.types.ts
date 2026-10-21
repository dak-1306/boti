export type BookingStatus = "confirmed" | "cancelled" | "rescheduled";
export type BookingTab = "confirmed" | "cancelled" | "rescheduled";
export type DateFilterMode = "all" | "day" | "month" | "year";

export interface BookingPaymentInfo {
  method: string; // Ví dụ: "Ví ZaloPay", "Thẻ ATM", "Chuyển khoản"
  status: "paid" | "pending" | "refunded";
  statusText: string;
  transactionId: string; // Mã giao dịch: "#ZLP202610158899"
  paidAt: string; //Thời gian thanh toán: "18:30 - 15/10/2026"
  courtFee: number; // Tiền sân (gốc)
  discountFee: number; // Giảm giá / Voucher
  serviceFee: number; // Phí dịch vụ
  totalFee: number; // Tổng thanh toán thực tế
}

export interface BookingCustomerInfo {
  name: string;
  phone: string;
  playerCount: number;
  notes?: string;
}

export interface BookingItem {
  id: string;
  bookingCode: string; // Mã đặt sân: "#PB20261016001"
  venueId: string;
  venueName: string;
  category: string;
  imageUrl: string;
  status: BookingStatus;
  statusText: string;
  date: string; // ISO format: "2026-10-16"
  dateText: string; // "Thứ 6, 16/10/2026"
  timeText: string; // "19:00 - 20:00 (1 giờ)"
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
