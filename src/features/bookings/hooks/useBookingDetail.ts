import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { BookingItem } from "../types/bookings.types";
import rawBookingsMock from "../data/bookings.mock.json";

export function useBookingDetail() {
  const params = useParams();
  const bookingId = (params?.id as string) || "b1";

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isRescheduleDrawerOpen, setIsRescheduleDrawerOpen] = useState(false);

  // Selector thuần: Lấy dữ liệu từ JSON Mock Layer
  const booking = useMemo<BookingItem>(() => {
    const list = rawBookingsMock as unknown as BookingItem[];
    const found = list.find((b) => b.id === bookingId);

    // Trả về item tìm thấy hoặc item đầu tiên trong danh sách
    return found || list[0];
  }, [bookingId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Lịch chơi tại ${booking.venueName}`,
          text: `Mã đặt sân: ${booking.bookingCode} | ${booking.dateText}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
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
