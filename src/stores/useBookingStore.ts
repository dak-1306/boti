import { create } from "zustand";
import { bookingService, ReschedulePayload } from "@/services/booking.service";
import {
  BookingItem,
  BookingTab,
} from "@/features/bookings/types/bookings.types";
import { CheckoutBookingData } from "@/features/checkout/types/checkout.types";

interface BookingState {
  bookings: BookingItem[];
  activeDraft: CheckoutBookingData | null;
  activeTab: BookingTab; // 👈 Quản lý tab đang chọn
  isLoading: boolean;
  setActiveTab: (tab: BookingTab) => void;
  setDraftBooking: (draft: CheckoutBookingData) => void;
  clearDraft: () => void;
  fetchMyBookings: () => Promise<void>;
  confirmBooking: (draft: CheckoutBookingData) => Promise<boolean>;
  cancelBooking: (id: string) => Promise<boolean>;
  rescheduleBooking: (
    id: string,
    payload: ReschedulePayload,
  ) => Promise<boolean>;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  activeDraft: null,
  activeTab: "confirmed", // 👈 Mặc định là "Đã xác nhận"
  isLoading: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setDraftBooking: (draft) => set({ activeDraft: draft }),
  clearDraft: () => set({ activeDraft: null }),

  fetchMyBookings: async () => {
    set({ isLoading: true });
    const res = await bookingService.getMyBookings();
    if (res.success) {
      set({ bookings: res.data });
    }
    set({ isLoading: false });
  },

  confirmBooking: async (draft) => {
    set({ isLoading: true });
    const res = await bookingService.createBooking(draft);
    if (res.success) {
      set((state) => ({
        bookings: [res.data, ...state.bookings],
        activeDraft: null,
        activeTab: "confirmed",
      }));
    }
    set({ isLoading: false });
    return res.success;
  },

  cancelBooking: async (id) => {
    set({ isLoading: true });
    const res = await bookingService.cancelBooking(id);
    if (res.success) {
      set((state) => ({
        bookings: state.bookings.map((b) =>
          String(b.id) === String(id) ? res.data : b,
        ),
        activeTab: "cancelled", // 👈 Tự động kích hoạt Tab "Đã hủy"
      }));
    }
    set({ isLoading: false });
    return res.success;
  },

  rescheduleBooking: async (id, payload) => {
    set({ isLoading: true });
    const res = await bookingService.rescheduleBooking(id, payload);
    if (res.success) {
      set((state) => ({
        bookings: state.bookings.map((b) =>
          String(b.id) === String(id) ? res.data : b,
        ),
        activeTab: "rescheduled", // 👈 Tự động kích hoạt Tab "Đã dời lịch"
      }));
    }
    set({ isLoading: false });
    return res.success;
  },
}));
