import React from "react";
import { c } from "../lib/theme";

export default function AdireUnderline({ color = c.gold, width = 180 }) {
  return (
    <svg
      width={width}
      height="14"
      viewBox="0 0 180 14"
      fill="none"
      aria-hidden="true"
      className="block"
    >
      <path
        d="M2 8C14 2 22 2 34 8C46 14 54 14 66 8C78 2 86 2 98 8C110 14 118 14 130 8C142 2 150 2 162 8C168 10.5 172 11 178 8"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
