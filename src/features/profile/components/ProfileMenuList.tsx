"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  PROFILE_MENU_GROUPS,
  PROFILE_TEXTS,
} from "../constants/profile.constants";
import { ProfileMenuItemType } from "../types/profile.types";
import { ProfileMenuItem } from "./ProfileMenuItem";

interface ProfileMenuListProps {
  onOpenEditDrawer: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  onLogout: () => void;
}

export function ProfileMenuList({
  onOpenEditDrawer,
  notificationsEnabled,
  onToggleNotifications,
  onLogout,
}: ProfileMenuListProps) {
  const router = useRouter();

  const handleAction = (item: ProfileMenuItemType) => {
    switch (item.id) {
      case "edit_profile":
        onOpenEditDrawer();
        break;
      case "tx_history":
        router.push(item.path || "/bookings");
        break;
      case "notifications":
        onToggleNotifications();
        break;
      case "support":
        alert(PROFILE_TEXTS.zaloSupportAlert);
        break;
      case "terms":
        alert(PROFILE_TEXTS.termsAlert);
        break;
      case "logout":
        onLogout();
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-4">
      {PROFILE_MENU_GROUPS.map((group, groupIdx) => (
        <div
          key={groupIdx}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs"
        >
          <div className="border-b border-border bg-muted/50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {group.groupTitle}
          </div>

          <div className="divide-y divide-border">
            {group.items.map((item) => (
              <ProfileMenuItem
                key={item.id}
                item={item}
                toggleValue={
                  item.id === "notifications" ? notificationsEnabled : undefined
                }
                onAction={handleAction}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
