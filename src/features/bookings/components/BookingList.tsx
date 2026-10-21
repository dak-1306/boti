"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookingItem } from "../types/bookings.types";
import { BookingCard } from "./BookingCard";
import {
  gridContainerVariants,
  gridItemVariants,
} from "@/features/home/constants/home.motion";

interface BookingListProps {
  bookings: BookingItem[];
  onSelectBooking?: (booking: BookingItem) => void;
}

export function BookingList({ bookings, onSelectBooking }: BookingListProps) {
  return (
    <motion.div
      variants={gridContainerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3 px-4 py-3"
    >
      {bookings.map((booking) => (
        <motion.div key={booking.id} variants={gridItemVariants}>
          <BookingCard
            booking={booking}
            onClick={() => onSelectBooking?.(booking)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
