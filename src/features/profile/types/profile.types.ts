export interface BankInfo {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountHolder: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarUrl: string;
  isZaloVerified: boolean;
  bankInfo: BankInfo;
}

export type MenuActionType =
  | "drawer"
  | "navigate"
  | "toggle"
  | "action"
  | "logout";

export interface ProfileMenuItemType {
  id: string;
  label: string;
  iconName: string;
  badgeText?: string;
  badgeVariant?: "success" | "warning" | "destructive" | "default";
  actionType: MenuActionType;
  path?: string;
}

export interface ProfileMenuGroup {
  groupTitle: string;
  items: ProfileMenuItemType[];
}
