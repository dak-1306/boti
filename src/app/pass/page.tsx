"use client";

import React from "react";
import dynamic from "next/dynamic";
import { BottomNav } from "@/components/common/bottom-nav";
import { HomeHeader } from "@/features/home/components/HomeHeader";
import { CategoryList } from "@/features/home/components/CategoryList";
import { VenueSectionHeader } from "@/features/home/components/VenueSectionHeader";
import { PassGrid } from "@/features/home/components/PassGrid";
import { FilterDrawer } from "@/features/home/components/drawer-filter/FilterDrawer";
import { PassSlotDetailDrawer } from "@/features/home/components/detail-drawer/PassSlotDetailDrawer";
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
        Đang tải bản đồ sân pass...
      </div>
    ),
  },
);

export default function PassPage() {
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
    passSlots,
    selectedPassSlot,
    openPassSlotDrawer,
    closePassSlotDrawer,
    handleConfirmBuyPassSlot,
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
  } = useHome();

  const isMapView = viewMode === "map";

  // Lọc các Venue có slot đang đăng Pass để hiển thị Marker trên Bản đồ
  const passVenueIds = new Set(passSlots.map((s) => s.venueId));
  const venuesWithPassSlots = venues.filter((v) => passVenueIds.has(v.id));

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
          <div className="sm:mx-auto sm:max-w-[390px] w-full flex-1 flex flex-col min-h-0 space-y-3 p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 w-full rounded-2xl bg-muted animate-pulse"
              />
            ))}
          </div>
        </PullToRefresh>

        <BottomNav activeTab="pass" />
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

      {/* CỤM BANNER DANH MỤC & NÚT CHUYỂN BẢN ĐỒ */}
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

      {/* CHẾ ĐỘ XEM DANH SÁCH HOẶC BẢN ĐỒ */}
      {!isMapView ? (
        <PullToRefresh className="flex-1 w-full pb-20">
          <div className="sm:mx-auto sm:max-w-[390px] w-full flex-1">
            <PassGrid
              slots={passSlots}
              onSelectSlot={openPassSlotDrawer}
              onBuySlot={openPassSlotDrawer}
              onResetFilters={handleResetFilters}
            />
          </div>
        </PullToRefresh>
      ) : (
        <div className="relative flex-1 w-full min-h-0 overflow-hidden sm:mx-auto sm:max-w-[390px]">
          <VenueMapView
            venues={venuesWithPassSlots}
            selectedVenue={selectedVenueOnMap}
            onSelectVenue={setSelectedVenueOnMap}
            userLocation={userLocation}
            onRequestLocation={onRequestLocation}
            isLoadingLocation={isLoadingLocation}
            onOpenDetail={(venue) => {
              const matchedSlot = passSlots.find((s) => s.venueId === venue.id);
              if (matchedSlot) openPassSlotDrawer(matchedSlot);
            }}
            isVisible={isMapView}
          />
        </div>
      )}

      <BottomNav activeTab="pass" />

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={closeFilterDrawer}
        filters={filters}
        onApplyFilters={setFilters}
      />

      <PassSlotDetailDrawer
        slot={selectedPassSlot}
        isOpen={!!selectedPassSlot}
        onClose={closePassSlotDrawer}
        onBuy={handleConfirmBuyPassSlot}
      />
    </div>
  );
}
