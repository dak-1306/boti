import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingService, ReschedulePayload } from "@/services/booking.service";
import { CheckoutBookingData } from "@/features/checkout/types/checkout.types";
import { useBookingStore } from "@/stores/useBookingStore";
import { BookingTab } from "../types/bookings.types";

export const bookingKeys = {
  all: ["bookings"] as const,
  myBookings: () => [...bookingKeys.all, "my"] as const,
};

// 1. Fetch danh sách đơn đặt sân
export function useMyBookingsQuery() {
  return useQuery({
    queryKey: bookingKeys.myBookings(),
    queryFn: async () => {
      const res = await bookingService.getMyBookings();
      if (!res.success || !res.data) {
        throw new Error(res.message || "Không thể tải danh sách đơn đặt sân");
      }
      return res.data;
    },
  });
}

// 2. Mutation tạo đơn mới
export function useCreateBookingMutation() {
  const queryClient = useQueryClient();
  const setActiveTab = useBookingStore((s) => s.setActiveTab);
  const clearDraft = useBookingStore((s) => s.clearDraft);

  return useMutation({
    mutationFn: async (payload: CheckoutBookingData) => {
      const res = await bookingService.createBooking(payload);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Tạo đơn đặt sân thất bại");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      clearDraft();
      setActiveTab("confirmed");
    },
  });
}

// 3. Mutation hủy đơn đặt sân
export function useCancelBookingMutation() {
  const queryClient = useQueryClient();
  const setActiveTab = useBookingStore((s) => s.setActiveTab);

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await bookingService.cancelBooking(id);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Hủy đơn thất bại");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      setActiveTab("cancelled" as BookingTab);
    },
  });
}

// 4. Mutation dời lịch đơn đặt sân
export function useRescheduleBookingMutation() {
  const queryClient = useQueryClient();
  const setActiveTab = useBookingStore((s) => s.setActiveTab);

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: ReschedulePayload;
    }) => {
      const res = await bookingService.rescheduleBooking(id, payload);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Dời lịch thất bại");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      setActiveTab("rescheduled" as BookingTab);
    },
  });
}
