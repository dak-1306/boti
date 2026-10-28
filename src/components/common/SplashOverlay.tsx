"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { APP_CONFIG } from "@/constants/appConfig";
import logoSvg from "@/assets/icons/logo.svg";
import { cn } from "@/lib/utils";

export function SplashOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. Sau 1.2s kích hoạt hiệu ứng mờ dần (Fade out)
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1200);

    // 2. Sau 1.5s gỡ hoàn toàn khỏi DOM để giải phóng bộ nhớ
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex flex-col items-center justify-between bg-slate-950 p-8 text-white select-none overflow-hidden touch-none transition-opacity duration-300 ease-in-out",
        isFading ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

      <div className="h-8" />

      {/* LOGO & BRAND NAME */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-2xl">
          <Image
            src={logoSvg}
            alt={APP_CONFIG.name}
            width={48}
            height={48}
            className="h-12 w-12 object-contain relative z-10"
            priority
          />
          <div className="absolute inset-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_1.8s_infinite_ease-in-out] pointer-events-none" />
        </div>

        <div className="relative overflow-hidden flex flex-col items-center gap-1.5 px-4 py-1">
          <h1 className="text-2xl font-black tracking-widest uppercase text-slate-100">
            {APP_CONFIG.name}
          </h1>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400">
            SPORTS VENUE BOOKING
          </p>
        </div>
      </div>

      {/* FOOTER: LOADING BAR */}
      <div className="relative z-10 flex flex-col items-center gap-3 pb-4">
        <div className="h-0.5 w-16 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-full rounded-full bg-blue-500 animate-[shimmer_1.2s_infinite_linear]" />
        </div>
        <span className="text-[10px] font-medium text-slate-500 tracking-wider">
          v1.0.0
        </span>
      </div>
    </div>
  );
}
