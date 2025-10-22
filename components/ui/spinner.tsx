"use client"

import React from "react"
import { cn } from "@/lib/utils"

export type SpinnerProps = {
  size?: "sm" | "md" | "lg"
  className?: string
  ariaLabel?: string
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-6 w-6 border-3",
} as const

export function Spinner({ size = "md", className, ariaLabel = "Loading" }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      className={cn("inline-flex items-center justify-center align-middle", className)}
    >
      <span
        className={cn(
          "animate-spin rounded-full border-current border-t-transparent text-current",
          sizeMap[size]
        )}
      />
      <span className="sr-only">{ariaLabel}</span>
    </span>
  )
}

export function FullPageSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Spinner size="lg" />
        <span>{label}</span>
      </div>
    </div>
  )
}
