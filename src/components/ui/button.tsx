import * as React from "react"
import '../../styles/custom_fonts.css';
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        colabPrimary: "bg-[#ffd22f] rounded-[10px] shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.20)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.14)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20)] text-center text-[#28363f] text-xl font-medium font-['Montserrat'] leading-7 hover:bg-[#f57c00]/25 disabled:bg-[#FFF2CA] active:bg-[#f57c00]/50",
        
        colabSecondary: "bg-[#0264d4] rounded-[10px] shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.20)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.14)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20)] text-white text-xl font-semibold font-['Montserrat'] leading-7 hover:bg-[#0255B4] disabled:bg-[#AABFCC] active:bg-[#01415A]",
        
        colabDelete: "bg-white rounded-[7.06px] shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.20)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.14)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20)] gap-[5.65px] text-button-delete font-semibold font-['Montserrat'] leading-7",
        
        colabAdd: "bg-[#28363f] rounded-[7.06px] shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.20)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.14)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20) gap-[5.65px] text-button-add font-semibold font-['Montserrat'] leading-7",
      },

      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        colabPrimary: "h-12 pl-4 pr-5",
        colabSecondary: "h-12 pl-4 pr-5 py-2.5",
        colabDelete: "w-[63px] h-[21px] pl-[11.29px] pr-[14.12px] py-[7.06px]",
        colabAdd: "w-[63px] h-[21px] pl-[11.29px] pr-[14.12px] py-[7.06px]",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
