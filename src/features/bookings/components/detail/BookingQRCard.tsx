"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_TEXTS } from "../../constants/bookings.constants";

interface BookingQRCardProps {
  qrCodeUrl: string;
}

export function BookingQRCard({ qrCodeUrl }: BookingQRCardProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-xs text-card-foreground">
      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-card p-1">
        {!hasError && qrCodeUrl ? (
          <Image
            src={qrCodeUrl}
            alt="Check-in QR Code"
            fill
            className="object-contain p-1"
            onError={() => setHasError(true)}
            unoptimized
          />
        ) : (
          <QrCode className="h-10 w-10 text-muted-foreground" />
        )}
      </div>

      <div className="flex flex-1 flex-col items-start gap-2">
        <p className="text-xs font-medium leading-relaxed text-muted-foreground">
          {BOOKING_TEXTS.qrInstruction}
        </p>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => alert(BOOKING_TEXTS.alertDownloadedQR)}
          className="h-11 rounded-xl bg-muted px-3 text-xs font-bold text-primary hover:bg-muted/80"
        >
          <Download className="mr-1.5 h-4 w-4" />
          {BOOKING_TEXTS.btnDownloadQR}
        </Button>
      </div>
    </div>
  );
}
