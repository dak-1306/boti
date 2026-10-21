import { useState, useMemo } from "react";
import { CATEGORIES_DATA, VENUES_DATA } from "../constants/home.constants";
import { Venue, ViewMode } from "../types/home.types";

export const useHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedVenueOnMap, setSelectedVenueOnMap] = useState<Venue | null>(
    VENUES_DATA[0],
  );

  const filteredVenues = useMemo(() => {
    return VENUES_DATA.filter((venue) => {
      const matchesSearch =
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory
        ? venue.category.toLowerCase() === selectedCategory.toLowerCase()
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
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
    setSelectedVenueOnMap,
  };
};
