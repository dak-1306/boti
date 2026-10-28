import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";
import {
  BookingItem,
  PassCourtPayload,
} from "@/features/bookings/types/bookings.types";
import { CheckoutBookingData } from "@/features/checkout/types/checkout.types";
import { PassSlotItem } from "@/features/home/types/home.types";

export interface ReschedulePayload {
  newDateText: string;
  newTimeText: string;
}

export interface BuyPassSlotPayload {
  customerName: string;
  customerPhone: string;
}

export const bookingService = {
  // Lấy danh sách đơn đặt của tôi
  getMyBookings: (): Promise<ApiResponse<BookingItem[]>> => {
    return apiClient.get<BookingItem[]>("/bookings");
  },

  // Tạo đơn đặt sân mới
  createBooking: (
    payload: CheckoutBookingData,
  ): Promise<ApiResponse<BookingItem>> => {
    return apiClient.post<BookingItem, CheckoutBookingData>(
      "/bookings",
      payload,
    );
  },

  // Hủy đơn đặt sân
  cancelBooking: (id: string): Promise<ApiResponse<BookingItem>> => {
    return apiClient.put<BookingItem>(`/bookings/${id}/cancel`);
  },

  // Dời lịch đơn đặt sân
  rescheduleBooking: (
    id: string,
    payload: ReschedulePayload,
  ): Promise<ApiResponse<BookingItem>> => {
    return apiClient.put<BookingItem, ReschedulePayload>(
      `/bookings/${id}/reschedule`,
      payload,
    );
  },

  // --- LUỒNG PASS SÂN NEW ENDPOINTS ---

  // 1. Đăng Pass đơn đặt sân: PUT /bookings/:id/pass
  passBooking: (
    id: string,
    payload: PassCourtPayload,
  ): Promise<ApiResponse<BookingItem>> => {
    return apiClient.put<BookingItem, PassCourtPayload>(
      `/bookings/${id}/pass`,
      payload,
    );
  },

  // 2. Lấy danh sách slot Pass công khai trên Trang chủ: GET /bookings/pass-slots
  getPassSlots: (): Promise<ApiResponse<PassSlotItem[]>> => {
    return apiClient.get<PassSlotItem[]>("/bookings/pass-slots");
  },

  // 3. Mua slot Pass sân: POST /bookings/pass-slots/:id/buy
  buyPassSlot: (
    passSlotId: string,
    payload: BuyPassSlotPayload,
  ): Promise<ApiResponse<BookingItem>> => {
    return apiClient.post<BookingItem, BuyPassSlotPayload>(
      `/bookings/pass-slots/${passSlotId}/buy`,
      payload,
    );
  },
};
