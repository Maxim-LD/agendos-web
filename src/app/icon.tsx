import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#007AFF",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
        }}
      >
        <div style={{ display: "flex", width: 24, height: 24 }}>
          <svg
            width="100%"
            height="100%"
            viewBox="-40 -40 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M -20,18 L 0,-22 L 20,18 L 10,18 L 0,2 L -10,18 Z" fill="white" />
            <circle cx="0" cy="12" r="6" fill="#FF7A00" />
          </svg>
        </div>
      </div>
    ),
    { ...size }
  )
}