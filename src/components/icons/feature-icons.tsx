export function GrowthIcon({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Plant pot */}
      <path
        d="M20 48 L24 38 L40 38 L44 48 Z"
        fill="#FF7A00"
        stroke="#FF7A00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="18" y="48" width="28" height="4" rx="1" fill="#FF7A00" />

      {/* Plant leaves */}
      <path d="M32 38 L32 20" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 28 Q24 24 20 20 Q24 24 28 26" fill="#FF7A00" />
      <path d="M32 24 Q40 20 44 16 Q40 20 36 22" fill="#FF7A00" />
    </svg>
  )
}

export function TimerIcon({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Clock circle */}
      <circle cx="32" cy="36" r="20" stroke="#FF7A00" strokeWidth="3" fill="none" />

      {/* Clock hands */}
      <path d="M32 36 L32 24" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 36 L40 40" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" />

      {/* Timer top button */}
      <rect x="28" y="10" width="8" height="4" rx="2" fill="#FF7A00" />
      <path d="M32 14 L32 16" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function GoalSearchIcon({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Magnifying glass */}
      <circle cx="26" cy="26" r="14" stroke="#FF7A00" strokeWidth="3" fill="none" />
      <path d="M36 36 L48 48" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round" />

      {/* Target inside */}
      <circle cx="26" cy="26" r="8" stroke="#FF7A00" strokeWidth="2" fill="none" />
      <circle cx="26" cy="26" r="3" fill="#FF7A00" />
    </svg>
  )
}

export function FitnessIcon({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dumbbell */}
      <rect x="12" y="28" width="6" height="8" rx="2" fill="#FF7A00" />
      <rect x="46" y="28" width="6" height="8" rx="2" fill="#FF7A00" />
      <rect x="18" y="30" width="28" height="4" rx="2" fill="#FF7A00" />

      {/* Weight plates */}
      <rect x="8" y="26" width="4" height="12" rx="1" fill="#FF7A00" />
      <rect x="52" y="26" width="4" height="12" rx="1" fill="#FF7A00" />
    </svg>
  )
}

export function HeartIcon({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Heart shape */}
      <path
        d="M32 52 C32 52 12 38 12 24 C12 18 16 14 22 14 C26 14 29 16 32 20 C35 16 38 14 42 14 C48 14 52 18 52 24 C52 38 32 52 32 52 Z"
        fill="#FF7A00"
      />
    </svg>
  )
}

export function FolderSearchIcon({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Folder */}
      <path
        d="M10 20 L10 48 C10 50 11 52 13 52 L51 52 C53 52 54 50 54 48 L54 24 C54 22 53 20 51 20 L32 20 L28 16 L13 16 C11 16 10 18 10 20 Z"
        fill="#FF7A00"
      />

      {/* Magnifying glass */}
      <circle cx="32" cy="34" r="8" stroke="#0A1F3D" strokeWidth="2.5" fill="none" />
      <path d="M38 40 L44 46" stroke="#0A1F3D" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
