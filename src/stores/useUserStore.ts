import { create } from "zustand";
import { UserProfile } from "@/features/profile/types/profile.types";
import { userService } from "@/services/user.service";

interface UserState {
  user: UserProfile | null;
  isLoading: boolean;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,

  fetchProfile: async () => {
    set({ isLoading: true });
    const res = await userService.getProfile();
    if (res.success) {
      set({ user: res.data });
    }
    set({ isLoading: false });
  },

  updateProfile: async (data) => {
    set({ isLoading: true });
    const res = await userService.updateProfile(data);
    if (res.success) {
      set({ user: res.data });
    }
    set({ isLoading: false });
    return res.success;
  },
}));
