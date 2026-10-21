"use client";

import React from "react";
import { BookingHeader } from "@/features/bookings/components/BookingHeader";
import { BookingTabs } from "@/features/bookings/components/BookingTabs";
import { BookingSectionHeader } from "@/features/bookings/components/BookingSectionHeader";
import { BookingDateDrawer } from "@/features/bookings/components/BookingDateDrawer";
import { BookingList } from "@/features/bookings/components/BookingList";
import { BookingEmptyState } from "@/features/bookings/components/BookingEmptyState";
import { BottomNav } from "@/components/common/BottomNav";
import { useBookings } from "@/features/bookings/hooks/useBookings";
import { BOOKING_TABS } from "@/features/bookings/constants/bookings.constants";

export default function BookingsPage() {
  const {
    activeTab,
    onTabChange,
    selectedDate,
    onSelectDate,
    onClearDateFilter,
    selectedDateText,
    bookings,
    hasBookings,
    isDateDrawerOpen,
    openDateDrawer,
    closeDateDrawer,
    handleNavigateToHome,
  } = useBookings();

  const currentTabLabel =
    BOOKING_TABS.find((t) => t.id === activeTab)?.label || "Đã đặt";

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* VÙNG HEADER & FILTER CỐ ĐỊNH */}
      <div className="shrink-0">
        <BookingHeader />
        <BookingTabs activeTab={activeTab} onTabChange={onTabChange} />
        <BookingSectionHeader
          title={currentTabLabel}
          selectedDateText={selectedDateText}
          onOpenCalendar={openDateDrawer}
          onClearDateFilter={onClearDateFilter}
        />
      </div>

      {/* DANH SÁCH LỊCH ĐẶT / TRẠNG THÁI TRỐNG CUỘN ĐỘC LẬP */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {hasBookings ? (
          <BookingList bookings={bookings} />
        ) : (
          <BookingEmptyState onBookNow={handleNavigateToHome} />
        )}
      </div>

      {/* BOTTOM NAV */}
      <BottomNav activeTab="bookings" />

      {/* DRAWER BỘ LỊCH SHADCN */}
      <BookingDateDrawer
        isOpen={isDateDrawerOpen}
        onClose={closeDateDrawer}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
      />
    </div>
  );
}
