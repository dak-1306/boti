"use client";

import { useState } from "react";
import { useUserProfileQuery, useUpdateProfileMutation } from "./useUserQuery";
import { UserProfile } from "../types/profile.types";

export function useProfile() {
  const { data: user, isLoading } = useUserProfileQuery();
  const updateProfileMutation = useUpdateProfileMutation();

  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleConfirmLogout = () => {
    setIsLogoutDialogOpen(false);
  };

  const handleUpdateProfile = async (data: Partial<UserProfile>) => {
    try {
      await updateProfileMutation.mutateAsync(data);
      setIsEditDrawerOpen(false);
    } catch {
      // Error được xử lý qua Toast hoặc UI feedback
    }
  };

  const handleChangeAvatar = async (avatarUrl: string) => {
    try {
      await updateProfileMutation.mutateAsync({ avatarUrl });
    } catch {
      // Handle error
    }
  };

  return {
    user: user || null,
    isLoading: isLoading || updateProfileMutation.isPending,
    isEditDrawerOpen,
    openEditDrawer: () => setIsEditDrawerOpen(true),
    closeEditDrawer: () => setIsEditDrawerOpen(false),
    isLogoutDialogOpen,
    openLogoutDialog: () => setIsLogoutDialogOpen(true),
    closeLogoutDialog: () => setIsLogoutDialogOpen(false),
    handleConfirmLogout,
    handleUpdateProfile,
    handleChangeAvatar,
    notificationsEnabled,
    handleToggleNotifications: () => setNotificationsEnabled((prev) => !prev),
  };
}
