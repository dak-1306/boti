import { useQuery } from "@tanstack/react-query";
import { venueService } from "@/services/venue.service";

export const venueKeys = {
  all: ["venues"] as const,
  detail: (id: string) => ["venues", id] as const,
};

export function useVenuesQuery() {
  return useQuery({
    queryKey: venueKeys.all,
    queryFn: async () => {
      const res = await venueService.getVenues();
      if (!res.success || !res.data) {
        throw new Error(res.message || "Không thể tải danh sách sân");
      }
      return res.data;
    },
  });
}

export function useVenueDetailQuery(id?: string) {
  return useQuery({
    queryKey: venueKeys.detail(id || ""),
    queryFn: async () => {
      if (!id) return null;
      const res = await venueService.getVenueById(id);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Không tìm thấy thông tin sân");
      }
      return res.data;
    },
    enabled: !!id,
  });
}
