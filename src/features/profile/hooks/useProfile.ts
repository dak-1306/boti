import { useState } from "react";
import rawUserMock from "@/data/user.mock.json";
import { UserProfile } from "../types/profile.types";
import { PROFILE_TEXTS } from "../constants/profile.constants";

export function useProfile() {
  const [user, setUser] = useState<UserProfile>(rawUserMock as UserProfile);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleUpdateProfile = (updatedData: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
      bankInfo: updatedData.bankInfo
        ? { ...prev.bankInfo, ...updatedData.bankInfo }
        : prev.bankInfo,
    }));
    setIsEditDrawerOpen(false);
  };

  // Cập nhật nhận trực tiếp đường dẫn Blob URL hoặc Base64 từ file chọn
  const handleChangeAvatar = (newAvatarUrl: string) => {
    if (newAvatarUrl) {
      setUser((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
    }
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const handleLogout = () => {
    if (confirm(PROFILE_TEXTS.logoutConfirm)) {
      alert(PROFILE_TEXTS.logoutSuccessAlert);
    }
  };

  return {
    user,
    isEditDrawerOpen,
    openEditDrawer: () => setIsEditDrawerOpen(true),
    closeEditDrawer: () => setIsEditDrawerOpen(false),
    handleUpdateProfile,
    handleChangeAvatar,
    notificationsEnabled,
    handleToggleNotifications,
    handleLogout,
  };
}
