import { useEffect } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/stores/useUserStore";
import { UserProfile } from "../types/profile.types";
import { PROFILE_TEXTS } from "../constants/profile.constants";
import { useState } from "react";

export function useProfile() {
  const { user, isLoading, fetchProfile, updateProfile } = useUserStore();

  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Tự động load profile từ Store (Store sẽ gọi Service -> API/MockDB)
  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  const handleUpdateProfile = async (updatedData: Partial<UserProfile>) => {
    const success = await updateProfile(updatedData);
    if (success) {
      setIsEditDrawerOpen(false);
      toast.success(PROFILE_TEXTS.updateSuccessToast);
    } else {
      toast.error("Cập nhật thông tin thất bại!");
    }
  };

  const handleChangeAvatar = async (newAvatarUrl: string) => {
    if (newAvatarUrl) {
      const success = await updateProfile({ avatarUrl: newAvatarUrl });
      if (success) {
        toast.success(PROFILE_TEXTS.changeAvatarSuccess);
      }
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
    isLoading,
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
