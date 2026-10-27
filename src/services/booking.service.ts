import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";
import { BookingItem } from "@/features/bookings/types/bookings.types";
import { CheckoutBookingData } from "@/features/checkout/types/checkout.types";

export interface ReschedulePayload {
  newDateText: string;
  newTimeText: string;
}

export const bookingService = {
  getMyBookings: (): Promise<ApiResponse<BookingItem[]>> => {
    return apiClient.get<BookingItem[]>("/bookings");
  },

  createBooking: (
    payload: CheckoutBookingData,
  ): Promise<ApiResponse<BookingItem>> => {
    return apiClient.post<BookingItem, CheckoutBookingData>(
      "/bookings",
      payload,
    );
  },

  cancelBooking: (id: string): Promise<ApiResponse<BookingItem>> => {
    return apiClient.put<BookingItem>(`/bookings/${id}/cancel`);
  },

  rescheduleBooking: (
    id: string,
    payload: ReschedulePayload,
  ): Promise<ApiResponse<BookingItem>> => {
    return apiClient.put<BookingItem, ReschedulePayload>(
      `/bookings/${id}/reschedule`,
      payload,
    );
  },
};
