"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookingDetailHeader() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-20 flex h-16 w-full items-center justify-between bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 px-4 pt-6 text-white shadow-xs">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        aria-label="Quay lại"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <h1 className="text-sm font-extrabold tracking-wide text-white">
        Chi tiết đặt sân
      </h1>

      {/* Khoảng trống cân bằng layout */}
      <div className="w-9" />
    </div>
  );
}
