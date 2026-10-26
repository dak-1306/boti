import { useState, useCallback } from "react";
import { toast } from "sonner";
import rawBookingsMock from "@/data/bookings.mock.json";
import { BookingItem } from "../types/bookings.types";
import {
  RESCHEDULE_TEXTS,
  BOOKING_TEXTS,
} from "../constants/bookings.constants";

export function useBookingDetail(bookingId: string) {
  const [booking, setBooking] = useState<BookingItem | null>(() => {
    const found = rawBookingsMock.find((b) => b.id === bookingId);
    return (found as BookingItem) || (rawBookingsMock[0] as BookingItem);
  });

  const [isRescheduleDrawerOpen, setIsRescheduleDrawerOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const handleShare = useCallback(() => {
    if (navigator.share && booking) {
      navigator
        .share({
          title: `Đặt sân ${booking.venueName}`,
          text: `Mã đặt sân: ${booking.bookingCode}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(
        BOOKING_TEXTS.shareSuccessToast || "Đã sao chép liên kết đơn đặt sân!",
      );
    }
  }, [booking]);

  const handleConfirmCancel = useCallback(() => {
    setBooking((prev) =>
      prev
        ? {
            ...prev,
            status: "cancelled",
            statusText: "Đã hủy",
          }
        : null,
    );
    toast.error("Đã hủy đơn đặt sân thành công.");
  }, []);

  const handleConfirmReschedule = useCallback(
    ({
      newDateText,
      newTimeText,
    }: {
      newDateText: string;
      newTimeText: string;
    }) => {
      setBooking((prev) =>
        prev
          ? {
              ...prev,
              status: "rescheduled",
              statusText: "Đã dời lịch",
              dateText: newDateText,
              timeText: newTimeText,
            }
          : null,
      );
      toast.success(RESCHEDULE_TEXTS.successToast);
    },
    [],
  );

  return {
    booking,
    handleShare,
    isCancelDialogOpen,
    openCancelDialog: () => setIsCancelDialogOpen(true),
    closeCancelDialog: () => setIsCancelDialogOpen(false),
    handleConfirmCancel,
    isRescheduleDrawerOpen,
    openRescheduleDrawer: () => setIsRescheduleDrawerOpen(true),
    closeRescheduleDrawer: () => setIsRescheduleDrawerOpen(false),
    handleConfirmReschedule,
  };
}
