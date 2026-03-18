const API_BASE_URL = "https://stag.api.taxcenterug.com";

export const resolveMediaUrl = (path?: string | null, fallback = "") => {
  if (!path) return fallback;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/uploads/")) return `${API_BASE_URL}${path}`;
  if (path.startsWith("uploads/")) return `${API_BASE_URL}/${path}`;
  if (path.startsWith("/")) return `${API_BASE_URL}${path}`;
  return `${API_BASE_URL}/${path}`;
};

