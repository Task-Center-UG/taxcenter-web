import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import PageHeaderHero from "@/components/PageHeaderHero";

export const metadata: Metadata = {
  title: "Mitra Kerjasama",
  description: "Mitra Kerjasama",
};

type MitraCardProps = {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  imgWrapperClass?: string;
  priority?: boolean;
};

function MitraCard({
  imageSrc,
  alt,
  title,
  description,
  imgWrapperClass = "w-40 h-32 sm:w-44 sm:h-36 md:w-48 md:h-40",
}: MitraCardProps) {
  return (
    <Card className="flex flex-col md:flex-row items-center bg-white rounded-md shadow-md hover:shadow-lg overflow-hidden">
      <div className="relative flex-shrink-0 p-4 md:p-6 flex items-center justify-center">
        <div className={`relative ${imgWrapperClass}`}>
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 160px, 224px"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex-1 py-6 px-6 md:px-8 md:self-start">
        <h2 className="text-2xl font-semibold mb-4 md:mb-6">
          {title}
        </h2>
        <p className="font-medium leading-relaxed text-sm md:text-base text-justify">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default function MitraKerjasama() {
  return (
    <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none">
      <PageHeaderHero
        title="MITRA KERJASAMA"
        className="pt-0 lg:pt-0"
        innerClassName="min-h-[200px] md:min-h-[240px]"
      />

      {/* Konten */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-6 md:space-y-10 bg-white bg-opacity-50">
        <MitraCard
          imageSrc="/assets/images/mitra/djp.png"
          alt="DJP"
          title="DJP (Direktorat Jenderal Pajak)"
          description="Direktorat Jenderal Pajak adalah unsur pelaksana di lingkungan Kementerian Keuangan yang 
          bertugas menyelenggarakan perumusan dan pelaksanaan kebijakan di bidang pajak sesuai dengan ketentuan 
          peraturan perundang-undangan. Terdapat enam ruang lingkup kerja sama yang disepakati yaitu edukasi dan 
          sosialisasi perpajakan, konsultasi perpajakan di lingkungan civitas akademika Universitas Gunadarma dan 
          masyarakat, dukungan narasumber dalam kegiatan perpajakan yang dilaksanakan, Inklusi Kesadaran Pajak dalam 
          pendidikan, penelitian bersama di bidang perpajakan, kajian akademis atas peraturan perpajakan dan penelitian 
          (riset) di bidang perpajakan."
          imgWrapperClass="w-44 h-34 sm:w-52 sm:h-38 md:w-46 md:h-42 lg:w-52 lg:h-46"
          priority
        />

        <MitraCard
          imageSrc="/assets/images/mitra/pertapsi.png"
          alt="PERTAPSI"
          title="PERTAPSI"
          description="PERTAPSI (Perkumpulan Tax Center dan Akademisi Pajak Seluruh Indonesia) merupakan satu-satunya 
          organisasi profesi dibidang penyuluhan, pemberian informasi, sosialisasi, pendidikan, pelatihan dan kegiatan 
          lainnya yang berhubungan dengan perpajakan bagi mahasiswa, dosen, sivitas akademika Perguruan Tinggi dan umum. 
          PERTAPSI bersama-sama dengan Direktorat Jenderal Pajak membina seluruh Tax Center termasuk Tax Center Gunadarma 
          dalam pelaksanaan fungsi Tax Center di Perguruan Tinggi di seluruh Indonesia. PERTAPSI bertujuan untuk membantu 
          Direktorat Jenderal Pajak sebagai mitra kerja dalam melaksanakan tugas mensosialisasikan peraturan perundang-undangan 
          perpajakan bagi masyarakat luas."
          imgWrapperClass="w-40 h-32 sm:w-48 sm:h-40 md:w-46 md:h-44 lg:w-52 lg:h-46"
        />

        <MitraCard
          imageSrc="/assets/images/mitra/majalah-pajak.png"
          alt="Majalah Pajak"
          title="Majalah Pajak"
          description="Majalah Pajak merupakan sebuah media publikasi atau terbitan secara berkala yang memuat artikel–artikel 
          dari berbagai penulis terkait Pajak, Bisnis, Keuangan, dan Manajemen. Selain memuat artikel, Majalah Pajak juga 
          merupakan publikasi yang berisi berita, cerita pendek, gambar, review, ilustrasi atau fitur lainnya yang mewarnai konten 
          Majalah Pajak. Oleh karena itu, Majalah Pajak sebagai salah satu pusat informasi bacaan, sering dijadikan bahan rujukan 
          oleh para pembaca dalam mencari sesuatu hal yang diinginkannya terutama terkait Pajak. Majalah Pajak berisi berbagai macam 
          topik tulisan yang sesuai dengan tujuan dan topik dari majalah yang bersangkutan. Majalah Pajak hadir di tengah masyarakat 
          untuk memberikan pengetahuan dan pencerahan mengenai berbagai isu perpajakan, Bisnis, Keuangan, dan Manajemen terutama isu 
          internal domestik."
          imgWrapperClass="w-56 h-24 sm:w-64 sm:h-28 md:w-46 md:h-32 lg:w-52 lg:h-46"
        />

        <MitraCard
          imageSrc="/assets/images/mitra/hivefive.png"
          alt="HIVE FIVE"
          title="HIVE FIVE"
          description="Hive Five Merupakan Konsultasi Bisnis, Perpajakan dan Keuangan Badan Usaha Maupun Perorangan. Hive Five bekerjasama 
          dengan Tax Center Universitas Gunadarma dalam membantu UMKM binaan Tax Center Universitas Gunadarma dalam memperoleh legalitas 
          usahanya melalui seminar dan workshop yang diselenggarakan oleh Tax Center Universitas Gunadarma."
          imgWrapperClass="w-40 h-40 sm:w-48 sm:h-48 md:w-46 md:h-56 lg:w-52 lg:h-46"
        />

        <MitraCard
          imageSrc="/assets/images/mitra/ddtc.png"
          alt="DDTC (Danny Darussalam Tax Center)"
          title="DDTC (Danny Darussalam Tax Center)"
          description="Universitas Gunadarma menjalin kerjasama pendidikan dengan DDTC sejak tahun 2020. Kerjasama ini dilakukan selain 
          untuk menanamkan kesadaran pajak kepada masyarakat, tapi juga sebagai ajang eksistensi Universitas Gunadarma di masyarakat. 
          Kerjasama Universitas Gunadarma dengan DDTC dapat dijadikan sebagai bagian dari pengabdian masyarakat Universitas Gunadarma. 
          Kerjasama ini memiliki komitmen menjalankan kerjasama terkait pendidikan, penelitian, pengabdian masyarakat, serta peningkatan 
          kualitas Sumber Daya manusia."
          imgWrapperClass="w-52 h-28 sm:w-60 sm:h-32 md:w-46 md:h-36 lg:w-52 lg:h-46"
        />
      </div>
    </div>
  );
}
