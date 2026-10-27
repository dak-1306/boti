"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "./motion.variants";

interface StaggerGroupProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function StaggerGroup({
  children,
  className,
  ...props
}: StaggerGroupProps) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="initial"
      animate="animate"
      className={className}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return <motion.div variants={staggerItemVariants}>{child}</motion.div>;
      })}
    </motion.div>
  );
}
