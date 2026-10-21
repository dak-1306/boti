"use client";

import React from "react";
import { Navigation, Loader2 } from "lucide-react";

interface LocationButtonProps {
  onClick: () => void;
  isLoading: boolean;
  hasLocation: boolean;
}

export function LocationButton({
  onClick,
  isLoading,
  hasLocation,
}: LocationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      title="Vị trí của tôi"
      className={`absolute bottom-32 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition active:scale-90 ${
        hasLocation
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-slate-800/90 hover:bg-slate-900"
      }`}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Navigation className="h-5 w-5 fill-current" />
      )}
    </button>
  );
}
