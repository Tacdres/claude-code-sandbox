import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        draft: "border-gray-300 bg-gray-100 text-gray-700",
        sent: "border-blue-300 bg-blue-100 text-blue-700",
        accepted: "border-emerald-300 bg-emerald-100 text-emerald-700",
        rejected: "border-red-300 bg-red-100 text-red-700",
      },
    },
    defaultVariants: {
      variant: "draft",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
