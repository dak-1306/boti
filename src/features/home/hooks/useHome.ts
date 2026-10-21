import { useState, useMemo } from "react";
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

import rawVenuesMock from "../data/venues.mock.json";

export const useHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);

  const { userLocation, isLoadingLocation, locationError, requestLocation } =
    useLocation();

  const initialVenues = rawVenuesMock as Venue[];

  // 1. Lọc và tính khoảng cách đồng bộ
  const filteredVenues = useMemo(() => {
    return initialVenues
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
        const venueCity = venue.city || "";
        const venueAddress = venue.address.toLowerCase();

        // Khớp Thành phố linh hoạt
        const matchesCity = filters.city
          ? venueCity.toLowerCase() === filters.city.toLowerCase() ||
            venueAddress.includes(filters.city.toLowerCase()) ||
            (filters.city === "TP. Hồ Chí Minh" &&
              venueAddress.includes("tp.hcm"))
          : true;

        // Tìm kiếm theo tên/địa chỉ
        const matchesSearch =
          venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          venueAddress.includes(searchQuery.toLowerCase());

        // Category chọn nhanh
        const matchesCategory = selectedCategory
          ? venue.category.toLowerCase() === selectedCategory.toLowerCase()
          : true;

        // Môn thể thao chọn trong Drawer
        const matchesSports =
          filters.selectedSports.length > 0
            ? filters.selectedSports.some(
                (sport) => sport.toLowerCase() === venue.category.toLowerCase(),
              )
            : true;

        // Lọc theo Quận / Huyện
        const matchesDistrict = filters.district
          ? venueAddress.includes(filters.district.toLowerCase())
          : true;

        // Lọc theo Đánh giá
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
  }, [searchQuery, selectedCategory, filters, userLocation, initialVenues]);

  // 2. Quản lý ID sân được chọn trên bản đồ dạng Derived State (Bỏ hẳn useEffect sync)
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

  return {
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

    // Filter Drawer
    isFilterDrawerOpen,
    openFilterDrawer: () => setIsFilterDrawerOpen(true),
    closeFilterDrawer: () => setIsFilterDrawerOpen(false),
    filters,
    setFilters,
    handleResetFilters,

    // Location
    userLocation,
    onRequestLocation: requestLocation,
    isLoadingLocation,
    locationError,
    hasLocation: !!userLocation,
  };
};
