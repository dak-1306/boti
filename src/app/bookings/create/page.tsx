"use client";

import React, { Suspense, use } from "react";
import { BookingHeader } from "@/features/bookings/components/create/BookingCreateHeader";
import { BookingDateStrip } from "@/features/bookings/components/create/BookingDateStrip";
import { CourtSelector } from "@/features/bookings/components/create/CourtSelector";
import { TimeSlotGrid } from "@/features/bookings/components/create/TimeSlotGrid";
import { BookingCustomerForm } from "@/features/bookings/components/create/BookingCustomerForm";
import { BookingBottomBar } from "@/features/bookings/components/create/BookingBottomBar";
import { useBookingCreate } from "@/features/bookings/hooks/useBookingCreate";

interface BookingCreatePageProps {
  searchParams: Promise<{ venueId?: string }>;
}

function BookingCreateContent({
  searchParams,
}: {
  searchParams: Promise<{ venueId?: string }>;
}) {
  const resolvedParams = use(searchParams);

  const {
    venue,
    courts,
    selectedDate,
    setSelectedDate,
    selectedCourtId,
    setSelectedCourtId,
    activeCourt,
    selectedSlotIds,
    handleToggleSlot,
    form,
    totalPrice,
    handleSubmit,
  } = useBookingCreate(resolvedParams.venueId);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <BookingHeader venueName={venue.name} address={venue.address} />

      <BookingDateStrip
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        <div className="sm:mx-auto sm:max-w-[390px] w-full space-y-2">
          <CourtSelector
            courts={courts}
            selectedCourtId={selectedCourtId}
            onSelectCourt={setSelectedCourtId}
          />

          {activeCourt && (
            <TimeSlotGrid
              slots={activeCourt.slots}
              selectedSlotIds={selectedSlotIds}
              onToggleSlot={handleToggleSlot}
            />
          )}

          <BookingCustomerForm form={form} />
        </div>
      </div>

      <BookingBottomBar
        totalPrice={totalPrice}
        slotCount={selectedSlotIds.length}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default function BookingCreatePage({
  searchParams,
}: BookingCreatePageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-background text-xs font-bold text-muted-foreground">
          Đang tải thông tin đặt sân...
        </div>
      }
    >
      <BookingCreateContent searchParams={searchParams} />
    </Suspense>
  );
}
