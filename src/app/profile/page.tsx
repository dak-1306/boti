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
        <div className="space-y-3.5 sm:mx-auto sm:max-w-[390px] w-full">
          <ProfileBankCard bankInfo={user.bankInfo} onEdit={openEditDrawer} />

          <ProfileMenuList
            onOpenEditDrawer={openEditDrawer}
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={handleToggleNotifications}
            onLogout={handleLogout}
          />
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
