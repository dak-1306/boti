"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HomeHeader } from "@/features/home/components/HomeHeader";
import { CategoryList } from "@/features/home/components/CategoryList";
import { VenueSectionHeader } from "@/features/home/components/VenueSectionHeader";
import { VenueGrid } from "@/features/home/components/VenueGrid";
import { VenueMapView } from "@/features/home/components/map/VenueMapView";
import { FilterDrawer } from "@/features/home/components/drawer/FilterDrawer";
import { BottomNav } from "@/components/common/BottomNav";
import { useHome } from "@/features/home/hooks/useHome";
import { viewSwitchVariants } from "@/features/home/constants/home.motion";

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
  } = useHome();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* FIXED TOP HEADER */}
      <div className="shrink-0">
        <HomeHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenFilterDrawer={openFilterDrawer}
          onRequestLocation={onRequestLocation}
          isLoadingLocation={isLoadingLocation}
          hasLocation={hasLocation}
        />
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

      {/* CONTENT AREA VỚI FRAMER MOTION VIEW SWITCH */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid-view"
              variants={viewSwitchVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full overflow-y-auto pb-4 no-scrollbar"
            >
              <VenueGrid venues={venues} onResetFilters={handleResetFilters} />
            </motion.div>
          ) : (
            <motion.div
              key="map-view"
              variants={viewSwitchVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full w-full"
            >
              <VenueMapView
                venues={venues}
                selectedVenue={selectedVenueOnMap}
                onSelectVenue={setSelectedVenueOnMap}
                userLocation={userLocation}
                onRequestLocation={onRequestLocation}
                isLoadingLocation={isLoadingLocation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FIXED BOTTOM NAVIGATION */}
      <BottomNav activeTab="home" />

      {/* SHADCN FILTER DRAWER */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={closeFilterDrawer}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </div>
  );
}
