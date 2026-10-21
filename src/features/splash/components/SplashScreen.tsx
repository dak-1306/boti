import React from "react";
import { APP_CONFIG } from "@/constants/appConfig";

export function SplashScreen() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-sky-500 text-white">
      <div className="flex flex-col items-center gap-3 animate-pulse">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-md shadow-lg border border-white/30">
          <span className="text-4xl font-extrabold tracking-wider text-white">
            {APP_CONFIG.name.charAt(0)}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{APP_CONFIG.name}</h1>
        <p className="text-xs font-medium text-blue-100">
          {APP_CONFIG.description}
        </p>
      </div>
    </div>
  );
}
