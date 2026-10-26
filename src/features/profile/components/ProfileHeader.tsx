"use client";

import React, { useRef } from "react";
import { Camera, Edit3, ShieldCheck } from "lucide-react";
import { SafeImage } from "@/components/common/safe-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "../types/profile.types";
import { PROFILE_TEXTS } from "../constants/profile.constants";

interface ProfileHeaderProps {
  user: UserProfile;
  onEdit: () => void;
  onChangeAvatar: (newAvatarUrl: string) => void;
}

export function ProfileHeader({
  user,
  onEdit,
  onChangeAvatar,
}: ProfileHeaderProps) {
  // Ref để kích hoạt input file ẩn
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Tạo URL tạm thời từ File người dùng chọn
      const imageUrl = URL.createObjectURL(file);
      onChangeAvatar(imageUrl);
    }
  };

  return (
    <div className="relative rounded-3xl bg-card p-4 text-card-foreground shadow-sm border border-border">
      {/* Input chọn ảnh ẩn dành cho thiết bị di động */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onEdit}
        className="absolute right-2 top-2 h-11 w-11 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
        title={PROFILE_TEXTS.editProfileTitle}
      >
        <Edit3 className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-3.5">
        <div className="relative h-20 w-20 shrink-0">
          <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-border bg-muted shadow-xs">
            <SafeImage
              src={user.avatarUrl}
              alt={user.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>

          <Button
            type="button"
            size="icon"
            onClick={handleCameraClick}
            className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 active:scale-90"
            title={PROFILE_TEXTS.changeAvatarTitle}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-1 min-w-0 pr-8">
          <h2 className="text-base font-extrabold tracking-tight text-foreground truncate">
            {user.name}
          </h2>

          <p className="text-xs text-muted-foreground font-medium">
            {user.phone}
          </p>

          <div className="mt-0.5 flex items-center gap-1.5">
            {user.isZaloVerified && (
              <Badge variant="sky" size="sm" className="gap-1">
                <ShieldCheck className="h-3 w-3" />
                <span>{PROFILE_TEXTS.zaloVerifiedBadge}</span>
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
