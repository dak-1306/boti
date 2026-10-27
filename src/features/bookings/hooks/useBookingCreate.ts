import { useState, useMemo } from "react";
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

  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [selectedCourtId, setSelectedCourtId] = useState<string>("");
  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);

  // Khởi tạo React Hook Form với Zod
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

  const onValidSubmit = (data: BookingCustomerFormData) => {
    if (selectedSlotIds.length === 0) {
      toast.error(BOOKING_CREATE_TEXTS.valSelectSlotRequired);
      return;
    }

    toast.success(BOOKING_CREATE_TEXTS.alertSuccessTitle, {
      description: `Sân: ${venue.name} • Tổng tiền: ${totalPrice.toLocaleString("vi-VN")}đ`,
    });
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
    form,
    totalPrice,
    handleSubmit: form.handleSubmit(onValidSubmit),
  };
}
