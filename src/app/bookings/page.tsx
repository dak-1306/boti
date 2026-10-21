"use client";

import React from "react";
import { BookingHeader } from "@/features/bookings/components/BookingHeader";
import { BookingTabs } from "@/features/bookings/components/BookingTabs";
import { BookingSectionHeader } from "@/features/bookings/components/BookingSectionHeader";
import { BookingDateDrawer } from "@/features/bookings/components/date-drawer/BookingDateDrawer";
import { BookingList } from "@/features/bookings/components/BookingList";
import { BookingEmptyState } from "@/features/bookings/components/BookingEmptyState";
import { BottomNav } from "@/components/common/BottomNav";
import { useBookings } from "@/features/bookings/hooks/useBookings";
import { BOOKING_TABS } from "@/features/bookings/constants/bookings.constants";

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
      {/* VÙNG HEADER CỐ ĐỊNH */}
      <div className="shrink-0">
        <BookingHeader />
        <BookingTabs
          activeTab={filters.tab}
          onTabChange={(tab) => setFilters((prev) => ({ ...prev, tab }))}
        />
        <BookingSectionHeader
          title={currentTabLabel}
          selectedDateText={selectedDateText}
          onOpenCalendar={openDateDrawer}
          onClearDateFilter={clearDateFilter}
        />
      </div>

      {/* DANH SÁCH CUỘN ĐỘC LẬP */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {hasBookings ? (
          <BookingList
            bookings={bookings}
            onSelectBooking={(booking) => handleSelectBooking(booking.id)}
          />
        ) : (
          <BookingEmptyState onBookNow={handleNavigateToHome} />
        )}
      </div>

      <BottomNav activeTab="bookings" />

      {/* DRAWER LỌC THỜI GIAN ĐA NĂNG */}
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
