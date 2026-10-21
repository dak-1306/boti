import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BookingItem, BookingFilterState } from "../types/bookings.types";
import rawBookingsMock from "../data/bookings.mock.json";

export const useBookings = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<BookingFilterState>({
    tab: "confirmed",
    filterMode: "all",
    selectedDate: new Date(),
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
  });

  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);
  const initialBookings = rawBookingsMock as unknown as BookingItem[];

  // LOGIC LỌC TỔNG HỢP THEO TAB + (NGÀY / THÁNG / NĂM)
  const filteredBookings = useMemo(() => {
    return initialBookings.filter((booking) => {
      if (booking.status !== filters.tab) return false;
      if (filters.filterMode === "all") return true;

      const [bYear, bMonth, bDay] = booking.date.split("-").map(Number);

      if (filters.filterMode === "day" && filters.selectedDate) {
        return (
          bYear === filters.selectedDate.getFullYear() &&
          bMonth === filters.selectedDate.getMonth() + 1 &&
          bDay === filters.selectedDate.getDate()
        );
      }

      if (filters.filterMode === "month") {
        return (
          bYear === filters.selectedYear &&
          bMonth === (filters.selectedMonth ?? 0) + 1
        );
      }

      if (filters.filterMode === "year") {
        return bYear === filters.selectedYear;
      }

      return true;
    });
  }, [filters, initialBookings]);

  // Chuỗi Text hiển thị trên Chip Filter ngoài Header
  const selectedDateText = useMemo(() => {
    if (filters.filterMode === "all") return null;

    if (filters.filterMode === "day" && filters.selectedDate) {
      return filters.selectedDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }

    if (filters.filterMode === "month") {
      const monthStr = String((filters.selectedMonth ?? 0) + 1).padStart(
        2,
        "0",
      );
      return `Tháng ${monthStr}/${filters.selectedYear}`;
    }

    if (filters.filterMode === "year") {
      return `Năm ${filters.selectedYear}`;
    }

    return null;
  }, [filters]);

  // HÀM CHUYỂN TRANG CHI TIẾT THEO ID ĐƠN ĐẶT
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
    openDateDrawer: () => setIsDateDrawerOpen(true),
    closeDateDrawer: () => setIsDateDrawerOpen(false),
    clearDateFilter: () =>
      setFilters((prev) => ({ ...prev, filterMode: "all" })),
    handleNavigateToHome: () => router.push("/home"),
    handleSelectBooking,
  };
};
