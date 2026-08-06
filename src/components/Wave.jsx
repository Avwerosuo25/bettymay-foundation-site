import React from "react";

export default function Wave({ fill, flip = false, className = "" }) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      style={{
        width: "100%",
        height: "60px",
        display: "block",
        transform: flip ? "scaleY(-1)" : "none",
      }}
    >
      <path
        d="M0,32 C160,80 320,0 480,24 C640,48 800,88 960,64 C1120,40 1280,0 1440,32 L1440,90 L0,90 Z"
        fill={fill}
      />
    </svg>
  );
}
