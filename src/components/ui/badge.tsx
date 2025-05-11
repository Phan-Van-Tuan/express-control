import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "info"
    | "disable"
    | "warring";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          default: "bg-green-200 text-green-600",
          destructive: "bg-red-200 text-red-600",
          outline: "border-border text-foreground",
          info: "bg-blue-200 text-blue-600",
          disable: "bg-gray-200 text-gray-600",
          warring: "bg-yellow-200 text-yellow-600",
        }[variant],
        className
      )}
      {...props}
    />
  );
}
