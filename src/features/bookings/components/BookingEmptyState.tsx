"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BOOKING_TEXTS } from "../constants/bookings.constants";
import emptyBookingIcon from "@/assets/icons/empty_booking.svg";

interface BookingEmptyStateProps {
  onBookNow: () => void;
}

export function BookingEmptyState({ onBookNow }: BookingEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center text-center py-8"
    >
      <div className="relative h-44 w-44">
        <Image
          src={emptyBookingIcon}
          alt={BOOKING_TEXTS.emptyTitle}
          fill
          priority
          className="object-contain"
        />
      </div>

      <h3 className="mt-4 text-base font-extrabold text-foreground">
        {BOOKING_TEXTS.emptyTitle}
      </h3>
      <p className="mt-1.5 text-xs text-muted-foreground max-w-[260px] leading-relaxed">
        {BOOKING_TEXTS.emptySubtitle}
      </p>

      <button
        onClick={onBookNow}
        className="mt-6 h-11 w-full max-w-[220px] rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg transition hover:bg-primary/90 active:scale-95"
      >
        {BOOKING_TEXTS.bookNowBtn}
      </button>
    </motion.div>
  );
}
