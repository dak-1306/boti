import { z } from "zod";
import { BOOKING_CREATE_TEXTS } from "../constants/booking-create.constants";

const VN_PHONE_REGEX = /(0[3|5|7|8|9])+([0-9]{8})\b/;

export const bookingCustomerSchema = z.object({
  name: z
    .string()
    .min(1, { message: BOOKING_CREATE_TEXTS.valNameRequired })
    .min(2, { message: BOOKING_CREATE_TEXTS.valNameMin }),
  phone: z
    .string()
    .min(1, { message: BOOKING_CREATE_TEXTS.valPhoneRequired })
    .regex(VN_PHONE_REGEX, { message: BOOKING_CREATE_TEXTS.valPhoneInvalid }),
  notes: z.string().optional(),
});

export type BookingCustomerFormData = z.infer<typeof bookingCustomerSchema>;
