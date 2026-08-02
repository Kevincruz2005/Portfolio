import { ImageResponse } from "next/og";

export const alt =
  "Kevin Cruz, backend-focused software engineer — thoughtful systems and reliable infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#ffd7ce",
        color: "#f6f1dd",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 54,
          left: 745,
          display: "flex",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "#fff1c8",
          boxShadow: "0 0 80px rgba(255,241,200,.55)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "265px -60px auto -60px",
          display: "flex",
          height: 255,
          background: "#319966",
          clipPath: "polygon(0 36%, 14% 14%, 29% 42%, 45% 7%, 61% 39%, 79% 12%, 100% 35%, 100% 100%, 0 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "350px -50px 0 -50px",
          display: "flex",
          background: "#137360",
          clipPath: "polygon(0 18%, 18% 35%, 34% 11%, 54% 38%, 72% 12%, 88% 29%, 100% 8%, 100% 100%, 0 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "430px 0 0",
          display: "flex",
          background: "#075458",
          clipPath: "polygon(0 5%, 22% 21%, 43% 3%, 64% 28%, 82% 7%, 100% 17%, 100% 100%, 0 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          padding: "58px 66px 48px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#075458",
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: 2.4,
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "flex", width: 36, height: 3, background: "#76cf6a" }} />
          Backend · systems · infrastructure
        </div>

        <div style={{ display: "flex", maxWidth: 810, flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#f6f1dd",
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: -4.5,
              lineHeight: 0.91,
              textShadow: "0 4px 30px rgba(4,61,64,.2)",
            }}
          >
            Thoughtful systems grow into reliable infrastructure.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            paddingTop: 18,
            justifyContent: "space-between",
            borderTop: "1px solid rgba(246,241,221,.6)",
            color: "#f6f1dd",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          <span>KEVIN CRUZ</span>
          <span>CHENNAI · INDIA</span>
        </div>
      </div>
    </div>,
    size,
  );
}
