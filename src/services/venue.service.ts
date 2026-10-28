import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";
import { Venue } from "@/features/home/types/home.types";

export const venueService = {
  getVenues: (): Promise<ApiResponse<Venue[]>> => {
    return apiClient.get<Venue[]>("/venues");
  },

  getVenueById: (id: string): Promise<ApiResponse<Venue>> => {
    return apiClient.get<Venue>(`/venues/${id}`);
  },
};