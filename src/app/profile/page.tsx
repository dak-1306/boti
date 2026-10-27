"use client";

import React from "react";
import { PageHeader } from "@/components/common/page-header";
import { BottomNav } from "@/components/common/bottom-nav";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileBankCard } from "@/features/profile/components/ProfileBankCard";
import { ProfileMenuList } from "@/features/profile/components/ProfileMenuList";
import { EditProfileDrawer } from "@/features/profile/components/EditProfileDrawer";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { PROFILE_TEXTS } from "@/features/profile/constants/profile.constants";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export default function ProfilePage() {
  const {
    user,
    isLoading,
    isEditDrawerOpen,
    openEditDrawer,
    closeEditDrawer,
    isLogoutDialogOpen,
    openLogoutDialog,
    closeLogoutDialog,
    handleConfirmLogout,
    handleUpdateProfile,
    handleChangeAvatar,
    notificationsEnabled,
    handleToggleNotifications,
  } = useProfile();

  if (isLoading || !user) {
    return (
      <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
        <PageHeader title={PROFILE_TEXTS.pageTitle} variant="gradient" />
        <StaggerGroup className="flex-1 space-y-4 p-4 animate-pulse">
          <div className="h-28 w-full rounded-2xl bg-muted" />
          <div className="h-20 w-full rounded-2xl bg-muted" />
          <div className="h-40 w-full rounded-2xl bg-muted" />
        </StaggerGroup>
        <BottomNav activeTab="profile" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <PageHeader
        title={PROFILE_TEXTS.pageTitle}
        variant="gradient"
        headerClassName="pb-16"
        extensionClassName="-mt-12"
        bottomExtension={
          <ProfileHeader
            user={user}
            onEdit={openEditDrawer}
            onChangeAvatar={handleChangeAvatar}
          />
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar">
        <StaggerGroup className="w-full space-y-3.5 sm:mx-auto sm:max-w-[390px]">
          <ProfileBankCard bankInfo={user.bankInfo} onEdit={openEditDrawer} />

          <ProfileMenuList
            onOpenEditDrawer={openEditDrawer}
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={handleToggleNotifications}
            onLogout={openLogoutDialog}
          />
        </StaggerGroup>
      </div>

      <BottomNav activeTab="profile" />

      <EditProfileDrawer
        isOpen={isEditDrawerOpen}
        onClose={closeEditDrawer}
        user={user}
        onSave={handleUpdateProfile}
      />

      <ConfirmDialog
        isOpen={isLogoutDialogOpen}
        onClose={closeLogoutDialog}
        onConfirm={handleConfirmLogout}
        title={PROFILE_TEXTS.logoutDialogTitle || "Đăng xuất tài khoản"}
        description={PROFILE_TEXTS.logoutConfirm}
        confirmText="Đăng xuất"
        cancelText="Hủy"
        variant="destructive"
      />
    </div>
  );
}
