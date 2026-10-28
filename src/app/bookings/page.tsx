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
import { PullToRefresh } from "@/components/common/PullToRefresh";

export default function BookingsPage() {
  const {
    isLoading,
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

  // SKELETON LOADING KHỚP 1:1 CHO TRANG ĐẶT SÂN
  if (isLoading) {
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

        <PullToRefresh className="flex-1 w-full pb-20">
          <div className="p-4 space-y-3 no-scrollbar sm:mx-auto sm:max-w-[390px] w-full animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-[22px] bg-card p-3 border border-border shadow-xs"
              >
                <div className="h-24 w-24 shrink-0 rounded-2xl bg-muted" />
                <div className="flex flex-1 flex-col justify-between min-w-0 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="h-4 w-16 rounded-md bg-muted" />
                    <div className="h-4 w-20 rounded-full bg-muted" />
                  </div>
                  <div className="h-3.5 w-3/4 rounded-md bg-muted" />
                  <div className="h-3 w-28 rounded-md bg-muted" />
                  <div className="h-3 w-24 rounded-md bg-muted" />
                  <div className="h-3 w-36 rounded-md bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </PullToRefresh>

        <BottomNav activeTab="bookings" />
      </div>
    );
  }

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

      <PullToRefresh className="flex-1 w-full pb-20">
        <div key={filters.tab} className="w-full sm:mx-auto sm:max-w-[390px]">
          {hasBookings ? (
            <BookingList
              bookings={bookings}
              onSelectBooking={(booking) => handleSelectBooking(booking.id)}
            />
          ) : (
            <BookingEmptyState onBookNow={handleNavigateToHome} />
          )}
        </div>
      </PullToRefresh>

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
