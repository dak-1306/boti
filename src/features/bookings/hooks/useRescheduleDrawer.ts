"use client";

import { useState, useMemo } from "react";
import {
  BookingItem,
  RescheduleSlotOption,
  RescheduleDateOption,
} from "../types/bookings.types";
import rawVenuesMock from "@/data/venues.mock.json";
import { useMyBookingsQuery } from "./useBookingQuery";

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
  const { data: storeBookings = [] } = useMyBookingsQuery();

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
      const actualDayName = dayNames[d.getDay()];

      dates.push({
        date: isoDate,
        dayName: actualDayName,
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

  const currentVenue = useMemo(() => {
    if (!booking?.venueId) return rawVenuesMock[0];
    return (
      rawVenuesMock.find((v) => String(v.id) === String(booking.venueId)) ||
      rawVenuesMock[0]
    );
  }, [booking]);

  const targetSlotPrice = useMemo(() => {
    return booking?.payment?.totalFee || booking?.payment?.courtFee || 240000;
  }, [booking]);

  const courtSlots = useMemo(() => {
    if (!currentVenue?.courts) return [];

    return currentVenue.courts.map((court) => {
      const slots: RescheduleSlotOption[] = court.slots.map((s) => {
        const slotTimeStr = `${s.startTime} - ${s.endTime}`;

        const isOccupiedByAnotherBooking = storeBookings.some((b) => {
          if (
            String(b.id) === String(booking?.id) ||
            b.bookingCode === booking?.bookingCode
          ) {
            return false;
          }
          if (b.status === "cancelled") return false;
          if (String(b.venueId) !== String(currentVenue.id)) return false;
          if (b.date !== selectedDateOption.date) return false;

          const isCourtMatch =
            !b.timeText.includes("(") || b.timeText.includes(court.name);
          const isTimeMatch = b.timeText.includes(slotTimeStr);

          return isCourtMatch && isTimeMatch;
        });

        const isAvailable = s.isAvailable && !isOccupiedByAnotherBooking;

        return {
          slotId: s.id,
          courtId: court.id,
          courtName: court.name,
          startTime: s.startTime,
          endTime: s.endTime,
          price: s.price,
          isAvailable,
          isSamePrice: s.price === targetSlotPrice,
        };
      });

      return {
        courtId: court.id,
        courtName: court.name,
        slots,
      };
    });
  }, [
    currentVenue,
    targetSlotPrice,
    storeBookings,
    booking,
    selectedDateOption,
  ]);

  const handleConfirm = () => {
    if (!selectedSlot || !booking) return;

    const year = new Date().getFullYear();
    const newDateText = `${selectedDateOption.dayName}, ${selectedDateOption.displayDate}/${year}`;
    const newTimeText = `${selectedSlot.startTime} - ${selectedSlot.endTime} (${selectedSlot.courtName})`;

    onConfirmReschedule({ newDateText, newTimeText });
    onClose();
  };

  return {
    dateOptions,
    selectedDateOption,
    setSelectedDateOption: (opt: RescheduleDateOption) => {
      setSelectedDateOption(opt);
      setSelectedSlot(null);
    },
    courtSlots,
    selectedSlot,
    setSelectedSlot,
    targetSlotPrice,
    handleConfirm,
  };
}
