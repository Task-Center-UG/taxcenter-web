"use client";

import Image from "next/image";
import Link from "next/link";
import PageHeaderHero from "@/components/PageHeaderHero";

export default function BrevetPage() {
  return (
    <>
      <PageHeaderHero title="BREVET" />

      <section className="py-12 px-4 md:px-16 xl:px-32">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="md:w-3/4">
            <p className="text-sm md:text-base lg:text-lg text-gray-700 text-justify">
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
          <div className="md:w-1/3 flex justify-center">
            <Image
              src="/assets/images/program-dan-layanan/brevet/01-brevet.jpg"
              alt="Brevet"
              className="w-auto h-auto"
              width={350}
              height={300}
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}
