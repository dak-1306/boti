import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 text-destructive border-destructive/20 [a]:hover:bg-destructive/20",
        outline: "border-border text-foreground bg-transparent [a]:hover:bg-muted",
        ghost: "text-muted-foreground hover:bg-muted",
        // Trạng thái Đặt lịch / Đơn hàng
        success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        warning: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
        cancelled: "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
        // Môn thể thao (Sports Category Variants)
        pickleball: "border-blue-500/30 bg-blue-500/15 text-blue-700 dark:text-blue-400",
        badminton: "border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
        tennis: "border-orange-500/30 bg-orange-500/15 text-orange-700 dark:text-orange-400",
        football: "border-teal-500/30 bg-teal-500/15 text-teal-700 dark:text-teal-400",
        basketball: "border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-400",
        volleyball: "border-purple-500/30 bg-purple-500/15 text-purple-700 dark:text-purple-400",
        // Tin tức & Ưu đãi (News Category Variants)
        promotion: "border-rose-500/30 bg-rose-500/15 text-rose-700 dark:text-rose-400",
        tournament: "border-indigo-500/30 bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
        tips: "border-sky-500/30 bg-sky-500/15 text-sky-700 dark:text-sky-400",
        system: "border-violet-500/30 bg-violet-500/15 text-violet-700 dark:text-violet-400",
      },
      size: {
        sm: "h-5 px-2 text-[10px]",
        default: "h-6 px-2.5 text-xs",
        md: "h-7 px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  });
}

export { Badge, badgeVariants, type BadgeVariant };