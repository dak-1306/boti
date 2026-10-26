import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BookingCustomer, CourtOption } from "../types/booking-create.types";
import { BOOKING_CREATE_TEXTS } from "../constants/booking-create.constants";
import { Venue } from "@/features/home/types/home.types";
import rawVenuesMock from "@/data/venues.mock.json";

export function useBookingCreate(venueIdParam?: string) {
  const router = useRouter();
  const venueId = venueIdParam || "v1";

  const venue = useMemo<Venue>(() => {
    const list = rawVenuesMock as unknown as Venue[];
    return list.find((v) => v.id === venueId) || list[0];
  }, [venueId]);

  const courts = useMemo<CourtOption[]>(() => {
    return venue.courts || [];
  }, [venue]);

  // Lazy initialize Date để tương thích Next.js 16 Prerendering
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [selectedCourtId, setSelectedCourtId] = useState<string>("");
  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);

  const [customer, setCustomer] = useState<BookingCustomer>({
    name: "Nguyễn Văn A",
    phone: "0901234567",
    playerCount: 2,
    notes: "",
  });

  // Đảm bảo activeCourt luôn thuộc venue hiện tại
  const activeCourt = useMemo(() => {
    if (!courts.length) return null;
    return courts.find((c) => c.id === selectedCourtId) || courts[0];
  }, [courts, selectedCourtId]);

  const totalPrice = useMemo(() => {
    if (!activeCourt) return 0;
    return activeCourt.slots
      .filter((s) => selectedSlotIds.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
  }, [activeCourt, selectedSlotIds]);

  const handleToggleSlot = (slotId: string) => {
    setSelectedSlotIds((prev) =>
      prev.includes(slotId)
        ? prev.filter((id) => id !== slotId)
        : [...prev, slotId],
    );
  };

  const handleChangeCustomer = (
    field: keyof BookingCustomer,
    value: string | number,
  ) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    alert(
      `${BOOKING_CREATE_TEXTS.alertSuccessTitle}\nSân: ${venue.name}\nTổng tiền: ${totalPrice.toLocaleString("vi-VN")} đ`,
    );
    router.push("/bookings");
  };

  return {
    venue,
    courts,
    selectedDate,
    setSelectedDate,
    selectedCourtId: activeCourt?.id || "",
    setSelectedCourtId: (id: string) => {
      setSelectedCourtId(id);
      setSelectedSlotIds([]);
    },
    activeCourt,
    selectedSlotIds,
    handleToggleSlot,
    customer,
    handleChangeCustomer,
    totalPrice,
    handleSubmit,
  };
}
