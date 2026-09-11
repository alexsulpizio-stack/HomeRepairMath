import { ImageResponse } from "next/og";

export const alt = "HomeRepairMath — The numbers behind smarter home repairs.";
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
          justifyContent: "center",
          padding: "72px",
          background: "#edf5ef",
          color: "#172018",
        }}
      >
        <div style={{ color: "#1f6b45", fontSize: 28, fontWeight: 800, marginBottom: 28 }}>HomeRepairMath</div>
        <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 800, maxWidth: 980, letterSpacing: -3 }}>
          The numbers behind smarter home repairs.
        </div>
        <div style={{ fontSize: 28, color: "#5e695f", marginTop: 34 }}>
          Repair vs. replace • DIY vs. hire • Project cost
        </div>
      </div>
    ),
    size,
  );
}
