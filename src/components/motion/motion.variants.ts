import { Variants } from "framer-motion";
import {
  MOTION_DURATIONS,
  MOTION_TRANSITIONS,
} from "@/constants/motion.constants";

// Hiệu ứng khung trang
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.base,
      ease: MOTION_TRANSITIONS.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: MOTION_DURATIONS.fast },
  },
};

// Container cha kích hoạt chuỗi xuất hiện nối đuôi nhau
export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

// Hiệu ứng từng item xuất hiện (Spring Physics đầm & mượt)
export const fadeInUpVariants: Variants = {
  initial: { opacity: 0, y: 14, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 28,
    },
  },
};

// Alias hỗ trợ tương thích ngược
export const staggerItemVariants = fadeInUpVariants;

// Hiệu ứng Phóng to nhẹ
export const scaleInVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOTION_DURATIONS.base,
      ease: MOTION_TRANSITIONS.easeOutExpo,
    },
  },
};
