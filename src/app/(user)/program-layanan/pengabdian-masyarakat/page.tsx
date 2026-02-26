import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faBookOpen,
  faCamera,
  faChevronRight,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import PageHeaderHero from "@/components/PageHeaderHero";

export const metadata: Metadata = {
  title: "Pengabdian Masyarakat",
  description: "Pengabdian Masyarakat",
};

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

export default function PengabdianMasyarakat() {
  return (
    <>
      {/* Header Section */}
      <div className="overflow-hidden">
        <PageHeaderHero
          title="PENGABDIAN MASYARAKAT"
          subtitle="Program kontribusi nyata untuk membantu masyarakat melalui edukasi, pendampingan, dan pengembangan UMKM."
          innerClassName="min-h-[220px] md:min-h-[260px]"
        />
        <section className="w-full bg-[#EFF4F7] py-16 md:py-10 xl:py-18">
          <div className="mx-auto max-w-6xl px-4 md:px-6 py-9 md:py-16 grid md:grid-cols-2 gap-8 md:gap-12 items-center justify-center text-center">
            <div className="flex flex-col md:text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-900 mb-4 md:mb-6">
                <span className="text-[#F2C100]">Pengabdian</span>{" "}
                <span>Kepada Masyarakat</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-lg text-justify">
                Pengabdian kepada Masyarakat (PkM) merupakan kegiatan civitas
                akademika dalam memberikan kontribusi nyata kepada masyarakat
                melalui pemanfaatan ilmu pengetahuan, teknologi, dan
                keterampilan. Tujuannya adalah membantu memenuhi kebutuhan
                masyarakat serta menyelesaikan berbagai persoalan yang mereka
                hadapi, sehingga mendorong peningkatan kesejahteraan dan
                kemandirian masyarakat dalam jangka panjang.
              </p>
            </div>

            <div className="relative rounded-2xl bg-[#D9D9D9] h-[240px] md:h-auto md:min-h-[360px]">
              {/* 
              Jika ada aset gambar, Anda bisa ganti div ini dengan <Image fill src="/images/abdimas.jpg" className="object-cover rounded-2xl" alt="Pengabdian Masyarakat" />
              Menggunakan div abu-abu agar sesuai mockup ketika belum ada gambar.
            */}
              <div className="absolute inset-0 bg-[#D9D9D9] rounded-2xl"></div>
            </div>
          </div>
        </section>

        {/* Program ABDIMAS */}
        <section className="w-full bg-[#E5B700]">
          <div className=" flex flex-col mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16 text-center items-center justify-center">
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

        <section className="bg-[#F5FAFF] w-full py-12">
          <div className="flex flex-col justify-center items-center text-center">
            <h2 className="font-bold text-3xl md:text-4xl mb-7">
              Potensi Abdimas
            </h2>
            <p className="text-sm md:text-base max-w-5xl mx-5">
              POTENSI adalah Program Asistensi Pengembangan UMKM Universitas
              Gundarma. Bertujuan untuk menghubungkan dan membantu para pelaku
              UMKM dalam mengatasi permasalahannya dengan memberikan asistensi
              yang akan dilakukan oleh Dosen dan Mahasiswa.
            </p>
            <Link href="https://potensiug.com/" target="_blank">
              <Button
                size="lg"
                className="bg-[#2A176F] hover:opacity-30 text-white font-bold h-11 px-10 rounded-md mt-8 md:mt-12 cursor-pointer"
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
