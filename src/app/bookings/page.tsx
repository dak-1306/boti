"use client";

import React from "react";
import { BookingHeader } from "@/features/bookings/components/BookingHeader";
import { BookingTabs } from "@/features/bookings/components/BookingTabs";
import { BookingSectionHeader } from "@/features/bookings/components/BookingSectionHeader";
import { BookingDateDrawer } from "@/features/bookings/components/date-drawer/BookingDateDrawer";
import { BookingList } from "@/features/bookings/components/BookingList";
import { BookingEmptyState } from "@/features/bookings/components/BookingEmptyState";
import { BottomNav } from "@/components/common/bottom-nav";
import { useBookings } from "@/features/bookings/hooks/useBookings";
import { BOOKING_TABS } from "@/features/bookings/constants/bookings.constants";
import { PageTransition } from "@/components/motion/PageTransition";

export default function BookingsPage() {
  const {
    filters,
    setFilters,
    selectedDateText,
    bookings,
    hasBookings,
    isDateDrawerOpen,
    openDateDrawer,
    closeDateDrawer,
    clearDateFilter,
    handleNavigateToHome,
    handleSelectBooking,
  } = useBookings();

  const currentTabLabel =
    BOOKING_TABS.find((t) => t.id === filters.tab)?.label || "Đã đặt";

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="shrink-0">
        <BookingHeader
          bottomExtension={
            <BookingTabs
              activeTab={filters.tab}
              onTabChange={(tab) => setFilters((prev) => ({ ...prev, tab }))}
            />
          }
        >
          <BookingSectionHeader
            title={currentTabLabel}
            selectedDateText={selectedDateText}
            onOpenCalendar={openDateDrawer}
            onClearDateFilter={clearDateFilter}
          />
        </BookingHeader>
      </div>

      {/* Animation chuyển Tab siêu mượt nhờ key={filters.tab} */}
      <PageTransition
        key={filters.tab}
        className="flex-1 overflow-y-auto no-scrollbar"
      >
        {hasBookings ? (
          <BookingList
            bookings={bookings}
            onSelectBooking={(booking) => handleSelectBooking(booking.id)}
          />
        ) : (
          <BookingEmptyState onBookNow={handleNavigateToHome} />
        )}
      </PageTransition>

      <BottomNav activeTab="bookings" />

      <BookingDateDrawer
        isOpen={isDateDrawerOpen}
        onClose={closeDateDrawer}
        filters={filters}
        onApplyFilters={(newFilters) =>
          setFilters((prev) => ({ ...prev, ...newFilters }))
        }
      />
    </div>
  );
}
