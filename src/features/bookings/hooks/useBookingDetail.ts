import { useState, useCallback, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { BookingItem } from "../types/bookings.types";
import {
  RESCHEDULE_TEXTS,
  BOOKING_TEXTS,
} from "../constants/bookings.constants";
import { useBookingStore } from "@/stores/useBookingStore";

export function useBookingDetail(bookingId: string) {
  const { bookings, fetchMyBookings, cancelBooking, rescheduleBooking } =
    useBookingStore();

  const [isRescheduleDrawerOpen, setIsRescheduleDrawerOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  useEffect(() => {
    if (!bookings.length) {
      fetchMyBookings();
    }
  }, [bookings.length, fetchMyBookings]);

  // Khớp linh hoạt theo b.id hoặc b.bookingCode
  const booking = useMemo<BookingItem | null>(() => {
    const target = decodeURIComponent(bookingId);
    return (
      bookings.find(
        (b) =>
          String(b.id) === String(bookingId) ||
          String(b.id) === target ||
          b.bookingCode === target,
      ) || null
    );
  }, [bookings, bookingId]);

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

  const handleConfirmCancel = useCallback(async () => {
    const idToUse = booking?.id || bookingId;
    const success = await cancelBooking(idToUse);
    if (success) {
      setIsCancelDialogOpen(false);
      toast.error("Đã hủy đơn đặt sân thành công.");
    } else {
      toast.error("Hủy đơn thất bại. Vui lòng thử lại.");
    }
  }, [booking?.id, bookingId, cancelBooking]);

  const handleConfirmReschedule = useCallback(
    async ({
      newDateText,
      newTimeText,
    }: {
      newDateText: string;
      newTimeText: string;
    }) => {
      const idToUse = booking?.id || bookingId;

      const success = await rescheduleBooking(idToUse, {
        newDateText,
        newTimeText,
      });

      if (success) {
        setIsRescheduleDrawerOpen(false);
        toast.success(RESCHEDULE_TEXTS.successToast);
      } else {
        toast.error("Dời lịch thất bại. Vui lòng thử lại.");
      }
    },
    [booking?.id, bookingId, rescheduleBooking],
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
