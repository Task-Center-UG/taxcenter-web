import React from "react";
import { Metadata } from "next";
import PublikasiExplorer from "@/components/Publikasi/PublikasiExplorer";
import PageHeaderHero from "@/components/PageHeaderHero";

export const metadata: Metadata = {
  title: "Publikasi",
  description: "Publikasi",
};

export default function Publikasi() {
  return (
    <>
      <div className="relative max-w-full overflow-hidden select-none">
        <PageHeaderHero
          title="PUBLIKASI"
          subtitle={
            <>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. <br /> Lorem Ipsum has been the industry&rsquo;s standard
              dummy text ever since <br /> the 1500s, when an unknown printer
              took.
            </>
          }
          innerClassName="min-h-[220px] lg:min-h-[240px]"
        />

        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-0 py-8 md:py-10">
          <PublikasiExplorer />
        </div>
      </div>
    </>
  );
}
