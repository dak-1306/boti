import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CourtOption } from "../types/booking-create.types";
import { BOOKING_CREATE_TEXTS } from "../constants/booking-create.constants";
import {
  bookingCustomerSchema,
  BookingCustomerFormData,
} from "../schemas/booking-create.schema";
import { Venue } from "@/features/home/types/home.types";
import rawVenuesMock from "@/data/venues.mock.json";
import { useBookingStore } from "@/stores/useBookingStore";

export function useBookingCreate(venueIdParam?: string) {
  const router = useRouter();
  const venueId = venueIdParam || "v1";
  const {
    setDraftBooking,
    bookings: storeBookings,
    fetchMyBookings,
  } = useBookingStore();

  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [selectedCourtId, setSelectedCourtId] = useState<string>("");
  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);

  // 1. Tải danh sách đơn hiện có để kiểm tra trùng lịch
  useEffect(() => {
    fetchMyBookings();
  }, [fetchMyBookings]);

  const venue = useMemo<Venue>(() => {
    const list = rawVenuesMock as unknown as Venue[];
    return list.find((v) => String(v.id) === String(venueId)) || list[0];
  }, [venueId]);

  const rawCourts = useMemo<CourtOption[]>(() => venue.courts || [], [venue]);

  // 2. Chuyển ngày chọn sang định dạng YYYY-MM-DD để so sánh
  const formattedSelectedDate = useMemo(() => {
    const y = selectedDate.getFullYear();
    const m = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const d = String(selectedDate.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, [selectedDate]);

  // 3. Tính toán tính khả dụng ĐỘNG cho từng slot (Dynamic Availability)
  const courts = useMemo<CourtOption[]>(() => {
    return rawCourts.map((court) => {
      const updatedSlots = court.slots.map((slot) => {
        const slotTimeStr = `${slot.startTime} - ${slot.endTime}`;

        // Kiểm tra xem slot này đã có trong đơn đặt nào chưa
        const isAlreadyBooked = storeBookings.some((b) => {
          if (String(b.venueId) !== String(venue.id)) return false;
          if (b.status === "cancelled") return false; // Đơn đã hủy thì bỏ qua

          // So sánh ngày
          const bookingDate = b.date;
          if (bookingDate !== formattedSelectedDate) return false;

          // So sánh sân con và khung giờ
          const isCourtMatch =
            !b.timeText.includes("(") || b.timeText.includes(court.name);
          const isTimeMatch = b.timeText.includes(slotTimeStr);

          return isCourtMatch && isTimeMatch;
        });

        return {
          ...slot,
          // Slot khả dụng khi dữ liệu gốc cho phép VÀ chưa có ai đặt thành công
          isAvailable: slot.isAvailable && !isAlreadyBooked,
        };
      });

      return {
        ...court,
        slots: updatedSlots,
      };
    });
  }, [rawCourts, storeBookings, venue.id, formattedSelectedDate]);

  const form = useForm<BookingCustomerFormData>({
    resolver: zodResolver(bookingCustomerSchema),
    defaultValues: {
      name: "Nguyễn Văn A",
      phone: "0901234567",
      notes: "",
    },
  });

  const activeCourt = useMemo(() => {
    if (!courts.length) return null;
    return (
      courts.find((c) => String(c.id) === String(selectedCourtId)) || courts[0]
    );
  }, [courts, selectedCourtId]);

  const totalPrice = useMemo(() => {
    if (!activeCourt) return 0;
    return activeCourt.slots
      .filter((s) => selectedSlotIds.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
  }, [activeCourt, selectedSlotIds]);

  const handleToggleSlot = (slotId: string) => {
    const slot = activeCourt?.slots.find((s) => s.id === slotId);
    if (slot && !slot.isAvailable) {
      toast.error("Khung giờ này đã được đặt trước!");
      return;
    }

    setSelectedSlotIds((prev) =>
      prev.includes(slotId)
        ? prev.filter((id) => id !== slotId)
        : [...prev, slotId],
    );
  };

  const onValidSubmit = (data: BookingCustomerFormData) => {
    if (selectedSlotIds.length === 0) {
      toast.error(BOOKING_CREATE_TEXTS.valSelectSlotRequired);
      return;
    }

    if (!activeCourt) return;

    setDraftBooking({
      venueId: venue.id,
      venueName: venue.name,
      venueAddress: venue.address || "",
      courtName: activeCourt.name,
      dateText: selectedDate.toLocaleDateString("vi-VN", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      slots: activeCourt.slots
        .filter((s) => selectedSlotIds.includes(s.id))
        .map((s) => ({
          id: s.id,
          timeText: `${s.startTime} - ${s.endTime}`,
          price: s.price,
        })),
      totalPrice,
      customerName: data.name,
      customerPhone: data.phone,
    });

    router.push("/checkout");
  };

  return {
    venue,
    courts,
    selectedDate,
    setSelectedDate: (date: Date) => {
      setSelectedDate(date);
      setSelectedSlotIds([]); // Reset slot chọn khi đổi ngày
    },
    selectedCourtId: activeCourt?.id || "",
    setSelectedCourtId: (id: string) => {
      setSelectedCourtId(id);
      setSelectedSlotIds([]); // Reset slot chọn khi đổi sân con
    },
    activeCourt,
    selectedSlotIds,
    handleToggleSlot,
    form,
    totalPrice,
    handleSubmit: form.handleSubmit(onValidSubmit),
  };
}
