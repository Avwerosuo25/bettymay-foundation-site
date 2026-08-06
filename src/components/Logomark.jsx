import React from "react";
import { LOGO_SRC } from "../lib/theme";

// Actual uploaded logo, rendered at whatever size is requested
export default function Logomark({ size = 40 }) {
  return (
    <img
      src={LOGO_SRC}
      alt="The BettyMay Foundation logo"
      style={{ height: size, width: "auto", display: "block" }}
    />
  );
}
