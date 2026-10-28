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
import { PassFeatureAnnouncementDrawer } from "@/features/home/components/PassFeatureAnnouncementDrawer";
import { useHome } from "@/features/home/hooks/useHome";
import { PullToRefresh } from "@/components/common/PullToRefresh";

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
    isLoading,
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

  if (isLoading) {
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

        <PullToRefresh className="flex-1 w-full pb-20">
          <div className="sm:mx-auto sm:max-w-[390px] w-full flex-1 flex flex-col min-h-0 pt-4 px-4">
            <div className="grid grid-cols-2 gap-3 pb-4 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col overflow-hidden rounded-2xl bg-card border border-border shadow-xs"
                >
                  <div className="h-28 w-full bg-muted" />
                  <div className="p-2.5 space-y-2">
                    <div className="h-3 w-14 rounded-md bg-muted" />
                    <div className="h-3.5 w-3/4 rounded-md bg-muted" />
                    <div className="h-2.5 w-full rounded-md bg-muted" />
                    <div className="mt-2 h-10 w-full rounded-xl bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PullToRefresh>

        <BottomNav activeTab="home" />
      </div>
    );
  }

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

      <div className="shrink-0 w-full sm:mx-auto sm:max-w-[390px]">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
        <VenueSectionHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>

      {!isMapView ? (
        <PullToRefresh className="flex-1 w-full pb-20">
          <div className="sm:mx-auto sm:max-w-[390px] w-full flex-1">
            <VenueGrid
              venues={venues}
              onSelectVenue={openDetailDrawer}
              onBookVenue={handleNavigateToBooking}
              onResetFilters={handleResetFilters}
            />
          </div>
        </PullToRefresh>
      ) : (
        <div className="relative flex-1 w-full min-h-0 overflow-hidden sm:mx-auto sm:max-w-[390px]">
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
      )}

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

      {/* Drawer gợi ý tính năng Pass sân lần đầu mở app */}
      <PassFeatureAnnouncementDrawer />
    </div>
  );
}
