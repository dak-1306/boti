import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";
import { UserProfile } from "@/features/profile/types/profile.types";

export const userService = {
  getProfile: (): Promise<ApiResponse<UserProfile>> => {
    return apiClient.get<UserProfile>("/user/profile");
  },

  updateProfile: (
    payload: Partial<UserProfile>,
  ): Promise<ApiResponse<UserProfile>> => {
    return apiClient.put<UserProfile, Partial<UserProfile>>(
      "/user/profile",
      payload,
    );
  },
};
