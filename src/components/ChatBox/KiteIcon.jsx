// src/components/ChatBox/KiteIcon.jsx
export default function KiteIcon({ size = 26, color = "#fff", strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: "rotate(-20deg)" }}
    >
      {/* kite diamond body */}
      <path d="M12 2L19 9L12 20L5 9L12 2Z" />
      {/* cross struts */}
      <path d="M12 2v18" />
      <path d="M5 9h14" />
      {/* tail */}
      <path d="M12 20c1 1 0 2 1 3" />
      <path d="M13 23c1-1 2 0 3-1" />
    </svg>
  );
}