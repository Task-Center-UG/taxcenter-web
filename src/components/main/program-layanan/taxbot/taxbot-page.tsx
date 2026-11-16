import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faComments, faArrowRight, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

export default function TaxbotPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Bagian Hero Section yang Menarik & Unik */}
      <main className="flex-grow pt-36 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#2A176F] via-[#3B228B] to-[#4C2FA1] text-white rounded-3xl p-8 md:p-14 shadow-2xl mb-12">
          {/* Dekorasi Background Abstrak */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 -top-10 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 border border-yellow-400/30">
              <FontAwesomeIcon icon={faRobot} className="h-4 w-4" />
              Inovasi AI Tax Center Gunadarma
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              TaxBot UG - Solusi Cerdas Pertanyaan Perpajakan Anda
            </h1>
            
            <p className="text-gray-200 text-base md:text-lg mb-8 leading-relaxed font-light">
              Bingung dengan aturan pajak? Asisten Virtual berbasis AI siap membantu menjawab konsultasi, regulasi, dan perhitungan perpajakan secara instan, akurat, dan terpercaya.
            </p>

            {/* Tombol Unik untuk Langsung Kunjungi Halaman TaxBot */}
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="https://darmatax.id/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#FFD427] text-[#2A176F] font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-yellow-300 hover:scale-[1.02] transition-all duration-300 group"
              >
                <FontAwesomeIcon icon={faComments} className="h-5 w-5" />
                <span>Kunjungi Halaman TaxBot</span>
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/10 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10">
                <FontAwesomeIcon icon={faShieldHalved} className="h-4 w-4 text-yellow-400" />
                <span>Didukung oleh Teknologi AI Gemini</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fitur Unggulan Singkat */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 text-[#2A176F] rounded-xl flex items-center justify-center font-bold text-xl mb-4">
              ⚡
            </div>
            <h3 className="font-bold text-[#2A176F] text-lg mb-2">Respon Cepat 24/7</h3>
            <p className="text-gray-600 text-sm">Dapatkan jawaban pertanyaan perpajakan kapan pun kamu butuhkan tanpa harus menunggu lama.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">
              🎯
            </div>
            <h3 className="font-bold text-[#2A176F] text-lg mb-2">Akurat & Relevan</h3>
            <p className="text-gray-600 text-sm">Dirancang khusus untuk membantu civitas akademika dan masyarakat seputar edukasi pajak.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">
              💬
            </div>
            <h3 className="font-bold text-[#2A176F] text-lg mb-2">Interaktif & Mudah</h3>
            <p className="text-gray-600 text-sm">Antarmuka obrolan interaktif yang ramah pengguna layaknya konsultasi langsung dengan ahli.</p>
          </div>
        </div>
      </main>
    </div>
  );
}