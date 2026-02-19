"use client"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#6F45B8] text-white hover:bg-[#8454DE]",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-[#D2C1EE] bg-transparent hover:bg-[#D2C1EE]/20 text-[#4B2E7B]",
        ghost: "hover:bg-[#D2C1EE]/20 text-[#4B2E7B]",
        secondary: "bg-[#D2C1EE] text-[#2D1640] hover:bg-[#D2C1EE]/80",
        mint: "bg-[#72E6AD] text-[#2D1640] hover:bg-[#72E6AD]/80",
        link: "text-[#6F45B8] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
