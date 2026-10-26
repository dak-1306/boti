import { useState } from "react";
import { toast } from "sonner";
import rawUserMock from "@/data/user.mock.json";
import { UserProfile } from "../types/profile.types";
import { PROFILE_TEXTS } from "../constants/profile.constants";

export function useProfile() {
  const [user, setUser] = useState<UserProfile>(rawUserMock as UserProfile);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
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
    toast.success(
      PROFILE_TEXTS.updateSuccessToast || "Cập nhật thông tin thành công!",
    );
  };

  const handleChangeAvatar = (newAvatarUrl: string) => {
    if (newAvatarUrl) {
      setUser((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
      toast.success(
        PROFILE_TEXTS.changeAvatarSuccess || "Đã đổi ảnh đại diện thành công!",
      );
    }
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled((prev) => {
      const nextState = !prev;
      toast.info(
        nextState ? "Đã bật thông báo ứng dụng" : "Đã tắt thông báo ứng dụng",
      );
      return nextState;
    });
  };

  const handleConfirmLogout = () => {
    toast.success(PROFILE_TEXTS.logoutSuccessAlert);
  };

  return {
    user,
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
    handleToggleNotifications,
  };
}
