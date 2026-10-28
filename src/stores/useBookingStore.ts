import { create } from "zustand";
import { BookingTab } from "@/features/bookings/types/bookings.types";
import { CheckoutBookingData } from "@/features/checkout/types/checkout.types";

interface BookingUIState {
  activeDraft: CheckoutBookingData | null;
  activeTab: BookingTab;
  setActiveTab: (tab: BookingTab) => void;
  setDraftBooking: (draft: CheckoutBookingData) => void;
  clearDraft: () => void;
}

export const useBookingStore = create<BookingUIState>((set) => ({
  activeDraft: null,
  activeTab: "confirmed",

  setActiveTab: (tab) => set({ activeTab: tab }),
  setDraftBooking: (draft) => set({ activeDraft: draft }),
  clearDraft: () => set({ activeDraft: null }),
}));
