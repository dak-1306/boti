export type PaymentMethodType = "zalopay" | "vietqr" | "cash";

export interface CheckoutSlotItem {
  id: string;
  timeText: string;
  price: number;
}

export interface CheckoutBookingData {
  venueId: string;
  venueName: string;
  venueAddress: string;
  courtName: string;
  dateText: string;
  slots: CheckoutSlotItem[];
  totalPrice: number;
  customerName: string;
  customerPhone: string;
}
