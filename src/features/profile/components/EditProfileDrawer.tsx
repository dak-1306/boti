"use client";

import React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { UserProfile } from "../types/profile.types";
import { EditProfileForm } from "./EditProfileForm";

interface EditProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSave: (updatedUser: Partial<UserProfile>) => void;
}

export function EditProfileDrawer({
  isOpen,
  onClose,
  user,
  onSave,
}: EditProfileDrawerProps) {
  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      showSwipeHandle
    >
      <DrawerContent className="sm:mx-auto sm:max-w-[390px] w-full rounded-t-[28px] border-none bg-card p-0 pt-4 shadow-2xl text-card-foreground">
        {isOpen && user && (
          <EditProfileForm
            key={`${user?.phone ?? ""}-${user?.bankInfo?.accountNumber ?? ""}`}
            user={user}
            onClose={onClose}
            onSave={onSave}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
}
