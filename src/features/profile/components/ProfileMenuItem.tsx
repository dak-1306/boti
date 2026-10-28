"use client";

import React from "react";
import {
  UserCheck,
  History,
  Bell,
  Smartphone,
  Headphones,
  FileText,
  LogOut,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProfileMenuItemType } from "../types/profile.types";

const ICON_MAP: Record<string, LucideIcon> = {
  UserCheck,
  History,
  Bell,
  Smartphone,
  Headphones,
  FileText,
  LogOut,
};

interface ProfileMenuItemProps {
  item: ProfileMenuItemType;
  toggleValue?: boolean;
  onAction: (item: ProfileMenuItemType) => void;
}

export function ProfileMenuItem({
  item,
  toggleValue = false,
  onAction,
}: ProfileMenuItemProps) {
  const IconComponent = ICON_MAP[item.iconName] || FileText;
  const isLogout = item.actionType === "logout";

  return (
    <div
      onClick={() => onAction(item)}
      className={`flex h-11 cursor-pointer items-center justify-between px-3.5 transition-colors active:bg-muted/80 ${
        isLogout ? "text-destructive" : "text-foreground"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
            isLogout
              ? "bg-destructive/10 text-destructive"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <IconComponent className="h-4 w-4" />
        </div>

        <span className="text-xs font-semibold truncate">{item.label}</span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {item.badgeText && (
          <Badge variant={item.badgeVariant || "default"} size="sm">
            {item.badgeText}
          </Badge>
        )}

        {item.actionType === "toggle" ? (
          <input
            type="checkbox"
            checked={toggleValue}
            onChange={() => {}}
            className="h-5 w-5 rounded-sm border-border accent-primary cursor-pointer"
          />
        ) : (
          !isLogout && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )
        )}
      </div>
    </div>
  );
}
