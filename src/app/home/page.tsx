"use client";

import React from "react";
import dynamic from "next/dynamic";
import { BottomNav } from "@/components/common/bottom-nav";
import { HomeHeader } from "@/features/home/components/HomeHeader";
import { CategoryList } from "@/features/home/components/CategoryList";
import { VenueSectionHeader } from "@/features/home/components/VenueSectionHeader";
import { VenueGrid } from "@/features/home/components/VenueGrid";
import { FilterDrawer } from "@/features/home/components/drawer-filter/FilterDrawer";
import { VenueDetailDrawer } from "@/features/home/components/detail-drawer/VenueDetailDrawer";
import { useHome } from "@/features/home/hooks/useHome";
import { cn } from "@/lib/utils";

const VenueMapView = dynamic(
  () =>
    import("@/features/home/components/map/VenueMapView").then(
      (mod) => mod.VenueMapView,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-medium text-muted-foreground">
        Đang tải bản đồ...
      </div>
    ),
  },
);

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
    handleNavigateToBooking,
  } = useHome();

  const isMapView = viewMode === "map";

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

      <main
        className={cn(
          "flex-1 w-full flex flex-col min-h-0",
          isMapView ? "overflow-hidden" : "overflow-y-auto pb-20 no-scrollbar",
        )}
      >
        <div className="sm:mx-auto sm:max-w-[390px] w-full flex-1 flex flex-col min-h-0">
          <div className="shrink-0">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>

          <div className="shrink-0">
            <VenueSectionHeader
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {/* 1. DANH SÁCH SÂN */}
          {!isMapView && (
            <div className="flex-1">
              <VenueGrid
                venues={venues}
                onSelectVenue={openDetailDrawer}
                onBookVenue={handleNavigateToBooking}
                onResetFilters={handleResetFilters}
              />
            </div>
          )}

          {/* 2. BẢN ĐỒ: Giữ nguyên khung chuẩn Flexbox */}
          <div
            className={cn(
              "relative flex-1 w-full min-h-0 overflow-hidden touch-none",
              !isMapView && "hidden",
            )}
          >
            <VenueMapView
              venues={venues}
              selectedVenue={selectedVenueOnMap}
              onSelectVenue={setSelectedVenueOnMap}
              userLocation={userLocation}
              onRequestLocation={onRequestLocation}
              isLoadingLocation={isLoadingLocation}
              onOpenDetail={openDetailDrawer}
              isVisible={isMapView}
            />
          </div>
        </div>
      </main>

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
        onBook={handleNavigateToBooking}
      />
    </div>
  );
}
