"use client";

import React from "react";
import Image from "next/image";
import { BOOKING_TEXTS } from "../constants/bookings.constants";
import bannerBookingImg from "@/assets/images/banner_booking.png";

export function BookingHeader() {
  return (
    <div className="relative h-32 w-full overflow-hidden bg-gradient-to-r from-primary via-primary/95 to-primary/85 px-4 pt-6 text-primary-foreground shadow-xs">
      <div className="absolute inset-0 z-0 opacity-90">
        <Image
          src={bannerBookingImg}
          alt="Booking Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
      </div>

      <div className="relative z-10 space-y-1 top-6">
        <h1 className="text-xl font-extrabold tracking-tight">
          {BOOKING_TEXTS.headerTitle}
        </h1>
        <p className="text-xs font-medium opacity-90">
          {BOOKING_TEXTS.headerSubtitle}
        </p>
      </div>
    </div>
  );
}
