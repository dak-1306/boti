"use client";

import React from "react";
import { PageHeader } from "@/components/common/page-header";
import { BottomNav } from "@/components/common/bottom-nav";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileBankCard } from "@/features/profile/components/ProfileBankCard";
import { ProfileMenuList } from "@/features/profile/components/ProfileMenuList";
import { EditProfileDrawer } from "@/features/profile/components/EditProfileDrawer";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { PROFILE_TEXTS } from "@/features/profile/constants/profile.constants";

export default function ProfilePage() {
  const {
    user,
    isEditDrawerOpen,
    openEditDrawer,
    closeEditDrawer,
    handleUpdateProfile,
    handleChangeAvatar,
    notificationsEnabled,
    handleToggleNotifications,
    handleLogout,
  } = useProfile();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <PageHeader title={PROFILE_TEXTS.pageTitle} variant="gradient" />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="h-12 w-full bg-gradient-to-r from-primary via-primary/95 to-primary/85" />

        <div className="-mt-10 px-4 pb-6">
          <div className="space-y-3.5 sm:mx-auto sm:max-w-[390px] w-full">
            <ProfileHeader
              user={user}
              onEdit={openEditDrawer}
              onChangeAvatar={handleChangeAvatar}
            />

            <ProfileBankCard bankInfo={user.bankInfo} onEdit={openEditDrawer} />

            <ProfileMenuList
              onOpenEditDrawer={openEditDrawer}
              notificationsEnabled={notificationsEnabled}
              onToggleNotifications={handleToggleNotifications}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>

      <BottomNav activeTab="profile" />

      <EditProfileDrawer
        isOpen={isEditDrawerOpen}
        onClose={closeEditDrawer}
        user={user}
        onSave={handleUpdateProfile}
      />
    </div>
  );
}
