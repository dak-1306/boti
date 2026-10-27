import { HttpMethod, ApiResponse } from "@/types/api.types";
import { createSuccessResponse } from "../api-response";
import { mockDb } from "../mock-db";
import { UserProfile } from "@/features/profile/types/profile.types";

export async function handleUserRequest<T, P = Record<string, unknown>>(
  method: HttpMethod,
  endpoint: string,
  payload?: P,
): Promise<ApiResponse<T>> {
  const user = mockDb.get<UserProfile>("USER");

  if (method === "GET") {
    return createSuccessResponse(user as unknown as T);
  }

  if (method === "PUT" && payload) {
    const p = payload as unknown as Partial<UserProfile>;
    const updatedUser: UserProfile = {
      ...user,
      ...p,
      bankInfo: p.bankInfo
        ? { ...user.bankInfo, ...p.bankInfo }
        : user.bankInfo,
    };
    mockDb.set("USER", updatedUser);
    return createSuccessResponse(updatedUser as unknown as T);
  }

  return createSuccessResponse(user as unknown as T);
}
