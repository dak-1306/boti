import { useState, useMemo } from "react";
import { BookingItem } from "../types/bookings.types";
import rawBookingsMock from "@/data/bookings.mock.json";

export function useBookingDetail(id?: string) {
  const targetId = id || "b_01";
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isRescheduleDrawerOpen, setIsRescheduleDrawerOpen] = useState(false);

  const booking = useMemo<BookingItem | null>(() => {
    const list = rawBookingsMock as unknown as BookingItem[];
    const found = list.find((b) => b.id === targetId);
    return found || null;
  }, [targetId]);

  const handleShare = async () => {
    if (!booking) return;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Lịch chơi tại ${booking.venueName}`,
          text: `Mã đặt sân: ${booking.bookingCode} | ${booking.dateText}`,
          url: window.location.href,
        });
      } catch {
        // Hủy chia sẻ
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Đã sao chép liên kết đơn đặt sân!");
    }
  };

  const handleCancelBooking = () => {
    alert("Yêu cầu hủy lịch đã được gửi thành công!");
    setIsCancelDialogOpen(false);
  };

  const handleRescheduleBooking = () => {
    alert("Yêu cầu dời lịch đã được gửi thành công!");
    setIsRescheduleDrawerOpen(false);
  };

  return {
    booking,
    handleShare,
    isCancelDialogOpen,
    openCancelDialog: () => setIsCancelDialogOpen(true),
    closeCancelDialog: () => setIsCancelDialogOpen(false),
    handleCancelBooking,
    isRescheduleDrawerOpen,
    openRescheduleDrawer: () => setIsRescheduleDrawerOpen(true),
    closeRescheduleDrawer: () => setIsRescheduleDrawerOpen(false),
    handleRescheduleBooking,
  };
}
