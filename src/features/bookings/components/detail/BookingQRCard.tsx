"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingQRCardProps {
  qrCodeUrl: string;
}

export function BookingQRCard({ qrCodeUrl }: BookingQRCardProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-white p-1 dark:border-slate-700">
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
          <QrCode className="h-10 w-10 text-slate-400" />
        )}
      </div>

      <div className="flex flex-1 flex-col items-start gap-2">
        <p className="text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300">
          Vui lòng xuất trình mã QR này cho quản lý sân khi đến check-in.
        </p>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => alert("Đã tải mã QR về máy!")}
          className="h-8 rounded-xl bg-blue-50 px-3 text-[11px] font-bold text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400"
        >
          <Download className="mr-1.5 h-3.5 w-3.5" />
          Tải mã QR
        </Button>
      </div>
    </div>
  );
}
