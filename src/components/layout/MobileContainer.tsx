"use client";

import React from "react";
import { ZaloHeaderMock } from "@/components/common/ZaloHeaderMock";
import { SplashOverlay } from "@/components/common/SplashOverlay";

interface MobileContainerProps {
  children: React.ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    // Trên PC: Nền bg-muted nhã nhặn xung quanh. Trên Mobile: 100% bg-background
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-background sm:bg-muted sm:p-4">
      {/* Khung thiết bị: Trên Mobile xịn là 100% view, trên PC là iPhone mockup 390px */}
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-background sm:h-[800px] sm:max-h-[calc(100dvh-2rem)] sm:max-w-[390px] sm:rounded-[40px] sm:border-[8px] sm:border-border sm:shadow-2xl">
        {/* Splash Screen hiển thị đè lên App Shell ngay từ đầu */}
        <SplashOverlay />
        {/* Notch giả lập: CHỈ hiện trên PC */}
        <div className="hidden sm:absolute sm:top-2 sm:left-1/2 sm:z-50 sm:block sm:h-4 sm:w-28 sm:-translate-x-1/2 sm:rounded-full sm:bg-border" />

        {/* Mock Zalo Header: CHỈ hiện trên PC để test */}
        <div className="hidden sm:block">
          <ZaloHeaderMock />
        </div>

        {/* Nội dung App */}
        <div className="relative flex h-full w-full flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
