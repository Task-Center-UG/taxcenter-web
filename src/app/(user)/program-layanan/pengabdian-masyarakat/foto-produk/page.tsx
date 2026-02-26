import React from "react";
import { Metadata } from "next";
import PageHeaderHero from "@/components/PageHeaderHero";

export const metadata: Metadata = {
  title: "Foto Produk UMKM",
  description: "Foto Produk UMKM Tax Center",
};

type FotoProdukProps = {
  id: number;
  category: string;
  items: {
    id: number;
    name: string;
    description: string;
  }[];
};

// Data dummy dalam format JSON
const fotoProdukData: FotoProdukProps[] = [
  {
    id: 1,
    category: "Produk Makanan",
    items: [
      {
        id: 1,
        name: "Fotografi Kue & Pastry",
        description:
          "Sesi foto profesional untuk produk kue, pastry, dan bakery dengan teknik pencahayaan khusus untuk menampilkan tekstur dan warna produk secara menarik.",
      },
      {
        id: 2,
        name: "Fotografi Makanan Siap Saji",
        description:
          "Layanan foto untuk makanan siap saji dengan styling yang menggugah selera, cocok untuk promosi restoran dan katering UMKM.",
      },
      {
        id: 3,
        name: "Fotografi Snack & Kemasan",
        description:
          "Foto produk snack dan makanan kemasan dengan fokus pada detail kemasan dan presentasi produk yang menarik untuk marketplace.",
      },
    ],
  },
  {
    id: 2,
    category: "Produk Fashion",
    items: [
      {
        id: 4,
        name: "Fotografi Pakaian & Garmen",
        description:
          "Sesi foto pakaian dengan mannequin atau model, mencakup berbagai angle dan detail jahitan untuk mendukung penjualan online fashion UMKM.",
      },
      {
        id: 5,
        name: "Fotografi Aksesori",
        description:
          "Foto produk aksesori seperti tas, sepatu, dan perhiasan dengan background dan lighting yang menonjolkan detail dan kualitas produk.",
      },
      {
        id: 6,
        name: "Fotografi Batik & Tekstil",
        description:
          "Layanan foto khusus untuk produk batik dan tekstil tradisional dengan teknik khusus menampilkan motif dan kualitas kain.",
      },
    ],
  },
  {
    id: 3,
    category: "Produk Kerajinan",
    items: [
      {
        id: 7,
        name: "Fotografi Kerajinan Tangan",
        description:
          "Sesi foto untuk produk kerajinan tangan seperti rajutan, clay, resin, dan handmade items dengan fokus pada detail dan keunikan produk.",
      },
      {
        id: 8,
        name: "Fotografi Furniture & Dekorasi",
        description:
          "Layanan foto untuk produk furniture dan dekorasi rumah dengan setting yang menampilkan fungsi dan estetika produk.",
      },
      {
        id: 9,
        name: "Fotografi Souvenir & Gift",
        description:
          "Foto produk souvenir dan hampers dengan packaging menarik, ideal untuk promosi produk gift UMKM di berbagai platform.",
      },
    ],
  },
];

function FotoProdukCard({
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

function CategorySection({ category, items }: FotoProdukProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <FotoProdukCard
            key={item.id}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default function FotoProduk() {
  return (
    <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
      <PageHeaderHero
        title="FOTO PRODUK UMKM"
        className="pt-0 lg:pt-0"
        innerClassName="min-h-[200px] md:min-h-[240px]"
      />

      {/* Konten */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 bg-white bg-opacity-50">
        {fotoProdukData.map((category) => (
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
