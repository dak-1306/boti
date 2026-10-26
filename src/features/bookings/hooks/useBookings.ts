import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BookingItem, BookingFilterState } from "../types/bookings.types";
import rawBookingsMock from "@/data/bookings.mock.json";

export const useBookings = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<BookingFilterState>({
    tab: "confirmed",
    filterMode: "all",
    selectedDate: undefined,
    selectedMonth: undefined,
    selectedYear: undefined,
  });

  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);
  const initialBookings = rawBookingsMock as unknown as BookingItem[];

  const filteredBookings = useMemo(() => {
    return initialBookings.filter((booking) => {
      if (booking.status !== filters.tab) return false;
      if (filters.filterMode === "all") return true;
      if (!booking.date || typeof booking.date !== "string") return false;

      const parts = booking.date.split("-").map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) return false;
      const [bYear, bMonth, bDay] = parts;

      if (filters.filterMode === "day" && filters.selectedDate) {
        return (
          bYear === filters.selectedDate.getFullYear() &&
          bMonth === filters.selectedDate.getMonth() + 1 &&
          bDay === filters.selectedDate.getDate()
        );
      }

      if (
        filters.filterMode === "month" &&
        filters.selectedYear !== undefined
      ) {
        return (
          bYear === filters.selectedYear &&
          bMonth === (filters.selectedMonth ?? 0) + 1
        );
      }

      if (filters.filterMode === "year" && filters.selectedYear !== undefined) {
        return bYear === filters.selectedYear;
      }

      return true;
    });
  }, [filters, initialBookings]);

  const selectedDateText = useMemo(() => {
    if (filters.filterMode === "all") return null;

    if (filters.filterMode === "day" && filters.selectedDate) {
      return filters.selectedDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }

    if (filters.filterMode === "month" && filters.selectedYear !== undefined) {
      const monthStr = String((filters.selectedMonth ?? 0) + 1).padStart(
        2,
        "0",
      );
      return `Tháng ${monthStr}/${filters.selectedYear}`;
    }

    if (filters.filterMode === "year" && filters.selectedYear !== undefined) {
      return `Năm ${filters.selectedYear}`;
    }

    return null;
  }, [filters]);

  const handleOpenDateDrawer = () => {
    const now = new Date();
    setFilters((prev) => ({
      ...prev,
      selectedDate: prev.selectedDate ?? now,
      selectedMonth: prev.selectedMonth ?? now.getMonth(),
      selectedYear: prev.selectedYear ?? now.getFullYear(),
    }));
    setIsDateDrawerOpen(true);
  };

  const handleSelectBooking = (id: string) => {
    router.push(`/bookings/${id}`);
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
      setFilters((prev) => ({ ...prev, filterMode: "all" })),
    handleNavigateToHome: () => router.push("/home"),
    handleSelectBooking,
  };
};
