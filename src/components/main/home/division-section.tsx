import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Division } from "./types";
import { get_image_url, MAX_DIVISION_PREVIEW, strip_html } from "./utils";

interface DivisionSectionProps {
  divisionPreview: Division[];
  divisions: Division[];
  isLoadingDivisions: boolean;
}

export default function DivisionSection({
  divisionPreview,
  divisions,
  isLoadingDivisions,
}: DivisionSectionProps) {
  return (
    <section className="section-shell w-full overflow-hidden">
      <div className="page-shell section-stack">
        <h2 className="section-title mb-5 text-[#2A176F]">
          Divisi Tax Center Gunadarma
        </h2>
        <p className="section-copy mb-10 max-w-4xl">
          Tax Center Universitas Gunadarma memiliki beberapa divisi yang saling
          mendukung dalam menjalankan program edukasi, pelatihan, pelayanan,
          dan pengabdian di bidang perpajakan.
        </p>
        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
          {divisionPreview.map((division) => (
            <div
              key={division.id}
              className="flex w-full max-w-[340px] flex-col items-center rounded-2xl bg-white px-5 py-6 text-center shadow-sm"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 drop-shadow-md">
                {division.icon_url ? (
                  <Image
                    src={get_image_url(division.icon_url)}
                    alt={division.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                    unoptimized
                  />
                ) : (
                  <Users className="w-7 h-7 text-black" />
                )}
              </div>
              <h3 className="mb-2 text-base font-bold md:text-lg">
                {division.name}
              </h3>
              <p
                className="mb-4 w-full max-w-[320px] text-sm leading-7 text-slate-700"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {strip_html(division.description || "-")}
              </p>
              <Link href={`/tentang-kami/tim-kami/${division.id}`}>
                <Button
                  size="sm"
                  className="bg-[#FE8100] hover:bg-[#e26100] text-white font-semibold rounded-full px-5 h-8 cursor-pointer"
                >
                  Lihat Detail
                </Button>
              </Link>
            </div>
          ))}
        </div>
        {isLoadingDivisions && (
          <p className="text-sm text-gray-500 mt-8">Memuat data divisi...</p>
        )}
        {!isLoadingDivisions && divisions.length === 0 && (
          <p className="text-sm text-gray-500 mt-8">Belum ada data divisi.</p>
        )}
        {divisions.length > MAX_DIVISION_PREVIEW && (
          <Link href="/tentang-kami/tim-kami" className="mt-10">
            <Button size="lg" className="h-11 rounded-md bg-[#2A176F] px-8 font-bold text-white hover:bg-[#1f1254] cursor-pointer">
              Lihat Semua Divisi
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
