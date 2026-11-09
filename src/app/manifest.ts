import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Prime Step | IT & Skill Training Institute",
    short_name: SITE.name,
    description:
      "Job-oriented IT training, Full Stack Development, Data Science, AI, and Skill Development Institute in Indore.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#008080",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/brand/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
