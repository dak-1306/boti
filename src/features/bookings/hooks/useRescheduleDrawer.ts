import { useState, useMemo } from "react";
import { BookingItem } from "../types/bookings.types";
import {
  RescheduleSlotOption,
  RescheduleDateOption,
} from "../types/bookings.types";
import rawVenuesMock from "@/data/venues.mock.json";

interface UseRescheduleDrawerProps {
  booking: BookingItem | null;
  onConfirmReschedule: (payload: {
    newDateText: string;
    newTimeText: string;
  }) => void;
  onClose: () => void;
}

export function useRescheduleDrawer({
  booking,
  onConfirmReschedule,
  onClose,
}: UseRescheduleDrawerProps) {
  // Tạo danh sách 7 ngày tiếp theo để chọn
  const dateOptions: RescheduleDateOption[] = useMemo(() => {
    const dates: RescheduleDateOption[] = [];
    const today = new Date();
    const dayNames = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isoDate = d.toISOString().split("T")[0];
      dates.push({
        date: isoDate,
        dayName: i === 0 ? "Hôm nay" : dayNames[d.getDay()],
        displayDate: `${d.getDate()}/${d.getMonth() + 1}`,
        isToday: i === 0,
      });
    }
    return dates;
  }, []);

  const [selectedDateOption, setSelectedDateOption] =
    useState<RescheduleDateOption>(dateOptions[0]);
  const [selectedSlot, setSelectedSlot] = useState<RescheduleSlotOption | null>(
    null,
  );

  // Tìm sân tương ứng từ Mock Data
  const currentVenue = useMemo(() => {
    if (!booking) return null;
    return (
      rawVenuesMock.find((v) => v.id === booking.venueId) || rawVenuesMock[0]
    );
  }, [booking]);

  // Giả định đơn giá slot từ thông tin booking cũ (e.g. 240.000đ/giờ)
  const targetSlotPrice = 240000;

  // Lọc khung giờ theo ngày được chọn & kiểm tra tính hợp lệ về giá
  const courtSlots = useMemo(() => {
    if (!currentVenue) return [];

    return currentVenue.courts.map((court) => {
      const slots: RescheduleSlotOption[] = court.slots.map((s) => ({
        slotId: s.id,
        courtId: court.id,
        courtName: court.name,
        startTime: s.startTime,
        endTime: s.endTime,
        price: s.price,
        isAvailable: s.isAvailable,
        isSamePrice: s.price === targetSlotPrice,
      }));
      return {
        courtId: court.id,
        courtName: court.name,
        slots,
      };
    });
  }, [currentVenue, targetSlotPrice]);

  const handleConfirm = () => {
    if (!selectedSlot || !booking) return;

    const newDateText = `${selectedDateOption.dayName}, ${selectedDateOption.displayDate}/2026`;
    const newTimeText = `${selectedSlot.startTime} - ${selectedSlot.endTime} (${selectedSlot.courtName})`;

    onConfirmReschedule({ newDateText, newTimeText });
    onClose();
  };

  return {
    dateOptions,
    selectedDateOption,
    setSelectedDateOption,
    courtSlots,
    selectedSlot,
    setSelectedSlot,
    targetSlotPrice,
    handleConfirm,
  };
}
