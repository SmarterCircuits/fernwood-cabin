import { ImageResponse } from "next/og";

// Generator used to produce public/og-image.png. To regenerate: copy this file
// to src/app/opengraph-image.tsx, run `npm run build`, copy out/opengraph-image
// to public/og-image.png, then delete src/app/opengraph-image.tsx again (static
// export writes it without a file extension, which some hosts serve incorrectly).
export const dynamic = "force-static";
export const alt = "Fernwood Cabin A: a 12×16 off-grid cabin in northern Michigan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1a1e1c",
          color: "#ece8df",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 3, color: "#a9c3ae", textTransform: "uppercase" }}>
          Fernwood · Oscoda County, Michigan
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, fontWeight: 700, color: "#ffffff", letterSpacing: -2 }}>Building Fernwood Cabin A</div>
          <div style={{ fontSize: 40, marginTop: 12, color: "#d7dbd5" }}>A 12×16 off-grid cabin on 10 acres of northern Michigan woodland</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#b7bdb6" }}>
          <span>DIY construction · Solar · Building science · Smart home</span>
          <span style={{ color: "#e07b3c" }}>Smarter Circuits</span>
        </div>
      </div>
    ),
    size,
  );
}
