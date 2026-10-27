"use client";

import React from "react";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { BookingItem } from "../types/bookings.types";
import { BookingCard } from "./BookingCard";

interface BookingListProps {
  bookings: BookingItem[];
  onSelectBooking?: (booking: BookingItem) => void;
}

export function BookingList({ bookings, onSelectBooking }: BookingListProps) {
  return (
    <StaggerGroup className="space-y-3 px-4 py-3">
      {bookings.map((booking) => (
        <div key={booking.id}>
          <BookingCard
            booking={booking}
            onClick={() => onSelectBooking?.(booking)}
          />
        </div>
      ))}
    </StaggerGroup>
  );
}
