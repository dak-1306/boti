import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { UserProfile } from "../types/profile.types";

export const userKeys = {
  profile: ["user", "profile"] as const,
};

export function useUserProfileQuery() {
  return useQuery({
    queryKey: userKeys.profile,
    queryFn: async () => {
      const res = await userService.getProfile();
      if (!res.success || !res.data) {
        throw new Error(res.message || "Không thể tải thông tin người dùng");
      }
      return res.data;
    },
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<UserProfile>) => {
      const res = await userService.updateProfile(payload);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Cập nhật thông tin thất bại");
      }
      return res.data;
    },
    onSuccess: (updatedUser) => {
      // Cập nhật lại cache profile ngay lập tức mà không cần refetch
      queryClient.setQueryData(userKeys.profile, updatedUser);
    },
  });
}
