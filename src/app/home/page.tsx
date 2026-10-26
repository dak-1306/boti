"use client";

import React from "react";
import { BottomNav } from "@/components/common/bottom-nav";
import { HomeHeader } from "@/features/home/components/HomeHeader";
import { CategoryList } from "@/features/home/components/CategoryList";
import { VenueSectionHeader } from "@/features/home/components/VenueSectionHeader";
import { VenueGrid } from "@/features/home/components/VenueGrid";
import { VenueMapView } from "@/features/home/components/map/VenueMapView";
import { FilterDrawer } from "@/features/home/components/drawer-filter/FilterDrawer";
import { VenueDetailDrawer } from "@/features/home/components/detail-drawer/VenueDetailDrawer";
import { useHome } from "@/features/home/hooks/useHome";

export default function HomePage() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    handleSelectCategory,
    viewMode,
    setViewMode,
    categories,
    venues,
    selectedVenueOnMap,
    setSelectedVenueOnMap,
    isFilterDrawerOpen,
    openFilterDrawer,
    closeFilterDrawer,
    filters,
    setFilters,
    handleResetFilters,
    userLocation,
    onRequestLocation,
    isLoadingLocation,
    hasLocation,
    detailVenue,
    openDetailDrawer,
    closeDetailDrawer,
  } = useHome();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <HomeHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenFilterDrawer={openFilterDrawer}
        onRequestLocation={onRequestLocation}
        isLoadingLocation={isLoadingLocation}
        hasLocation={hasLocation}
      />

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        <div className="sm:mx-auto sm:max-w-[390px] w-full h-full flex flex-col">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />

          <VenueSectionHeader
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {viewMode === "grid" ? (
            <VenueGrid
              venues={venues}
              onSelectVenue={openDetailDrawer}
              onResetFilters={handleResetFilters}
            />
          ) : (
            <div className="relative flex-1 min-h-[400px]">
              <VenueMapView
                venues={venues}
                selectedVenue={selectedVenueOnMap}
                onSelectVenue={setSelectedVenueOnMap}
                userLocation={userLocation}
                onRequestLocation={onRequestLocation}
                isLoadingLocation={isLoadingLocation}
                onOpenDetail={openDetailDrawer}
              />
            </div>
          )}
        </div>
      </div>

      <BottomNav activeTab="home" />

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={closeFilterDrawer}
        filters={filters}
        onApplyFilters={setFilters}
      />

      <VenueDetailDrawer
        venue={detailVenue}
        isOpen={!!detailVenue}
        onClose={closeDetailDrawer}
      />
    </div>
  );
}
