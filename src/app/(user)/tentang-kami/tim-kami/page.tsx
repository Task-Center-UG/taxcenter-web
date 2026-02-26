import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import DivisionList from "@/components/Accordion/DivisionList";
import PageHeaderHero from "@/components/PageHeaderHero";

export const metadata: Metadata = {
  title: "Tim Kami",
  description: "Tim Kami",
};

type SizeKey = "xl" | "lg3";

type TeamCardProps = {
  name: string;
  role: string;
  photo: string;
  bgCapsule: string;
  size?: SizeKey;
  overrides?: Partial<{
    width: number;
    height: number;
    avatar: number;
    avatarLeftPct: number;
    textLeftPct: number;
  }>;
};

// Pengaturan posisi default
const PRESET: Record<
  SizeKey,
  {
    width: number;
    height: number;
    avatar: number;
    avatarLeftPct: number;
    textLeftPct: number;
    nameClass: string;
    roleClass: string;
  }
> = {
  xl: {
    width: 400,
    height: 140,
    avatar: 105,
    avatarLeftPct: 21, // Posisi horizontal pusat lingkaran
    textLeftPct: 38,
    nameClass: "text-[14px]",
    roleClass: "text-[12px]",
  },
  lg3: {
    width: 400,
    height: 140,
    avatar: 105,
    avatarLeftPct: 21,
    textLeftPct: 38,
    nameClass: "text-[14px]",
    roleClass: "text-[12px]",
  },
};

function TeamCard({
  name,
  role,
  photo,
  bgCapsule,
  size = "xl",
  overrides,
}: TeamCardProps) {
  const p = PRESET[size];
  const cfg = {
    width: overrides?.width ?? p.width,
    height: overrides?.height ?? p.height,
    avatar: overrides?.avatar ?? p.avatar,
    avatarLeftPct: overrides?.avatarLeftPct ?? p.avatarLeftPct,
    textLeftPct: overrides?.textLeftPct ?? p.textLeftPct,
    nameClass: p.nameClass,
    roleClass: p.roleClass,
  };
  const widthStyle = { width: `min(100%, ${cfg.width}px)` };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative" style={{ ...widthStyle, height: cfg.height }}>
        {/* Background Kapsul Ungu/Putih */}
        <Image
          src={bgCapsule}
          alt="Tim Kami"
          fill
          className="object-fill select-none pointer-events-none"
          loading="lazy"
        />

        {/* --- AREA FOTO --- */}
        <div
          className="absolute top-1/2 z-10"
          style={{
            left: `${cfg.avatarLeftPct}%`,
            transform: "translate(-50%, -50%)",
            width: cfg.avatar,
            height: cfg.avatar,
          }}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={photo}
              alt={name}
              fill
              className="object-cover"
              sizes={`${cfg.avatar}px`}
            />
          </div>
        </div>
        {/* --- AKHIR AREA FOTO --- */}

        {/* Container Teks */}
        <div
          className="absolute top-1/2 -translate-y-1/2 min-w-0 z-10 pr-3"
          style={{
            left: `${cfg.textLeftPct}%`,
            width: `calc(100% - ${cfg.textLeftPct}% - 12px)`,
          }}
        >
          <h3
            className={`${cfg.nameClass} font-semibold text-neutral-900 leading-tight truncate`}
          >
            {name}
          </h3>
          <p
            className={`${cfg.roleClass} text-neutral-600 leading-snug truncate`}
          >
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TimKami() {
  const CAPSULE = "/assets/images/tentang-kami/tim/container-tim.png";
  const HR_STYLE = { width: `min(100%, ${PRESET.xl.width}px)` };

  return (
    <div className="relative pt-[70px] lg:pt-[120px]">
      <PageHeaderHero
        title="STRUKTUR ORGANISASI"
        className="pt-0 lg:pt-0"
        innerClassName="min-h-[200px] md:min-h-[240px]"
      />

      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 md:py-16 space-y-12">
          <div className="grid place-items-center">
            <TeamCard
              name="Prof. Dr. E. S. Margianti, SE., MM."
              role="Rektor Universitas Gunadarma"
              photo="/assets/images/tentang-kami/tim/01-bu-margianti.png"
              bgCapsule={CAPSULE}
              size="xl"
            />
          </div>

          <hr
            className="border-t-2 border-[#D9D9D9] mx-auto"
            style={HR_STYLE}
          />

          <div className="grid place-items-center">
            <TeamCard
              name="Dr. Beny Susanti, SE., MM."
              role="Ketua Tax Center"
              photo="/assets/images/tentang-kami/tim/02-bu-santi.png"
              bgCapsule={CAPSULE}
              size="xl"
            />
          </div>

          <hr
            className="border-t-2 border-[#D9D9D9] mx-auto"
            style={HR_STYLE}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12 lg:gap-16 justify-items-center">
            <TeamCard
              name="Dr. Feni Andriani, S.Si, M.Si."
              role="Divisi Riset dan Pengembangan IT"
              photo="/assets/images/tentang-kami/tim/03-bu-feni.png"
              bgCapsule={CAPSULE}
              size="lg3"
            />
            <TeamCard
              name="Dr. Dewi Putrie Lestari, S.Si., M.Si."
              role="Divisi Relawan Pajak"
              photo="/assets/images/tentang-kami/tim/04-bu-dewi.png"
              bgCapsule={CAPSULE}
              size="lg3"
            />
            <TeamCard
              name="Dr. Nola Marina, S.Si, M.Si"
              role="Divisi Pengabdian Masyarakat"
              photo="/assets/images/tentang-kami/tim/05-bu-nola.png"
              bgCapsule={CAPSULE}
              size="lg3"
            />
          </div>
        </div>
      </section>
      <DivisionList />
    </div>
  );
}
