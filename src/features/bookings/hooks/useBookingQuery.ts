import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  bookingService,
  ReschedulePayload,
  BuyPassSlotPayload,
} from "@/services/booking.service";
import { CheckoutBookingData } from "@/features/checkout/types/checkout.types";
import { useBookingStore } from "@/stores/useBookingStore";
import { BookingTab, PassCourtPayload } from "../types/bookings.types";

export const bookingKeys = {
  all: ["bookings"] as const,
  myBookings: () => [...bookingKeys.all, "my"] as const,
  passSlots: () => [...bookingKeys.all, "passSlots"] as const,
};

// 1. Fetch danh sách đơn đặt sân của tôi
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

// 2. Fetch danh sách slot Pass sân công khai ở trang Pass sân
export function usePassSlotsQuery() {
  return useQuery({
    queryKey: bookingKeys.passSlots(),
    queryFn: async () => {
      const res = await bookingService.getPassSlots();
      if (!res.success || !res.data) {
        return [];
      }
      return res.data;
    },
  });
}

// 3. Mutation tạo đơn đặt sân mới
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

// 4. Mutation hủy đơn đặt sân
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

// 5. Mutation dời lịch đơn đặt sân
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

// 6. Mutation đăng Pass / Chỉnh sửa thông tin Pass sân
export function usePassCourtMutation() {
  const queryClient = useQueryClient();
  const setActiveTab = useBookingStore((s) => s.setActiveTab);

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: PassCourtPayload;
    }) => {
      const res = await bookingService.passBooking(id, payload);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Đăng Pass sân thất bại");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setActiveTab("passing" as BookingTab);
    },
  });
}

// 7. Mutation thu hồi Pass sân (Chuyển trạng thái về lại 'confirmed')
export function useRevokePassMutation() {
  const queryClient = useQueryClient();
  const setActiveTab = useBookingStore((s) => s.setActiveTab);

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await bookingService.revokePassBooking(id);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Thu hồi Pass sân thất bại");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      setActiveTab("confirmed" as BookingTab);
    },
  });
}

// 8. Mutation mua lại Slot Pass sân
export function useBuyPassSlotMutation() {
  const queryClient = useQueryClient();
  const setActiveTab = useBookingStore((s) => s.setActiveTab);

  return useMutation({
    mutationFn: async ({
      passSlotId,
      payload,
    }: {
      passSlotId: string;
      payload: BuyPassSlotPayload;
    }) => {
      const res = await bookingService.buyPassSlot(passSlotId, payload);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Mua slot Pass thất bại");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      setActiveTab("confirmed" as BookingTab);
    },
  });
}
