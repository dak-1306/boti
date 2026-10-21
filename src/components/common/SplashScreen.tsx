"use client";

import React from "react";
import { motion } from "framer-motion";
import { APP_CONFIG } from "@/constants/appConfig";

export function SplashScreen() {
  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-between bg-slate-950 p-8 text-white select-none overflow-hidden">
      {/* Background Gradient mờ ảo chìm phía sau */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

      {/* Khoảng trống cân bằng top */}
      <div className="h-8" />

      {/* BRAND LOGO & TYPOGRAPHY CĂN GIỮA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-4 text-center"
      >
        {/* Logo Container dạng Glassmorphism viền siêu mảnh */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Chữ B cách điệu với Gradient xanh mượt */}
          <span className="bg-gradient-to-br from-blue-400 to-sky-300 bg-clip-text text-4xl font-black text-transparent tracking-tight">
            {APP_CONFIG.name.charAt(0)}
          </span>
        </div>

        {/* Tên App & Slogan tối giản */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-widest uppercase text-slate-100">
            {APP_CONFIG.name}
          </h1>
          <p className="text-[11px] font-medium tracking-wide text-slate-400">
            SPORTS VENUE BOOKING
          </p>
        </div>
      </motion.div>

      {/* FOOTER: THANH LOADING TRAM VỀ ĐÁY (MINIMAL LOADER) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
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
