"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  CATEGORIES_DATA,
  DEFAULT_FILTER_STATE,
} from "../constants/home.constants";
import { Venue, ViewMode, FilterState } from "../types/home.types";
import { useLocation } from "./useLocation";
import {
  calculateHaversineDistance,
  formatDistanceText,
} from "../utils/distance";
import { useVenuesQuery } from "./useVenuesQuery";

export const useHome = () => {
  const router = useRouter();

  // Dùng TanStack Query lấy dữ liệu sân
  const { data: storeVenues = [], isLoading } = useVenuesQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [detailVenue, setDetailVenue] = useState<Venue | null>(null);
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

        // 1. Lọc Thành phố
        const filterCity = filters.city ? filters.city.toLowerCase() : "";
        const matchesCity = !filterCity
          ? true
          : venueCity === filterCity ||
            venueAddress.includes(filterCity) ||
            (filters.city === "TP. Hồ Chí Minh" &&
              (venueAddress.includes("tp.hcm") ||
                venueAddress.includes("tp. hồ chí minh")));

        // 2. Lọc Từ khóa Tìm kiếm
        const search = searchQuery.trim().toLowerCase();
        const matchesSearch = !search
          ? true
          : venue.name.toLowerCase().includes(search) ||
            venueAddress.includes(search) ||
            venueCatName.includes(search);

        // 3. Lọc theo Danh mục (So sánh cả categorySlug lẫn category tiếng Việt)
        const selectedCat = selectedCategory
          ? selectedCategory.toLowerCase()
          : null;
        const matchesCategory = !selectedCat
          ? true
          : venueCatSlug === selectedCat || venueCatName === selectedCat;

        // 4. Lọc Nâng cao theo Nhiều môn thể thao (FilterDrawer)
        const matchesSports =
          filters.selectedSports.length > 0
            ? filters.selectedSports.some((sport) => {
                const s = sport.toLowerCase();
                return s === venueCatSlug || s === venueCatName;
              })
            : true;

        // 5. Lọc Quận / Huyện (Tự động bỏ qua nếu chọn "Tất cả Quận/Huyện")
        const filterDistrict = filters.district
          ? filters.district.toLowerCase()
          : "";
        const isAllDistrict =
          !filterDistrict || filterDistrict.includes("tất cả");

        const matchesDistrict = isAllDistrict
          ? true
          : venueDistrict === filterDistrict ||
            venueAddress.includes(filterDistrict);

        // 6. Lọc Đánh giá tối thiểu
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

  return {
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    handleSelectCategory,
    viewMode,
    setViewMode,
    categories: CATEGORIES_DATA,
    venues: filteredVenues,
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
    handleNavigateToBooking,
  };
};
