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
    <section className="w-full overflow-hidden">
      <div className="flex flex-col justify-center items-center text-center my-12">
        <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
          Divisi Tax Center Gunadarma
        </h2>
        <p className="text-sm md:text-base max-w-5xl mb-12 mx-5">
          Tax Center Universitas Gunadarma memiliki beberapa divisi yang saling
          mendukung dalam menjalankan program edukasi, pelatihan, pelayanan,
          dan pengabdian di bidang perpajakan.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 max-w-6xl mx-auto justify-items-center">
          {divisionPreview.map((division) => (
            <div
              key={division.id}
              className="flex flex-col items-center text-center px-4 w-full max-w-[340px]"
            >
              <div className="bg-yellow-400 w-20 h-20 flex justify-center items-center rounded-full mb-4 drop-shadow-md">
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
              <h3 className="font-bold mb-2 text-md md:text-lg">
                {division.name}
              </h3>
              <p
                className="text-xs md:text-sm leading-relaxed mb-4 w-full max-w-[320px]"
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
            <Button
              size="lg"
              className="bg-[#2A176F] hover:bg-[#1f1254] text-white font-bold h-11 px-10 rounded-md cursor-pointer"
            >
              Lihat Semua Divisi
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
