import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background:
            "radial-gradient(900px 520px at 18% 18%, rgba(243,211,74,0.45), transparent 55%), radial-gradient(900px 520px at 88% 25%, rgba(239,68,68,0.35), transparent 60%), radial-gradient(1000px 620px at 55% 120%, rgba(16,185,129,0.40), transparent 55%), linear-gradient(135deg, #0d3d2a 0%, #1a3a2a 45%, #1e1b12 100%)",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.92)",
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: 1,
            lineHeight: 1,
          }}
        >
          Top Rankin&apos; Herbs-n-Oils
        </div>
        <div
          style={{
            marginTop: 18,
            color: "rgba(255,255,255,0.82)",
            fontSize: 34,
            fontWeight: 600,
          }}
        >
          CBD with island soul
        </div>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#10b981",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#f3d34a",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#ef4444",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}

