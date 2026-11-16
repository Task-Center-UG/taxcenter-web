"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeaderHero from "@/components/common/page-header-hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faRobot, 
  faComments, 
  faTimes 
} from "@fortawesome/free-solid-svg-icons";

export default function TaxbotPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Banner Hero Atas (Sama seperti Brevet) */}
      <PageHeaderHero title="TAXBOT UG" />

      <section className="section-shell">
        <div className="page-shell-tight flex flex-col-reverse items-center gap-8 md:flex-row md:gap-10">
          
          {/* Bagian Teks & Tombol Aksi */}
          <div className="md:w-3/4">
            <p className="text-sm leading-7 text-gray-700 md:text-base lg:text-lg">
              Program <strong className="text-[#2A176F]">TaxBot UG</strong> pada Tax Center Universitas Gunadarma merupakan asisten virtual berbasis kecerdasan buatan (AI) yang dirancang untuk membantu menjawab berbagai pertanyaan, konsultasi, regulasi, dan perhitungan perpajakan secara instan, interaktif, dan terstruktur. Layanan ini terbuka bagi mahasiswa maupun masyarakat umum yang membutuhkan informasi perpajakan dengan cepat dan akurat.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-4 items-center">
              {/* Tombol Utama Menuju Halaman/Aplikasi TaxBot */}
              <Link
                href="https://darmatax.id/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#2A176F] hover:opacity-90 text-white text-sm md:text-base font-semibold px-6 py-3 transition-colors shadow-md"
              >
                <FontAwesomeIcon icon={faComments} className="h-4 w-4 text-yellow-400" />
                <span>Kunjungi Website TaxBot</span>
              </Link>
            </div>
          </div>

          {/* Bagian Gambar Ilustrasi (Mengikuti struktur Brevet) */}
          <div className="flex justify-center md:w-1/3">
            <div className="relative aspect-[3/2] w-full max-w-[350px] overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center bg-indigo-50">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-2 bg-[#2A176F] text-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <FontAwesomeIcon icon={faRobot} className="h-8 w-8" />
                </div>
                <span className="text-xs font-bold text-[#2A176F] tracking-wider uppercase">TaxBot Assistant</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- FLOATING CHAT BUBBLE (Khusus di Halaman TaxBot) --- */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Kotak Pop-up Sesuai Permintaan Dosen */}
        {isChatOpen && (
          <div className="absolute bottom-20 right-0 w-[90vw] max-w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-300">
            
            {/* Header Popup */}
            <div className="bg-[#2A176F] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-[#2A176F] font-bold shadow-md">
                  <FontAwesomeIcon icon={faRobot} className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">TaxBot UG</h3>
                  <p className="text-xs text-gray-300">Asisten AI Perpajakan</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
              </button>
            </div>

            {/* Isi Pesan Sesuai Mockup */}
            <div className="p-6 bg-gray-50 flex-grow">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#2A176F] flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faRobot} className="h-4 w-4" />
                </div>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                  Selamat datang di <strong className="text-[#2A176F]">TaxBot UG</strong>! Silakan <strong className="text-[#2A176F]">Masuk</strong> jika sudah memiliki akun, atau <strong className="text-yellow-600">Daftar</strong> terlebih dahulu untuk berkonsultasi seputar perpajakan.
                </p>
              </div>
            </div>

            {/* Tombol Aksi (Masuk & Daftar) */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-3">
              <Link
                href="https://darmatax.id/login"
                onClick={() => setIsChatOpen(false)}
                className="flex-1 bg-[#2A176F] text-white text-center py-2.5 rounded-xl font-bold text-sm shadow hover:bg-[#3B228B] transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="https://darmatax.id/register"
                onClick={() => setIsChatOpen(false)}
                className="flex-1 bg-[#F59E0B] text-white text-center py-2.5 rounded-xl font-bold text-sm shadow hover:bg-amber-600 transition-colors"
              >
                Daftar
              </Link>
            </div>
          </div>
        )}

        {/* Tombol Ikon Bot Bulat di Pojok Kanan Bawah */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="relative group w-14 h-14 bg-gradient-to-tr from-[#2A176F] to-[#4C2FA1] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-yellow-400 cursor-pointer"
          aria-label="Buka TaxBot Chat"
        >
          <FontAwesomeIcon icon={isChatOpen ? faTimes : faComments} className="h-6 w-6 text-yellow-400 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
        </button>
      </div>
    </>
  );
}