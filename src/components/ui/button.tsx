// File: components/ui/button.tsx
import * as React from "react";
import { cn } from "../../lib/utils";
// import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          {
            succes: "bg-primary text-white hover:bg-primary/90",
            warning: "bg-yellow-500 text-white hover:bg-yellow-400",
            danger: "bg-red-500 text-white hover:bg-red-400",
            default: "bg-blue-500 text-white hover:bg-blue-400",
            outline:
              "border border-input hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            destructive:
              "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          }[variant],
          {
            default: "h-10 px-4 py-2",
            sm: "h-9 px-3 rounded-md",
            lg: "h-11 px-8 rounded-md",
            icon: "h-10 w-10",
          }[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
