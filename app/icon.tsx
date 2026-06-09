import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            fontSize: 30,
            color: "#d946ef",
            lineHeight: 1,
            display: "flex",
          }}
        >
          ♥
        </div>
        <div
          style={{
            position: "relative",
            color: "white",
            fontSize: 13,
            fontWeight: 800,
            fontFamily: "serif",
            display: "flex",
            marginTop: 2,
          }}
        >
          H
        </div>
      </div>
    ),
    { ...size }
  );
}
