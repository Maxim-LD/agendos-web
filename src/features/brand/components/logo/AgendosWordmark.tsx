"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AgendosWordmarkProps {
  className?: string;
  variant?: "default" | "inverse";
  href?: string;
}

export const AgendosWordmark: React.FC<AgendosWordmarkProps> = ({
  className = "",
  variant = "default",
  href,
}) => {
  const textColor = variant === "inverse" ? "text-white" : "text-[#1E1E1E]";

  const content = (
    <span className={cn("font-extrabold leading-none font-montserrat tracking-wider", textColor, className)}
    >AGENDOS</span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};