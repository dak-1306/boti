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
      {/* 1. CỐ ĐỊNH PHÍA TRÊN: PageHeader + Card chứa Avatar, Tên, SĐT */}
      <div className="shrink-0 z-10">
        <PageHeader title={PROFILE_TEXTS.pageTitle} variant="gradient" />

        <div className="relative bg-gradient-to-r from-primary via-primary/95 to-primary/85 pb-8">
          <div className="h-4 w-full" />
        </div>

        <div className="-mt-10 px-4">
          <div className="sm:mx-auto sm:max-w-[390px] w-full">
            <ProfileHeader
              user={user}
              onEdit={openEditDrawer}
              onChangeAvatar={handleChangeAvatar}
            />
          </div>
        </div>
      </div>

      {/* 2. KHU VỰC ĐƯỢC PHÉP CUỘN: Thẻ Ngân Hàng + Danh sách Menu */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-20 no-scrollbar">
        <div className="space-y-3 sm:mx-auto sm:max-w-[390px] w-full">
          <ProfileBankCard bankInfo={user.bankInfo} onEdit={openEditDrawer} />

          <ProfileMenuList
            onOpenEditDrawer={openEditDrawer}
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={handleToggleNotifications}
            onLogout={handleLogout}
          />
        </div>
      </div>

      {/* 3. THANH ĐIỀU HƯỚNG DƯỚI ĐÁY */}
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
