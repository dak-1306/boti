import React from "react";
import { ZaloHeaderMock } from "@/components/common/ZaloHeaderMock";

interface MobileContainerProps {
  children: React.ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-slate-200 font-sans dark:bg-zinc-900 sm:p-4">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl dark:bg-black sm:h-[800px] sm:max-h-[calc(100vh-2rem)] sm:max-w-[390px] sm:rounded-[40px] sm:border-[8px] sm:border-slate-800">
        {/* Notch giả lập trên PC */}
        <div className="hidden sm:absolute sm:top-2 sm:left-1/2 sm:z-50 sm:h-4 sm:w-28 sm:-translate-x-1/2 sm:rounded-full sm:bg-slate-800 sm:block" />

        {/* Mock Thanh Mặc Định Zalo Mini App (Status bar + Nút Capsule) */}
        <ZaloHeaderMock />

        {/* Nội dung ứng dụng */}
        <div className="relative flex h-full w-full flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
