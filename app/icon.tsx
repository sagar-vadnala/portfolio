import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// "SV" monogram in the site's accent colors, matching the navbar mark.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff8a4c",
          color: "#1a0b02",
          borderRadius: 14,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1.5,
        }}
      >
        SV
      </div>
    ),
    { ...size },
  );
}
