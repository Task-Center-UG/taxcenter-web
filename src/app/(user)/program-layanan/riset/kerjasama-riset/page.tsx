import React from "react";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Kerjasama Riset",
  description: "Kerjasama Riset Tax Center",
};

type KerjasamaRisetProps = {
  id: number;
  title: string;
  description: string;
};

// Data dummy dalam format JSON
const kerjasamaRisetData: KerjasamaRisetProps[] = [
  {
    id: 1,
    title: "Kerjasama Penelitian Pajak UMKM",
    description:
      "Kerjasama penelitian ini berfokus pada analisis sistem perpajakan untuk Usaha Mikro, Kecil, dan Menengah (UMKM). Penelitian ini bertujuan untuk mengidentifikasi tantangan dan peluang dalam penerapan kebijakan pajak bagi UMKM, serta memberikan rekomendasi untuk meningkatkan kepatuhan pajak di sektor UMKM. Kerjasama ini melibatkan berbagai stakeholder termasuk Direktorat Jenderal Pajak, akademisi, dan praktisi perpajakan.",
  },
  {
    id: 2,
    title: "Riset Digitalisasi Sistem Perpajakan",
    description:
      "Program riset ini mengkaji implementasi dan dampak digitalisasi dalam sistem perpajakan Indonesia. Fokus penelitian mencakup analisis efektivitas sistem e-Filing, e-Faktur, dan platform digital lainnya dalam meningkatkan efisiensi administrasi perpajakan. Riset ini juga mengevaluasi tantangan dan peluang dalam transformasi digital perpajakan untuk mendukung kemudahan layanan bagi wajib pajak.",
  },
  {
    id: 3,
    title: "Studi Kebijakan Pajak Digital",
    description:
      "Penelitian komprehensif mengenai kebijakan perpajakan terhadap ekonomi digital dan transaksi elektronik. Studi ini menganalisis regulasi perpajakan untuk e-commerce, platform digital, dan cryptocurrency, serta dampaknya terhadap penerimaan negara. Kerjasama riset ini menghasilkan rekomendasi kebijakan untuk mengoptimalkan potensi pajak dari sektor ekonomi digital yang terus berkembang.",
  },
  {
    id: 4,
    title: "Penelitian Tax Compliance Behavior",
    description:
      "Riset ini meneliti perilaku kepatuhan pajak (tax compliance behavior) di kalangan wajib pajak Indonesia. Menggunakan pendekatan multidisiplin, penelitian ini mengkaji faktor-faktor yang mempengaruhi kepatuhan pajak, termasuk aspek psikologis, sosial, dan ekonomi. Hasil penelitian akan memberikan insight untuk merancang strategi edukasi dan sosialisasi perpajakan yang lebih efektif.",
  },
  {
    id: 5,
    title: "Riset Transfer Pricing dan Perpajakan Internasional",
    description:
      "Kerjasama penelitian khusus yang mengkaji praktik transfer pricing dan perpajakan internasional pada perusahaan multinasional. Riset ini menganalisis kepatuhan terhadap regulasi transfer pricing, evaluasi metode penentuan harga wajar, dan dampaknya terhadap penerimaan pajak negara. Penelitian ini juga mengkaji implementasi BEPS (Base Erosion and Profit Shifting) di Indonesia.",
  },
];

function KerjasamaRisetCard({ title, description }: KerjasamaRisetProps) {
  return (
    <Card className="flex flex-col md:flex-row items-center bg-white rounded-md shadow-md hover:shadow-lg overflow-hidden">
      {/* Dummy Image - Gray Background */}
      <div className="relative flex-shrink-0 p-4 md:p-6 flex items-center justify-center">
        <div className="relative w-40 h-32 sm:w-44 sm:h-36 md:w-48 md:h-40 bg-gray-300 rounded"></div>
      </div>

      <div className="flex-1 py-6 px-6 md:px-8 md:self-start">
        <h2 className="text-2xl font-semibold mb-4 md:mb-6">{title}</h2>
        <p className="font-medium leading-relaxed text-sm md:text-base text-justify">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default function KerjasamaRiset() {
  return (
    <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
      {/* Header */}
      <div className="relative w-full h-[150px] md:h-[200px] bg-[#D9D9D9] flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold">KERJASAMA RISET</h1>
      </div>

      {/* Konten */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-6 md:space-y-10 bg-white bg-opacity-50">
        {kerjasamaRisetData.map((item) => (
          <KerjasamaRisetCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
