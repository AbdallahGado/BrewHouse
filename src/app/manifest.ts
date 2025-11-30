import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BrewHouse Coffee",
    short_name: "BrewHouse",
    description: "Premium Coffee Experience",
    start_url: "/",
    display: "standalone",
    background_color: "#fffbeb",
    theme_color: "#d97706",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
