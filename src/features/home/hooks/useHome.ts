"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CATEGORIES_DATA,
  DEFAULT_FILTER_STATE,
} from "../constants/home.constants";
import {
  Venue,
  ViewMode,
  FilterState,
  PassSlotItem,
} from "../types/home.types";
import { useLocation } from "./useLocation";
import {
  calculateHaversineDistance,
  formatDistanceText,
} from "../utils/distance";
import { useVenuesQuery } from "./useVenuesQuery";
import {
  usePassSlotsQuery,
  useBuyPassSlotMutation,
} from "@/features/bookings/hooks/useBookingQuery";
import { useProfile } from "@/features/profile/hooks/useProfile";

export const useHome = () => {
  const router = useRouter();
  const { user } = useProfile();

  const { data: storeVenues = [], isLoading: isLoadingVenues } =
    useVenuesQuery();
  const { data: passSlots = [], isLoading: isLoadingPassSlots } =
    usePassSlotsQuery();
  const buyPassSlotMutation = useBuyPassSlotMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [detailVenue, setDetailVenue] = useState<Venue | null>(null);
  const [selectedPassSlot, setSelectedPassSlot] = useState<PassSlotItem | null>(
    null,
  );
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);

  const { userLocation, isLoadingLocation, locationError, requestLocation } =
    useLocation();

  const filteredVenues = useMemo(() => {
    return storeVenues
      .map((venue) => {
        if (!userLocation) return venue;

        const dist = calculateHaversineDistance(
          userLocation.lat,
          userLocation.lng,
          venue.location.lat,
          venue.location.lng,
        );

        return {
          ...venue,
          distance: dist,
          distanceText: formatDistanceText(dist),
        };
      })
      .filter((venue) => {
        const venueCity = (venue.city || "").toLowerCase();
        const venueDistrict = (venue.district || "").toLowerCase();
        const venueAddress = venue.address.toLowerCase();
        const venueCatName = venue.category.toLowerCase();
        const venueCatSlug = (venue.categorySlug || "").toLowerCase();

        const filterCity = filters.city ? filters.city.toLowerCase() : "";
        const matchesCity = !filterCity
          ? true
          : venueCity === filterCity ||
            venueAddress.includes(filterCity) ||
            (filters.city === "TP. Hồ Chí Minh" &&
              (venueAddress.includes("tp.hcm") ||
                venueAddress.includes("tp. hồ chí minh")));

        const search = searchQuery.trim().toLowerCase();
        const matchesSearch = !search
          ? true
          : venue.name.toLowerCase().includes(search) ||
            venueAddress.includes(search) ||
            venueCatName.includes(search);

        const selectedCat = selectedCategory
          ? selectedCategory.toLowerCase()
          : null;
        const matchesCategory = !selectedCat
          ? true
          : venueCatSlug === selectedCat || venueCatName === selectedCat;

        const matchesSports =
          filters.selectedSports.length > 0
            ? filters.selectedSports.some((sport) => {
                const s = sport.toLowerCase();
                return s === venueCatSlug || s === venueCatName;
              })
            : true;

        const filterDistrict = filters.district
          ? filters.district.toLowerCase()
          : "";
        const isAllDistrict =
          !filterDistrict || filterDistrict.includes("tất cả");

        const matchesDistrict = isAllDistrict
          ? true
          : venueDistrict === filterDistrict ||
            venueAddress.includes(filterDistrict);

        const matchesRating = venue.rating >= filters.ratingMin;

        return (
          matchesCity &&
          matchesSearch &&
          matchesCategory &&
          matchesSports &&
          matchesDistrict &&
          matchesRating
        );
      })
      .sort((a, b) => {
        if (a.distance !== undefined && b.distance !== undefined) {
          return a.distance - b.distance;
        }
        return 0;
      });
  }, [searchQuery, selectedCategory, filters, userLocation, storeVenues]);

  const filteredPassSlots = useMemo(() => {
    return passSlots.filter((slot) => {
      const cat = (slot.categorySlug || slot.category).toLowerCase();
      const selectedCat = selectedCategory
        ? selectedCategory.toLowerCase()
        : null;
      const matchesCat = !selectedCat ? true : cat === selectedCat;

      const search = searchQuery.trim().toLowerCase();
      const matchesSearch = !search
        ? true
        : slot.venueName.toLowerCase().includes(search) ||
          slot.courtName.toLowerCase().includes(search);

      return matchesCat && matchesSearch;
    });
  }, [passSlots, selectedCategory, searchQuery]);

  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  const selectedVenueOnMap = useMemo(() => {
    if (filteredVenues.length === 0) return null;
    const found = filteredVenues.find((v) => v.id === selectedVenueId);
    return found || filteredVenues[0];
  }, [filteredVenues, selectedVenueId]);

  const handleSelectVenueOnMap = (venue: Venue | null) => {
    setSelectedVenueId(venue ? venue.id : null);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setFilters(DEFAULT_FILTER_STATE);
  };

  const handleNavigateToBooking = (venueId: string) => {
    setDetailVenue(null);
    router.push(`/bookings/create?venueId=${venueId}`);
  };

  // SỬA TẠI ĐÂY: Truyền đúng cấu trúc { passSlotId, payload: { customerName, customerPhone } }
  const handleConfirmBuyPassSlot = async (slot: PassSlotItem) => {
    try {
      const customerName = user?.name || "Người mua Slot Pass";
      const customerPhone = user?.phone || "0900000000";

      await buyPassSlotMutation.mutateAsync({
        passSlotId: slot.id,
        payload: {
          customerName,
          customerPhone,
        },
      });

      setSelectedPassSlot(null);
      toast.success(
        "Mua slot Pass sân thành công! Đơn đặt đã được thêm vào Lịch đặt.",
      );
      router.push("/bookings");
    } catch {
      toast.error("Mua slot Pass thất bại. Vui lòng thử lại.");
    }
  };

  return {
    isLoading: isLoadingVenues || isLoadingPassSlots,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    handleSelectCategory,
    viewMode,
    setViewMode,
    categories: CATEGORIES_DATA,
    venues: filteredVenues,
    passSlots: filteredPassSlots,
    selectedVenueOnMap,
    setSelectedVenueOnMap: handleSelectVenueOnMap,
    isFilterDrawerOpen,
    openFilterDrawer: () => setIsFilterDrawerOpen(true),
    closeFilterDrawer: () => setIsFilterDrawerOpen(false),
    filters,
    setFilters,
    handleResetFilters,
    userLocation,
    onRequestLocation: requestLocation,
    isLoadingLocation,
    locationError,
    hasLocation: !!userLocation,
    detailVenue,
    openDetailDrawer: (venue: Venue) => setDetailVenue(venue),
    closeDetailDrawer: () => setDetailVenue(null),
    selectedPassSlot,
    openPassSlotDrawer: (slot: PassSlotItem) => setSelectedPassSlot(slot),
    closePassSlotDrawer: () => setSelectedPassSlot(null),
    handleConfirmBuyPassSlot,
    handleNavigateToBooking,
  };
};
