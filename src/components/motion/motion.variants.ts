import { Variants } from "framer-motion";
import {
  MOTION_DURATIONS,
  MOTION_TRANSITIONS,
} from "@/constants/motion.constants";

// Container cha: Điều phối nhịp sóng trượt nối đuôi nhau
export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: MOTION_DURATIONS.staggerInterval,
      delayChildren: 0.01,
    },
  },
};

// Item con: Trượt gợn sóng từ dưới lên 20px (Chỉ dùng opacity + y)
export const staggerItemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.waveItem,
      ease: MOTION_TRANSITIONS.easeWave,
    },
  },
};
