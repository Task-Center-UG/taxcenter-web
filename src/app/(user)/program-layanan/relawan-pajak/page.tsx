import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import PageHeaderHero from "@/components/PageHeaderHero";

export const metadata: Metadata = {
  title: "Relawan Pajak",
  description: "Relawan Pajak",
};

export default function RelawanPajak() {
  return (
    <>
      {/* Header Section */}
      <PageHeaderHero
        title="RELAWAN PAJAK"
        subtitle="Program relawan pajak yang melibatkan mahasiswa untuk memberikan asistensi perpajakan kepada masyarakat."
      />

      {/* Kegiatan Relpak */}
      <section className="w-full bg-[#2A176F]">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="text-white flex flex-col items-center justify-center text-center md:items-start md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 md:mb-6">
              KEGIATAN RELAWAN PAJAK
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-white/90 max-w-xl mb-5 md:mb-7 text-center md:text-justify">
              Kegiatan Relawan Pajak adalah program yang melibatkan mahasiswa
              untuk membantu masyarakat dalam pelaporan SPT Tahunan. Program ini
              bertujuan untuk meningkatkan kesadaran perpajakan di kalangan
              masyarakat dan memberikan pengalaman langsung kepada mahasiswa
              tentang sistem administrasi perpajakan.
            </p>

            <div className="flex flex-wrap gap-3 text-center">
              <Link
                href="/program-layanan/relawan-pajak/mbkm"
                className="inline-flex items-center justify-center rounded-md bg-[#FF8A00] hover:bg-[#E67A00] text-white text-xs md:text-sm font-semibold px-4 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF8A00]"
              >
                Daftar Relawan Pajak <br /> MBKM
              </Link>
              <Link
                href="/program-layanan/relawan-pajak/non-mbkm"
                className="inline-flex items-center justify-center rounded-md bg-[#FF8A00] hover:bg-[#E67A00] text-white text-xs md:text-sm font-semibold px-4 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF8A00]"
              >
                Daftar Relawan Pajak <br /> Non-MBKM
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl bg-white/95 mx-auto sm:max-w-sm md:max-w-md aspect-[4/4] lg:-right-9">
              <Image
                src="/images/relawan-hero.jpg"
                alt="Relawan Pajak"
                fill
                className="object-cover rounded-2xl"
                priority
                sizes="(min-width: 768px) 420px, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Asistensi SPT  */}
      <section className="w-full bg-[#F5FAFF]">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
          <div className="mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 text-center md:text-left">
              Asistensi SPT
            </h3>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed mx-auto md:mx-0 text-center md:text-left mb-10">
              Kegiatan Asistensi SPT Tahunan berupaya untuk memberikan pemahaman
              yang memadai mengenai materi Pajak tentang pengisian SPT Tahunan
              kepada Wajib Pajak yang memiliki kewajiban melaporkannya.
            </p>
          </div>

          {/* Grid gambar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative w-full max-w-[420px] md:max-w-none mx-auto rounded-2xl bg-[#D9D9D9] border border-slate-200 aspect-square"
              >
                <Image
                  src={`/images/asistensi-${i}.jpg`}
                  alt={`Dokumentasi Asistensi SPT ${i}`}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fungsi Kehumasan */}
      <section className="w-full">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
          <div className="mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 text-center md:text-left">
              Fungsi Kehumasan
            </h3>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed mx-auto md:mx-0 text-center md:text-left mb-10">
              Kegiatan Fungsi Kehumasan memberikan pemahaman mengenai Kehumasan
              dan branding instansi Direktorat Jenderal Pajak kepada masyarakat
              luas yang dapat terimplementasi oleh Relawan Pajak sebagai agen
              kehumasan dengan melakukan kegiatan kehumasan secara langsung dan
              tidak langsung (online).
            </p>
          </div>

          {/* Grid gambar */}
          <div className="space-y-5 md:space-y-6">
            <div className="relative w-full max-w-[560px] md:max-w-none mx-auto rounded-2xl bg-[#D9D9D9] border border-slate-200 aspect-[16/9] md:aspect-[21/6]">
              <Image
                src="/images/kehumasan-hero.jpg"
                alt="Fungsi Kehumasan 1"
                fill
                className="object-cover rounded-2xl"
                priority
                sizes="(min-width: 768px) 100vw, 100vw"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="relative w-full max-w-[420px] md:max-w-none mx-auto rounded-2xl bg-[#D9D9D9] border border-slate-200 aspect-[16/9]"
                >
                  <Image
                    src={`/images/kehumasan-${i}.jpg`}
                    alt={`Fungsi Kehumasan ${i}`}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Activities  */}
      <section className="w-full bg-[#F5FAFF]">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
          <div className="mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 text-center md:text-left">
              SUPPORTING ACTIVITIES
            </h3>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed mx-auto md:mx-0 text-center md:text-left mb-10">
              Kegiatan Supporting Activities bertujuan membantu Wajib Pajak
              dalam memberikan pengetahuan perpajakan yang diperlukan atau
              kegiatan lain yang dilakukan selain kegiatan diatas yang
              berhubungan dengan kegiatan memberikan edukasi kepada masyarakat
              luas.
            </p>
          </div>

          {/* Grid gambar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative w-full max-w-[420px] md:max-w-none mx-auto rounded-2xl bg-[#D9D9D9] border border-slate-200 aspect-square"
              >
                <Image
                  src={`/images/asistensi-${i}.jpg`}
                  alt={`Supporting Activities ${i}`}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Development Services */}
      <section className="w-full">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
          <div className="mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 text-center md:text-left">
              Business Development Services (BDS)
            </h3>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed mx-auto md:mx-0 text-center md:text-left mb-10">
              Kegiatan Asistensi Business Development Services bertujuan
              memberikan pemahaman konseptual dan pengalaman praktek mengenai
              aspek bisnis Usaha Mikro, Kecil, dan Menengah (UMKM) kepada pelaku
              usaha binaan DJP, Tax Center maupun Pelaku Usaha lainnya yang
              memerlukan bantuan untuk pengembangan usahanya.
            </p>
          </div>

          {/* Grid gambar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative w-full max-w-[420px] md:max-w-none mx-auto rounded-2xl bg-[#D9D9D9] border border-slate-200 aspect-[4/4]"
              >
                <Image
                  src={`/images/asistensi-${i}.jpg`}
                  alt={`Business Development Services ${i}`}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
