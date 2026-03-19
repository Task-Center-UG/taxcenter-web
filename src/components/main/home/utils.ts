import type { SliderItem } from "./types";

const API_BASE_URL = "https://stag.api.taxcenterug.com";

export const MAX_DIVISION_PREVIEW = 10;

export const fallback_slides: SliderItem[] = [
  {
    title: "Tax Center Gunadarma Bersinergi Membangun Indonesia",
    description:
      "Tax Center Universitas Gunadarma merupakan suatu Lembaga yang langsung di bawah rektor yang memiliki fungsi sebagai pusat pengkajian, pendidikan, pelatihan dan sosialisasi perpajakan di lingkungan perguruan tinggi dan masyarakat yang dilakukan secara mandiri.",
    cta_url: "/",
    picture_url: "/assets/images/carousel-bg.png",
  },
];

export const chunk_array = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export const get_image_url = (url: string) => {
  if (!url) return "/assets/images/carousel-bg.png";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/assets/")) return url;
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  if (url.startsWith("uploads/")) return `${API_BASE_URL}/${url}`;
  if (url.startsWith("/")) return url;
  return `${API_BASE_URL}/${url}`;
};

export const get_youtube_embed_url = (url: string) => {
  try {
    const parsed = new URL(url.trim());
    const hostname = parsed.hostname.replace("www.", "");

    if (hostname === "youtu.be") {
      const videoId = parsed.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const videoId = parsed.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        const videoId = parsed.pathname.split("/shorts/")[1]?.split("/")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (parsed.pathname.startsWith("/embed/")) {
        const videoId = parsed.pathname.split("/embed/")[1]?.split("/")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
    }

    return null;
  } catch {
    return null;
  }
};

export const strip_html = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
