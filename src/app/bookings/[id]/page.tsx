"use client";

import React, { Suspense, use } from "react";
import { PageHeader } from "@/components/common/page-header";
import { useBookingDetail } from "@/features/bookings/hooks/useBookingDetail";
import { BookingSummaryCard } from "@/features/bookings/components/detail/BookingSummaryCard";
import { BookingQRCard } from "@/features/bookings/components/detail/BookingQRCard";
import { BookingCustomerCard } from "@/features/bookings/components/detail/BookingCustomerCard";
import { BookingPaymentCard } from "@/features/bookings/components/detail/BookingPaymentCard";
import { BookingBottomActions } from "@/features/bookings/components/detail/BookingBottomActions";
import { BOOKING_TEXTS } from "@/features/bookings/constants/bookings.constants";

interface BookingDetailPageProps {
  params: Promise<{ id: string }>;
}

function BookingDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  const { booking, handleShare, openCancelDialog, openRescheduleDrawer } =
    useBookingDetail(resolvedParams.id);

  // Guard Clause: Xử lý trường hợp không tìm thấy đơn đặt
  if (!booking) {
    return (
      <div className="flex h-full w-full flex-col bg-background text-foreground">
        <PageHeader
          title={BOOKING_TEXTS.detailHeaderTitle}
          showBack
          variant="gradient"
        />
        <div className="flex flex-1 items-center justify-center p-4 text-center text-xs text-muted-foreground font-medium">
          Không tìm thấy thông tin đơn đặt sân.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <PageHeader
        title={BOOKING_TEXTS.detailHeaderTitle}
        showBack
        variant="gradient"
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar">
        <div className="space-y-3.5 sm:mx-auto sm:max-w-[390px] w-full">
          <BookingSummaryCard booking={booking} />
          <BookingQRCard qrCodeUrl={booking.qrCodeUrl} />
          <BookingCustomerCard customer={booking.customer} />
          <BookingPaymentCard payment={booking.payment} />
        </div>
      </div>

      <BookingBottomActions
        onShare={handleShare}
        onCancel={openCancelDialog}
        onReschedule={openRescheduleDrawer}
      />
    </div>
  );
}

export default function BookingDetailPage({ params }: BookingDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-background text-xs font-bold text-muted-foreground">
          Đang tải chi tiết đơn đặt...
        </div>
      }
    >
      <BookingDetailContent params={params} />
    </Suspense>
  );
}
