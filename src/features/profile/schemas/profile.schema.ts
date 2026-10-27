import { z } from "zod";
import { PROFILE_TEXTS } from "../constants/profile.constants";

const VN_PHONE_REGEX = /(0[3|5|7|8|9])+([0-9]{8})\b/;
const NUMERIC_REGEX = /^[0-9]+$/;

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, { message: PROFILE_TEXTS.valNameRequired })
    .min(2, { message: PROFILE_TEXTS.valNameMin }),
  phone: z
    .string()
    .min(1, { message: PROFILE_TEXTS.valPhoneRequired })
    .regex(VN_PHONE_REGEX, { message: PROFILE_TEXTS.valPhoneInvalid }),
  bankCode: z.string(),
  bankName: z.string(),
  accountNumber: z
    .string()
    .min(1, { message: PROFILE_TEXTS.valAccNoRequired })
    .regex(NUMERIC_REGEX, { message: PROFILE_TEXTS.valAccNoNumeric }),
  accountHolder: z
    .string()
    .min(1, { message: PROFILE_TEXTS.valAccHolderRequired })
    .transform((val) => val.toUpperCase()),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
