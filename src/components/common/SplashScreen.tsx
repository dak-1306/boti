"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { APP_CONFIG } from "@/constants/appConfig";
import logoSvg from "@/assets/icons/logo.svg";

export function SplashScreen() {
  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-between bg-slate-950 p-8 text-white select-none overflow-hidden touch-none">
      {/* Background Glow mờ ảo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

      {/* Top Spacer */}
      <div className="h-8" />

      {/* LOGO & BRAND NAME */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-5 text-center"
      >
        {/* Container Icon Glassmorphism */}
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-2xl">
          <Image
            src={logoSvg}
            alt={APP_CONFIG.name}
            width={48}
            height={48}
            className="h-12 w-12 object-contain relative z-10"
            priority
          />

          {/* Vệt ánh kim chạy trên Icon (Chỉ dùng GPU translate) */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              repeatDelay: 2,
              duration: 1.2,
              ease: "easeInOut",
            }}
            className="absolute inset-0 z-20 -skew-x-25 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
          />
        </div>

        {/* Tên App & Slogan (Render chữ nguyên bản nét căng) */}
        <div className="relative overflow-hidden flex flex-col items-center gap-1.5 px-4 py-1">
          <h1 className="text-2xl font-black tracking-widest uppercase text-slate-100">
            {APP_CONFIG.name}
          </h1>

          <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400">
            SPORTS VENUE BOOKING
          </p>

          {/* Vệt ánh kim quét nhẹ qua cụm Typography */}
          <motion.div
            initial={{ x: "-150%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              repeatDelay: 2,
              duration: 1.5,
              delay: 0.3,
              ease: "easeInOut",
            }}
            className="absolute inset-0 z-10 -skew-x-25 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
          />
        </div>
      </motion.div>

      {/* FOOTER: LOADING BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="relative z-10 flex flex-col items-center gap-3 pb-4"
      >
        <div className="h-0.5 w-16 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
            }}
            className="h-full w-full rounded-full bg-blue-500"
          />
        </div>
        <span className="text-[10px] font-medium text-slate-500 tracking-wider">
          v1.0.0
        </span>
      </motion.div>
    </div>
  );
}
