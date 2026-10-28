"use client";

import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { BookingItem, PassCourtPayload } from "../types/bookings.types";
import {
  RESCHEDULE_TEXTS,
  BOOKING_TEXTS,
} from "../constants/bookings.constants";
import {
  useMyBookingsQuery,
  useCancelBookingMutation,
  useRescheduleBookingMutation,
  usePassCourtMutation,
  useRevokePassMutation,
} from "./useBookingQuery";

export function useBookingDetail(bookingId: string) {
  const { data: bookings = [] } = useMyBookingsQuery();
  const cancelBookingMutation = useCancelBookingMutation();
  const rescheduleBookingMutation = useRescheduleBookingMutation();
  const passCourtMutation = usePassCourtMutation();
  const revokePassMutation = useRevokePassMutation();

  const [isRescheduleDrawerOpen, setIsRescheduleDrawerOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isPassDrawerOpen, setIsPassDrawerOpen] = useState(false);
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false);

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
    try {
      await cancelBookingMutation.mutateAsync(idToUse);
      setIsCancelDialogOpen(false);
      toast.error("Đã hủy đơn đặt sân thành công.");
    } catch {
      toast.error("Hủy đơn thất bại. Vui lòng thử lại.");
    }
  }, [booking?.id, bookingId, cancelBookingMutation]);

  const handleConfirmReschedule = useCallback(
    async ({
      newDateText,
      newTimeText,
    }: {
      newDateText: string;
      newTimeText: string;
    }) => {
      const idToUse = booking?.id || bookingId;
      try {
        await rescheduleBookingMutation.mutateAsync({
          id: idToUse,
          payload: { newDateText, newTimeText },
        });
        setIsRescheduleDrawerOpen(false);
        toast.success(RESCHEDULE_TEXTS.successToast);
      } catch {
        toast.error("Dời lịch thất bại. Vui lòng thử lại.");
      }
    },
    [booking?.id, bookingId, rescheduleBookingMutation],
  );

  const handleConfirmPass = useCallback(
    async (payload: PassCourtPayload) => {
      const idToUse = booking?.id || bookingId;
      const isEditing = booking?.status === "passing";
      try {
        await passCourtMutation.mutateAsync({ id: idToUse, payload });
        setIsPassDrawerOpen(false);
        toast.success(
          isEditing
            ? "Đã cập nhật thông tin Pass sân!"
            : "Đã đăng Pass sân thành công! Slot của bạn đã xuất hiện ở trang Pass sân.",
        );
      } catch {
        toast.error("Thao tác thất bại. Vui lòng thử lại.");
      }
    },
    [booking?.id, booking?.status, bookingId, passCourtMutation],
  );

  const handleConfirmRevokePass = useCallback(async () => {
    const idToUse = booking?.id || bookingId;
    try {
      await revokePassMutation.mutateAsync(idToUse);
      setIsRevokeDialogOpen(false);
      toast.success("Đã thu hồi lượt Pass sân thành công!");
    } catch {
      toast.error("Thu hồi Pass thất bại. Vui lòng thử lại.");
    }
  }, [booking?.id, bookingId, revokePassMutation]);

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
    isPassDrawerOpen,
    openPassDrawer: () => setIsPassDrawerOpen(true),
    closePassDrawer: () => setIsPassDrawerOpen(false),
    handleConfirmPass,
    isPassingLoading: passCourtMutation.isPending,
    isRevokeDialogOpen,
    openRevokeDialog: () => setIsRevokeDialogOpen(true),
    closeRevokeDialog: () => setIsRevokeDialogOpen(false),
    handleConfirmRevokePass,
    isRevokingLoading: revokePassMutation.isPending,
  };
}
