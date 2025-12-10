import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

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
      <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
        <div className="relative w-full h-[200px] lg:h-[220px] bg-[#D9D9D9] flex flex-col items-center justify-center text-slate-900">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight">
            KATEGORI PENELITIAN
          </h1>
          <p className="text-sm md:text-base text-center mx-4 md:mx-0 max-w-3xl font-normal leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. <br /> Lorem Ipsum has been the industry&rsquo;s standard
            dummy text ever since <br /> the 1500s, when an unknown printer
            took.
          </p>
        </div>
      </div>

      {/* Kategori List */}
      <section
        aria-labelledby="kategori-penelitian"
        className="mx-auto w-full max-w-5xl px-4 md:px-6 py-12 md:py-12"
      >
        <h2 id="kategori-penelitian" className="sr-only">
          Daftar Kategori Penelitian
        </h2>

        <div className="space-y-5 md:space-y-6">
          <CategoryItem label="Kategori 1" href="/riset/kategori-1" />
          <CategoryItem
            label="Kerjasama Riset"
            href="/program-layanan/riset/kerjasama-riset"
          />
          <CategoryItem
            label="Program dan Kegiatan Riset"
            href="/program-layanan/riset/program-kegiatan"
          />
          <CategoryItem label="Kategori 4" href="/riset/kategori-4" />
        </div>
      </section>
    </main>
  );
}
