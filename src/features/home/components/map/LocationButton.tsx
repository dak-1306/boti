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
      className={`absolute bottom-32 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full shadow-md transition active:scale-90 border border-border ${
        hasLocation
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-card text-foreground hover:bg-muted"
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
