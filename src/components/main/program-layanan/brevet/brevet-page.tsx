"use client";

import Image from "next/image";
import Link from "next/link";
import PageHeaderHero from "@/components/common/page-header-hero";

export default function BrevetPage() {
  return (
    <>
      <PageHeaderHero title="BREVET" />

      <section className="section-shell">
        <div className="page-shell-tight flex flex-col-reverse items-center gap-8 md:flex-row md:gap-10">
          <div className="md:w-3/4">
            <p className="text-sm leading-7 text-gray-700 md:text-base lg:text-lg">
              Program Brevet pada Tax Center Universitas Gunadarma merupakan
              kelas pelatihan perpajakan yang diselenggarakan untuk meningkatkan
              pemahaman dan kompetensi peserta di bidang perpajakan. Kelas ini
              dilaksanakan secara terstruktur sesuai dengan ketentuan yang
              berlaku dan mendukung pengembangan kemampuan praktis. Program
              Brevet terbuka bagi mahasiswa maupun masyarakat umum, dan peserta
              yang telah menyelesaikan seluruh rangkaian pembelajaran akan
              memperoleh sertifikat.
            </p>
            <div className="mt-6">
              <Link
                href="https://tax-center-brevet-gunadarma.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-[#2A176F] hover:opacity-90 text-white text-sm md:text-base font-semibold px-6 py-3 transition-colors"
              >
                Kunjungi Website Brevet
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:w-1/3">
            <div className="relative aspect-[3/2] w-full max-w-[350px] overflow-hidden rounded-2xl bg-white">
              <Image
                src="/assets/images/program-dan-layanan/brevet/01-brevet.jpg"
                alt="Brevet"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
