"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function useSidebar() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)

  // Collapse the sidebar when the route changes (i.e., a nav item is clicked)
  useEffect(() => {
    setIsExpanded(false)
  }, [pathname])

  return {
    isExpanded,
    setIsExpanded,
  }
}
