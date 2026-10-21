import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  BookingItem,
  BookingTab,
  BookingFilterState,
} from "../types/bookings.types";
import rawBookingsMock from "../data/bookings.mock.json";

// Hàm hỗ trợ format Date object sang YYYY-MM-DD local
const formatToYMD = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const useBookings = () => {
  const router = useRouter();

  // 1. STATE QUẢN LÝ TẬP TRUNG TOÀN BỘ FILTER
  const [filters, setFilters] = useState<BookingFilterState>({
    tab: "confirmed",
    selectedDate: undefined,
  });

  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);
  const initialBookings = rawBookingsMock as BookingItem[];

  // 2. LOGIC LỌC ĐỒNG BỘ NĂNG ĐỘNG (TAB + NGÀY CHỌN)
  const filteredBookings = useMemo(() => {
    return initialBookings.filter((booking) => {
      // Khớp theo Tab (Status)
      const matchesTab = booking.status === filters.tab;

      // Khớp theo Ngày (Nếu người dùng có chọn ngày trên Lịch)
      let matchesDate = true;
      if (filters.selectedDate) {
        const targetDateStr = formatToYMD(filters.selectedDate);
        matchesDate = booking.date === targetDateStr;
      }

      return matchesTab && matchesDate;
    });
  }, [filters, initialBookings]);

  // Text hiển thị trên Chip chọn ngày
  const selectedDateText = filters.selectedDate
    ? filters.selectedDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null;

  // Handlers cập nhật state tập trung
  const handleTabChange = (tab: BookingTab) => {
    setFilters((prev) => ({ ...prev, tab }));
  };

  const handleDateSelect = (date?: Date) => {
    setFilters((prev) => ({ ...prev, selectedDate: date }));
  };

  const handleClearDateFilter = () => {
    setFilters((prev) => ({ ...prev, selectedDate: undefined }));
  };

  return {
    // Filter State & Setters
    activeTab: filters.tab,
    onTabChange: handleTabChange,
    selectedDate: filters.selectedDate,
    onSelectDate: handleDateSelect,
    onClearDateFilter: handleClearDateFilter,
    selectedDateText,

    // Result Data
    bookings: filteredBookings,
    hasBookings: filteredBookings.length > 0,

    // Drawer State
    isDateDrawerOpen,
    openDateDrawer: () => setIsDateDrawerOpen(true),
    closeDateDrawer: () => setIsDateDrawerOpen(false),

    // Navigation
    handleNavigateToHome: () => router.push("/home"),
  };
};
