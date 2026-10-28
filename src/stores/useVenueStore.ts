import { create } from "zustand";
import { venueService } from "@/services/venue.service";
import { Venue } from "@/features/home/types/home.types";

interface VenueState {
  venues: Venue[];
  selectedVenue: Venue | null;
  isLoading: boolean;
  fetchVenues: () => Promise<void>;
  fetchVenueById: (id: string) => Promise<void>;
}

export const useVenueStore = create<VenueState>((set) => ({
  venues: [],
  selectedVenue: null,
  isLoading: false,

  fetchVenues: async () => {
    set({ isLoading: true });
    const res = await venueService.getVenues();
    if (res.success && res.data) {
      set({ venues: res.data });
    }
    set({ isLoading: false });
  },

  fetchVenueById: async (id: string) => {
    set({ isLoading: true });
    const res = await venueService.getVenueById(id);
    if (res.success && res.data) {
      set({ selectedVenue: res.data });
    }
    set({ isLoading: false });
  },
}));
