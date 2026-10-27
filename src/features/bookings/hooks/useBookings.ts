import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BookingItem,
  BookingFilterState,
  BookingTab,
  DateFilterMode,
} from "../types/bookings.types";
import { useBookingStore } from "@/stores/useBookingStore";

interface LocalDateFilterState {
  filterMode: DateFilterMode;
  selectedDate?: Date;
  selectedMonth?: number;
  selectedYear?: number;
}

export const useBookings = () => {
  const router = useRouter();
  const {
    bookings: storeBookings,
    fetchMyBookings,
    activeTab,
    setActiveTab,
  } = useBookingStore();

  // Local state chỉ quản lý bộ lọc ngày/tháng/năm
  const [dateFilters, setDateFilters] = useState<LocalDateFilterState>({
    filterMode: "all",
    selectedDate: undefined,
    selectedMonth: undefined,
    selectedYear: undefined,
  });

  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);

  useEffect(() => {
    fetchMyBookings();
  }, [fetchMyBookings]);

  // Derived state: Hợp nhất activeTab từ Store và dateFilters từ Local State (Không dùng useEffect)
  const filters: BookingFilterState = useMemo(
    () => ({
      tab: activeTab || "confirmed",
      ...dateFilters,
    }),
    [activeTab, dateFilters]
  );

  // Hàm setFilters giữ nguyên Interface cũ để không làm hỏng UI Components
  const setFilters = (
    updater:
      | BookingFilterState
      | ((prev: BookingFilterState) => BookingFilterState)
  ) => {
    const next = typeof updater === "function" ? updater(filters) : updater;
    
    // Nếu tab thay đổi, ghi trực tiếp vào Zustand Store
    if (next.tab !== activeTab) {
      setActiveTab(next.tab as BookingTab);
    }

    // Cập nhật phần filter ngày cục bộ
    setDateFilters({
      filterMode: next.filterMode,
      selectedDate: next.selectedDate,
      selectedMonth: next.selectedMonth,
      selectedYear: next.selectedYear,
    });
  };

  const filteredBookings = useMemo(() => {
    const list = storeBookings as unknown as BookingItem[];
    return list.filter((booking) => {
      if (booking.status !== activeTab) return false;
      if (dateFilters.filterMode === "all") return true;
      if (!booking.date || typeof booking.date !== "string") return false;

      const parts = booking.date.split("-").map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) return false;
      const [bYear, bMonth, bDay] = parts;

      if (dateFilters.filterMode === "day" && dateFilters.selectedDate) {
        return (
          bYear === dateFilters.selectedDate.getFullYear() &&
          bMonth === dateFilters.selectedDate.getMonth() + 1 &&
          bDay === dateFilters.selectedDate.getDate()
        );
      }

      if (
        dateFilters.filterMode === "month" &&
        dateFilters.selectedYear !== undefined
      ) {
        return (
          bYear === dateFilters.selectedYear &&
          bMonth === (dateFilters.selectedMonth ?? 0) + 1
        );
      }

      if (dateFilters.filterMode === "year" && dateFilters.selectedYear !== undefined) {
        return bYear === dateFilters.selectedYear;
      }

      return true;
    });
  }, [activeTab, dateFilters, storeBookings]);

  const selectedDateText = useMemo(() => {
    if (dateFilters.filterMode === "all") return null;

    if (dateFilters.filterMode === "day" && dateFilters.selectedDate) {
      return dateFilters.selectedDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }

    if (dateFilters.filterMode === "month" && dateFilters.selectedYear !== undefined) {
      const monthStr = String((dateFilters.selectedMonth ?? 0) + 1).padStart(
        2,
        "0"
      );
      return `Tháng ${monthStr}/${dateFilters.selectedYear}`;
    }

    if (dateFilters.filterMode === "year" && dateFilters.selectedYear !== undefined) {
      return `Năm ${dateFilters.selectedYear}`;
    }

    return null;
  }, [dateFilters]);

  const handleOpenDateDrawer = () => {
    const now = new Date();
    setDateFilters((prev) => ({
      ...prev,
      selectedDate: prev.selectedDate ?? now,
      selectedMonth: prev.selectedMonth ?? now.getMonth(),
      selectedYear: prev.selectedYear ?? now.getFullYear(),
    }));
    setIsDateDrawerOpen(true);
  };

  return {
    filters,
    setFilters,
    selectedDateText,
    bookings: filteredBookings,
    hasBookings: filteredBookings.length > 0,
    isDateDrawerOpen,
    openDateDrawer: handleOpenDateDrawer,
    closeDateDrawer: () => setIsDateDrawerOpen(false),
    clearDateFilter: () =>
      setDateFilters((prev) => ({ ...prev, filterMode: "all" })),
    handleNavigateToHome: () => router.push("/home"),
    handleSelectBooking: (id: string) => router.push(`/bookings/${id}`),
  };
};