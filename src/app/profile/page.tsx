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
import { PullToRefresh } from "@/components/common/PullToRefresh";

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

  // SKELETON LOADING KHỚP 100% CẤU TRÚC OVERLAY HEADER
  if (isLoading || !user) {
    return (
      <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
        <div className="shrink-0">
          <PageHeader
            title={PROFILE_TEXTS.pageTitle}
            variant="gradient"
            headerClassName="pb-16"
            extensionClassName="-mt-12"
            bottomExtension={
              <div className="w-full rounded-2xl border border-border bg-card p-4 shadow-xs sm:mx-auto sm:max-w-[390px] animate-pulse">
                <div className="flex items-center gap-3.5">
                  <div className="h-16 w-16 shrink-0 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 rounded-md bg-muted" />
                    <div className="h-3 w-24 rounded-md bg-muted" />
                    <div className="h-3 w-40 rounded-md bg-muted" />
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <PullToRefresh className="flex-1 w-full px-4 pt-3 pb-20">
          <div className="w-full space-y-3.5 sm:mx-auto sm:max-w-[390px] animate-pulse">
            <div className="h-24 w-full rounded-2xl bg-muted" />
            <div className="h-64 w-full rounded-2xl bg-muted" />
          </div>
        </PullToRefresh>

        <BottomNav activeTab="profile" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <div className="shrink-0">
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
      </div>

      <PullToRefresh className="flex-1 w-full px-4 pt-3 pb-20">
        <StaggerGroup className="w-full space-y-3.5 sm:mx-auto sm:max-w-[390px]">
          <ProfileBankCard bankInfo={user.bankInfo} onEdit={openEditDrawer} />

          <ProfileMenuList
            onOpenEditDrawer={openEditDrawer}
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={handleToggleNotifications}
            onLogout={openLogoutDialog}
          />
        </StaggerGroup>
      </PullToRefresh>

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
