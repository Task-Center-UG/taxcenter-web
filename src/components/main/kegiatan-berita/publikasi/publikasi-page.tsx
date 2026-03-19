import React from "react";
import PublikasiExplorer from "@/components/common/publikasi/publikasi-explorer";
import PageHeaderHero from "@/components/common/page-header-hero";



export default function PublikasiPage() {
  return (
    <>
      <div className="relative max-w-full overflow-hidden select-none">
        <PageHeaderHero
          title="PUBLIKASI"
          innerClassName="min-h-[220px] lg:min-h-[240px]"
        />

        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-0 py-8 md:py-10">
          <PublikasiExplorer />
        </div>
      </div>
    </>
  );
}
