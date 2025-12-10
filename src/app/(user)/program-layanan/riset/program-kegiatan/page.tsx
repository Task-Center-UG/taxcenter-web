import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program dan Kegiatan Riset",
  description: "Program dan Kegiatan Riset Tax Center",
};

type ProgramKegiatanProps = {
  id: number;
  category: string;
  items: {
    id: number;
    name: string;
    description: string;
  }[];
};

// Data dummy dalam format JSON
const programKegiatanData: ProgramKegiatanProps[] = [
  {
    id: 1,
    category: "Pelatihan / Workshop",
    items: [
      {
        id: 1,
        name: "Workshop Perpajakan untuk Startup",
        description:
          "Workshop intensif yang membahas aspek perpajakan khusus untuk startup dan perusahaan rintisan, mencakup insentif pajak dan kewajiban pelaporan.",
      },
      {
        id: 2,
        name: "Pelatihan E-Filing & E-Faktur",
        description:
          "Pelatihan praktis penggunaan sistem e-Filing dan e-Faktur untuk meningkatkan kepatuhan perpajakan secara digital.",
      },
      {
        id: 3,
        name: "Workshop Transfer Pricing",
        description:
          "Pelatihan mendalam tentang konsep dan aplikasi transfer pricing untuk perusahaan multinasional dan transaksi afiliasi.",
      },
    ],
  },
  {
    id: 2,
    category: "FGD",
    items: [
      {
        id: 4,
        name: "FGD Kebijakan Pajak Digital",
        description:
          "Diskusi kelompok terfokus membahas implementasi kebijakan perpajakan untuk ekonomi digital dan e-commerce.",
      },
      {
        id: 5,
        name: "FGD Tax Amnesty",
        description:
          "Forum diskusi mengenai program pengampunan pajak, evaluasi implementasi, dan dampaknya terhadap kepatuhan wajib pajak.",
      },
      {
        id: 6,
        name: "FGD Reformasi Perpajakan",
        description:
          "Diskusi komprehensif tentang reformasi sistem perpajakan Indonesia dan tantangan dalam implementasinya.",
      },
    ],
  },
  {
    id: 3,
    category: "Seminar",
    items: [
      {
        id: 7,
        name: "Seminar Nasional Perpajakan",
        description:
          "Seminar nasional dengan tema terkini perpajakan, menghadirkan narasumber dari DJP, akademisi, dan praktisi pajak.",
      },
      {
        id: 8,
        name: "Seminar Pajak Internasional",
        description:
          "Seminar khusus membahas perpajakan internasional, BEPS, dan perjanjian penghindaran pajak berganda (P3B).",
      },
      {
        id: 9,
        name: "Seminar Tax Planning",
        description:
          "Seminar praktis tentang perencanaan pajak yang efektif dan efisien sesuai dengan ketentuan peraturan perpajakan.",
      },
    ],
  },
];

function ProgramKegiatanCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Dummy Image - Gray Background */}
      <div className="w-full h-40 bg-gray-300"></div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function CategorySection({ category, items }: ProgramKegiatanProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ProgramKegiatanCard
            key={item.id}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProgramKegiatan() {
  return (
    <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
      {/* Header */}
      <div className="relative w-full h-[150px] md:h-[200px] bg-[#D9D9D9] flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center px-4">
          PROGRAM DAN KEGIATAN RISET
        </h1>
      </div>

      {/* Konten */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 bg-white bg-opacity-50">
        {programKegiatanData.map((category) => (
          <CategorySection
            key={category.id}
            id={category.id}
            category={category.category}
            items={category.items}
          />
        ))}
      </div>
    </div>
  );
}
