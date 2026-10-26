"use client";

import React from "react";
import { PageHeader } from "@/components/common/page-header";
import { BOOKING_TEXTS } from "../constants/bookings.constants";
import bannerBookingImg from "@/assets/images/banner_booking.png";

interface BookingHeaderProps {
  venueName?: string;
  address?: string;
  showBack?: boolean;
  onBack?: () => void;
  disableRounded?: boolean;
  bottomExtension?: React.ReactNode;
  extensionClassName?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BookingHeader({
  venueName,
  address,
  showBack = false,
  onBack,
  disableRounded = false,
  bottomExtension,
  extensionClassName = "-mt-5.5",
  className,
  children,
}: BookingHeaderProps) {
  return (
    <PageHeader
      title={venueName || BOOKING_TEXTS.headerTitle}
      subtitle={address || BOOKING_TEXTS.headerSubtitle}
      showBack={showBack}
      onBack={onBack}
      variant="banner"
      bannerImg={bannerBookingImg}
      disableRounded={disableRounded}
      className={className}
      bottomExtension={bottomExtension}
      extensionClassName={extensionClassName}
    >
      {children}
    </PageHeader>
  );
}
