"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AgendosWordmark } from "./AgendosWordmark"
import { AgendosIcon } from "./AgendosIcon"

interface AgendosLogoProps {
  progress?: number; // 0-100 for the ring
  className?: string;
  variant?: "default" | "light" | "dark"; // For background context
    href?: string
}

export const AgendosLogo: React.FC<AgendosLogoProps> = ({
    progress = 85,
    className = "",
    variant = "default",
    href
}) => {
  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      <AgendosIcon progress={progress} variant={variant === "dark" ? "light" : "default"} className="w-[1em] h-[1em]" />
      <AgendosWordmark variant={variant === "dark" ? "inverse" : "default"} className="text-[0.8em]" />
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};