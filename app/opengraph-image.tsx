import { ImageResponse } from "next/og";

export const alt =
  "Kevin Cruz, backend-focused software engineer — systems that hold up under pressure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#050505",
        color: "#F1EDE6",
        padding: "64px 72px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          opacity: 0.22,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          border: "1px solid rgba(239,35,60,.55)",
          borderRadius: "50%",
          right: -70,
          top: 65,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 330,
          height: 330,
          border: "1px dashed rgba(241,237,230,.28)",
          borderRadius: "50%",
          right: 15,
          top: 150,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 10,
          height: 10,
          background: "#EF233C",
          borderRadius: "50%",
          right: 176,
          top: 310,
          display: "flex",
          boxShadow: "0 0 38px #EF233C",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 3, textTransform: "uppercase" }}>
          <span style={{ color: "#EF233C" }}>KC / 01</span>
          <span style={{ color: "#A7A3A0" }}>Backend-focused software engineer</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 790 }}>
          <div style={{ display: "flex", fontSize: 86, fontWeight: 700, lineHeight: 0.92, letterSpacing: -3 }}>
            Systems that hold up under pressure.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 24, color: "#A7A3A0" }}>
            Backend · systems · automation · verifiable infrastructure
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: 700, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.18)", color: "#A7A3A0", fontSize: 19 }}>
          <span>KEVIN CRUZ</span>
          <span>CHENNAI / INDIA</span>
        </div>
      </div>
    </div>,
    size,
  );
}
