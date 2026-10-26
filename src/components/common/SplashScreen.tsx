"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { APP_CONFIG } from "@/constants/appConfig";
import logoSvg from "@/assets/icons/logo.svg";

export function SplashScreen() {
  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-between bg-slate-950 p-8 text-white select-none overflow-hidden">
      {/* Background Gradient mờ ảo chìm phía sau */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

      {/* Khoảng trống cân bằng top */}
      <div className="h-8" />

      {/* BRAND LOGO & TYPOGRAPHY CĂN GIỮA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-5 text-center"
      >
        {/* Logo Container Glassmorphism */}
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Logo SVG từ Assets */}
          <Image
            src={logoSvg}
            alt={APP_CONFIG.name}
            width={48}
            height={48}
            className="h-12 w-12 object-contain relative z-10"
            priority
          />

          {/* Vệt sáng mỏng tinh tế xẹt qua Icon Logo */}
          <motion.div
            initial={{ x: "-150%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              repeatDelay: 2.2,
              duration: 1.4,
              ease: "easeInOut",
            }}
            className="absolute inset-0 z-20 -skew-x-25 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          />
        </div>

        {/* Tên App & Slogan: Shimmer trực tiếp vào nét chữ (Background Clip Text) */}
        <div className="flex flex-col items-center gap-1">
          <motion.h1
            animate={{
              backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 2.2,
              duration: 2,
              ease: "easeInOut",
            }}
            className="bg-[linear-gradient(110deg,#cbd5e1,45%,#ffffff,55%,#cbd5e1)] bg-[length:200%_100%] bg-clip-text text-2xl font-black tracking-widest uppercase text-transparent"
          >
            {APP_CONFIG.name}
          </motion.h1>

          <motion.p
            animate={{
              backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 2.2,
              duration: 2,
              delay: 0.1,
              ease: "easeInOut",
            }}
            className="bg-[linear-gradient(110deg,#64748b,40%,#94a3b8,50%,#64748b)] bg-[length:200%_100%] bg-clip-text text-[11px] font-semibold tracking-widest text-transparent uppercase"
          >
            SPORTS VENUE BOOKING
          </motion.p>
        </div>
      </motion.div>

      {/* FOOTER: THANH LOADING TỐI GIẢN */}
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
