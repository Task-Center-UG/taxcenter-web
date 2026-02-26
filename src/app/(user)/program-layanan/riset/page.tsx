import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import PageHeaderHero from "@/components/PageHeaderHero";

export const metadata: Metadata = {
  title: "Riset",
  description: "Riset",
};

function CategoryItem({ label, href }: { label: string; href: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-white px-5 md:px-6 py-4 md:py-5 shadow-[0_0_0_1px_rgba(0,0,0,0.01)]">
      <span className="text-[17px] md:text-lg font-medium text-slate-900">
        {label}
      </span>

      <Button
        asChild
        className="rounded-full px-6 md:px-7 h-8 md:h-9 bg-[#FE8100] hover:bg-[#E67A00] text-white font-semibold tracking-wide shadow-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF8A00]"
      >
        <Link href={href} aria-label={`Lihat ${label}`}>
          Lihat
        </Link>
      </Button>
    </div>
  );
}

export default function Riset() {
  return (
    <main className="md:min-h-screen w-full bg-[#EFF4F7]">
      {/* Header Section */}
      <PageHeaderHero
        title="RISET"
        subtitle={
          <>
            Riset Tax Center Universitas Gunadarma merupakan bagian dari
            kegiatan akademik yang melibatkan dosen dan mahasiswa dalam
            menghasilkan kajian serta analisis yang bermanfaat bagi pengembangan
            ilmu pengetahuan dan masyarakat, baik terkait perpajakan maupun
            bidang lainnya.
          </>
        }
        innerClassName="min-h-[220px] lg:min-h-[240px]"
      />

      {/* Kategori List */}
      <section
        aria-labelledby="kategori-penelitian"
        className="mx-auto w-full max-w-5xl px-4 md:px-6 py-12 md:py-12"
      >
        <h2 id="kategori-penelitian" className="sr-only">
          Daftar Kategori Penelitian
        </h2>

        <div className="space-y-5 md:space-y-6">
          <CategoryItem
            label="Kategori Penelitian"
            href="/program-layanan/riset/kategori-penelitian"
          />
          <CategoryItem
            label="Kerjasama Riset"
            href="/program-layanan/riset/kerjasama-riset"
          />
          {/* TODO: KOMENTARIN DULU */}
          {/* <CategoryItem
            label="Program dan Kegiatan Riset"
            href="/program-layanan/riset/program-kegiatan"
          /> */}
        </div>
      </section>
    </main>
  );
}
