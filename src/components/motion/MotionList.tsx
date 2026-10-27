"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { staggerContainerVariants, fadeInUpVariants } from "./motion.variants";

export function MotionList({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="initial"
      animate="animate"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeInUpVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}
