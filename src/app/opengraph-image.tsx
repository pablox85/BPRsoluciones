import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #071014 0%, #0D1B1E 55%, #111827 100%)",
          color: "#F5F7FA",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 30, color: "#00FFC6", marginBottom: 28 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.02, fontWeight: 700, maxWidth: 920 }}>
          Webs rapidas. SEO real. Tecnologia que convierte.
        </div>
        <div style={{ marginTop: 34, fontSize: 28, color: "#A1A1AA" }}>
          Desarrollo web, automatizacion e integraciones digitales.
        </div>
      </div>
    ),
    size,
  );
}
