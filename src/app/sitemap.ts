import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/tentang-kami/profil",
  "/tentang-kami/tim-kami",
  "/tentang-kami/mitra-kerjasama",
  "/kegiatan-berita/agenda-kegiatan",
  "/kegiatan-berita/artikel-pajak",
  "/kegiatan-berita/publikasi",
  "/kegiatan-berita/seminar",
  "/program-layanan/tax-clinic",
  "/program-layanan/brevet",
  "/program-layanan/relawan-pajak",
  "/program-layanan/relawan-pajak/mbkm",
  "/program-layanan/relawan-pajak/non-mbkm",
  "/program-layanan/pengabdian-masyarakat",
  "/program-layanan/pengabdian-masyarakat/foto-produk",
  "/program-layanan/pengabdian-masyarakat/workshop-umkm",
  "/program-layanan/pengabdian-masyarakat/pendampingan-umkm",
  "/program-layanan/riset",
  "/program-layanan/riset/kerjasama-riset",
  "/program-layanan/riset/kategori-penelitian",
  "/program-layanan/riset/program-kegiatan",
  "/program-layanan/riset/program-kegiatan/fgd",
  "/program-layanan/riset/program-kegiatan/seminar",
  "/program-layanan/riset/program-kegiatan/workshop",
  "/edukasi-pajak/materi-pajak",
  "/edukasi-pajak/bincang-sore",
  "/edukasi-pajak/video-pembelajaran",
  "/galeri/foto-kegiatan",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
