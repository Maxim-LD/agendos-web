"use client"

import React from "react"
import Link from "next/link"

interface AgendosIconProps {
  progress?: number; // 0-100
  className?: string;
  variant?: "default" | "light" | "dark"; // For background context
  href?: string;
}

export const AgendosIcon: React.FC<AgendosIconProps> = ({
  progress = 85,
  className = "",
  variant = "default",
  href,
}) => {
  const strokeColor = variant === "light" ? "white" : "url(#blueGradient)";
  const pathFill = variant === "light" ? "white" : "url(#blueGradient)";
  const ringOpacity = variant === "light" ? 0.35 : 0.95;

  // Circumference of a circle with radius 32 is 2 * PI * 32 = 201.06
  const circumference = 2 * Math.PI * 32;

  const content = (
    <svg
      viewBox="-40 -40 80 80" // Adjusted viewBox to center the icon
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor: '#007AFF', stopOpacity: 1 }} /><stop offset="100%" style={{ stopColor: '#0055CC', stopOpacity: 1 }} /></linearGradient>
        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{ stopColor: '#FF7A00', stopOpacity: 1 }} /><stop offset="100%" style={{ stopColor: '#FF5500', stopOpacity: 1 }} /></linearGradient>
      </defs>

      {/* Progress Ring */}
      <circle cx="0" cy="0" r="32" fill="none" stroke={strokeColor} strokeWidth="5" strokeLinecap="round"
        strokeDasharray={`${(progress / 100) * circumference} ${circumference}`}
        transform="rotate(-90 0 0)" opacity={ringOpacity} style={{ transition: 'stroke-dasharray 0.3s ease-out' }}
      />
      {/* Abstract 'A' shape that forms an upward arrow */}
      <path d="M -20,18 L 0,-22 L 20,18 L 10,18 L 0,2 L -10,18 Z" fill={pathFill} />
      {/* Focus Dot */}
      <circle cx="0" cy="12" r="6" fill="#FF7A00" />
    </svg>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};