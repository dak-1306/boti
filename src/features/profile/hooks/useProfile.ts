"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { UserProfile } from "../types/profile.types";

export function useProfile() {
  const { user, isLoading, fetchProfile, updateProfile } = useUserStore();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Trigger fetch dữ liệu người dùng từ Store khi mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleConfirmLogout = () => {
    setIsLogoutDialogOpen(false);
  };

  const handleUpdateProfile = async (data: Partial<UserProfile>) => {
    const success = await updateProfile(data);
    if (success) {
      setIsEditDrawerOpen(false);
    }
  };

  const handleChangeAvatar = async (avatarUrl: string) => {
    await updateProfile({ avatarUrl });
  };

  return {
    user,
    isLoading, // 👈 Đọc trực tiếp từ Zustand Store
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
