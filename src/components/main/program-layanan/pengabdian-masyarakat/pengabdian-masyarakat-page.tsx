import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faBookOpen,
  faCamera,
  faChevronRight,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import PageHeaderHero from "@/components/common/page-header-hero";



function ProgramCard({
  icon,
  title,
  description,
  href,
}: {
  icon: IconDefinition;
  title: React.ReactNode;
  description: string;
  href: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm flex flex-col">
      <div className="mb-4">
        <FontAwesomeIcon
          icon={icon}
          className="text-4xl md:text-5xl text-slate-900"
        />
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-2">
        {title}
      </h3>
      <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed mb-4">
        {description}
      </p>

      <div className="mt-auto">
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-[#2A176F] hover:opacity-30 text-white text-xs md:text-[13px] font-semibold px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4F46E5]"
          aria-label={`Selengkapnya tentang ${
            typeof title === "string" ? title : "program"
          }`}
        >
          Selengkapnya
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>
    </div>
  );
}

export default function PengabdianMasyarakatPage() {
  return (
    <>
      
      <div className="overflow-hidden">
        <PageHeaderHero
          title="PENGABDIAN MASYARAKAT"
          subtitle="Program kontribusi nyata untuk membantu masyarakat melalui edukasi, pendampingan, dan pengembangan UMKM."
          innerClassName="min-h-[220px] md:min-h-[260px]"
        />
        <section className="section-shell w-full bg-[#EFF4F7]">
          <div className="page-shell-tight grid items-center justify-center gap-8 py-4 text-center md:grid-cols-2 md:gap-12">
            <div className="flex flex-col md:text-left">
              <h2 className="mb-4 text-[1.9rem] font-extrabold leading-tight text-slate-900 sm:text-[2.2rem] md:mb-6 md:text-5xl">
                <span className="text-[#F2C100]">Pengabdian</span>{" "}
                <span>Kepada Masyarakat</span>
              </h2>
              <p className="max-w-lg text-sm leading-7 text-slate-700 md:text-base">
                Pengabdian kepada Masyarakat (PkM) merupakan kegiatan civitas
                akademika dalam memberikan kontribusi nyata kepada masyarakat
                melalui pemanfaatan ilmu pengetahuan, teknologi, dan
                keterampilan. Tujuannya adalah membantu memenuhi kebutuhan
                masyarakat serta menyelesaikan berbagai persoalan yang mereka
                hadapi, sehingga mendorong peningkatan kesejahteraan dan
                kemandirian masyarakat dalam jangka panjang.
              </p>
            </div>

            <div className="relative">
              <div className="relative mx-auto aspect-[3/2] overflow-hidden rounded-2xl bg-white/95 shadow-sm sm:max-w-sm md:max-w-md">
                <Image
                  src="/assets/images/program-dan-layanan/pengabdian-masyarakat/01-pengabdian-masyarkat.png"
                  alt="Pengabdian Masyarakat"
                  fill
                  className="object-cover object-center rounded-2xl"
                  priority
                  quality={95}
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 90vw"
                />
              </div>
            </div>
          </div>
        </section>

        
        <section className="w-full bg-[#E5B700]">
          <div className="page-shell flex flex-col items-center justify-center py-2 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-8 md:mb-10">
              Program ABDIMAS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 align-center">
              <ProgramCard
                icon={faHandshake}
                title={
                  <>
                    Pendampingan <br className="hidden md:block" />
                    UMKM
                  </>
                }
                description="Bantu UMKM mengembangkan usaha"
                href="/program-layanan/pengabdian-masyarakat/pendampingan-umkm"
              />

              <ProgramCard
                icon={faBookOpen}
                title={
                  <>
                    Workshop <br className="hidden md:block" />
                    UMKM
                  </>
                }
                description="Pelatihan langsung untuk pelaku usaha"
                href="/program-layanan/pengabdian-masyarakat/workshop-umkm"
              />

              <ProgramCard
                icon={faCamera}
                title={
                  <>
                    Foto Produk <br className="hidden md:block" />
                    UMKM
                  </>
                }
                description="Foto profesional untuk branding produk"
                href="/program-layanan/pengabdian-masyarakat/foto-produk"
              />
            </div>
          </div>
        </section>

        <section className="section-shell w-full bg-[#F5FAFF]">
          <div className="page-shell section-stack">
            <h2 className="section-title mb-5">
              Potensi Abdimas
            </h2>
            <p className="section-copy max-w-4xl">
              POTENSI adalah Program Asistensi Pengembangan UMKM Universitas
              Gundarma. Bertujuan untuk menghubungkan dan membantu para pelaku
              UMKM dalam mengatasi permasalahannya dengan memberikan asistensi
              yang akan dilakukan oleh Dosen dan Mahasiswa.
            </p>
            <Link href="https://potensiug.com/" target="_blank">
              <Button
                size="lg"
                className="mt-8 h-11 rounded-md bg-[#2A176F] px-8 font-bold text-white hover:opacity-80 md:mt-10 cursor-pointer"
              >
                Website Potensi
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
