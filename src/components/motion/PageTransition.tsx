"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { pageVariants } from "./motion.variants";
import { cn } from "@/lib/utils";

interface PageTransitionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({
  children,
  className,
  ...props
}: PageTransitionProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn("w-full h-full flex flex-col min-h-0", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
