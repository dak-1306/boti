"use client";

import { HomeHeader } from "@/features/home/components/HomeHeader";
import { CategoryList } from "@/features/home/components/CategoryList";
import { VenueSectionHeader } from "@/features/home/components/VenueSectionHeader";
import { VenueGrid } from "@/features/home/components/VenueGrid";
import { VenueMapView } from "@/features/home/components/VenueMapView";
import { BottomNav } from "@/components/common/BottomNav";
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
  } = useHome();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* 1. FIXED TOP HEADER */}
      <div className="shrink-0">
        <HomeHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
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

      {/* 2. SCROLLABLE / MAP CONTENT AREA */}
      <div className="flex-1 overflow-hidden relative">
        {viewMode === "grid" ? (
          <div className="h-full overflow-y-auto pb-4 no-scrollbar">
            <VenueGrid venues={venues} />
          </div>
        ) : (
          <VenueMapView
            venues={venues}
            selectedVenue={selectedVenueOnMap}
            onSelectVenue={setSelectedVenueOnMap}
          />
        )}
      </div>

      {/* 3. FIXED BOTTOM NAVIGATION */}
      <BottomNav activeTab="home" />
    </div>
  );
}