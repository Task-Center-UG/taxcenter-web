"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  {
    title: "TENTANG KAMI",
    subItems: [
      { title: "PROFIL", href: "/tentang-kami/profil" },
      { title: "TIM KAMI", href: "/tentang-kami/tim-kami" },
      { title: "MITRA KERJASAMA", href: "/tentang-kami/mitra-kerjasama" },
    ],
  },
  {
    title: "PROGRAM & LAYANAN",
    subItems: [
      { title: "RELAWAN PAJAK", href: "/program-layanan/relawan-pajak" },
      { title: "PENGABDIAN MASYARAKAT", href: "/program-layanan/pengabdian-masyarakat" },
      { title: "RISET", href: "/program-layanan/riset" },
      { title: "TAX CLINIC", href: "/program-layanan/tax-clinic" },
    ],
  },
  {
    title: "KEGIATAN & BERITA",
    subItems: [
      { title: "AGENDA KEGIATAN", href: "/kegiatan-berita/agenda-kegiatan" },
      { title: "ARTIKEL PAJAK", href: "/kegiatan-berita/artikel-pajak" },
      { title: "PUBLIKASI", href: "/kegiatan-berita/publikasi" },
    ],
  },
  {
    title: "EDUKASI PAJAK",
    subItems: [
      { title: "MATERI PAJAK", href: "/edukasi-pajak/materi-pajak" },
      { title: "BINCANG SORE", href: "/edukasi-pajak/bincang-sore" },
      { title: "VIDEO PEMBELAJARAN PAJAK", href: "/edukasi-pajak/video-pembelajaran-pajak" },
    ],
  },
  {
    title: "GALERI",
    subItems: [{ title: "FOTO KEGIATAN", href: "/galeri/foto-kegiatan" }],
  },
];

type MobileItemProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  subItems: { title: string; href: string }[];
};

function MobileAccordionItem({
  title,
  isOpen,
  onToggle,
  onNavigate,
  subItems,
}: MobileItemProps) {
  return (
    <div className="w-full">
      {/* Header row */}
      <button
        className="w-full flex items-center justify-between px-2 sm:px-4 py-3 text-[#2A176F] font-semibold tracking-wide hover:text-[#F1C40F] transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`section-${title}`}
      >
        <span>{title}</span>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className="h-4 w-4 transition-transform duration-300"
        />
      </button>

      <hr className="border-t border-[#E5E7EB] mx-4" />

      <div
        id={`section-${title}`}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="min-h-0 overflow-hidden py-1">
          {subItems.map((sub) => (
            <li key={sub.href}>
              <Link
                href={sub.href}
                onClick={onNavigate}
                className="block px-4 py-2 text-sm font-medium text-[#2A176F] hover:text-[#F1C40F] hover:bg-[#8D9297]/10 rounded"
              >
                {sub.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const menuRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const timeoutRefs = React.useRef<NodeJS.Timeout[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  // state untuk accordion mobile
  const [mobileOpenIndex, setMobileOpenIndex] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (!isOpen) setMobileOpenIndex(null);
  }, [isOpen]);

  // hide top info-bar saat scroll
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (title: string) => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
    setActiveMenu(title);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
    const related = e.relatedTarget as Node;
    const current = menuRefs.current.find((ref) => ref?.contains(related));
    if (!current) {
      const id = setTimeout(() => setActiveMenu(null), 200);
      timeoutRefs.current.push(id);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full flex flex-col z-50 will-change-transform transition-transform duration-300 ease-out">
      {/* Info Bar */}
      <div
        className={`w-full text-white hidden lg:flex transition-all duration-100 ease-in-out overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-16 opacity-100"
        }`}
        style={{ backgroundColor: "#FFD427" }}
      >
        <div className="py-4 w-1/3 lg:w-1/4 bg-[#FFD427] flex items-center justify-end">
          <FontAwesomeIcon icon={faClock} className="w-8 h-8 mr-2" />
          <p className="mr-4 font-light text-xs">
            <span className="font-bold">Buka:</span> Senin - Jumat 09-00 - 15.00
          </p>
        </div>
        <div className="py-4 w-3/4 bg-[#2A176F]" />
      </div>

      <div
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 40 }}
      />

      {/* Main Bar */}
      <div className="flex justify-center w-full bg-white shadow z-50">
        <div className="container flex items-center justify-between py-3 px-2 lg:px-9">
          <Link href="/">
            <Image
              src="/assets/images/navbar-logo.png"
              alt="Logo tax Center"
              width={156}
              height={48}
              priority
            />
          </Link>

          <div className="xl:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="cursor-pointer">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[400px] sm:w-[500px]">
                <nav className="mt-16 mx-3">
                  {menuItems.map((item, idx) => (
                    <MobileAccordionItem
                      key={item.title}
                      title={item.title}
                      isOpen={mobileOpenIndex === idx}
                      onToggle={() =>
                        setMobileOpenIndex(mobileOpenIndex === idx ? null : idx)
                      }
                      onNavigate={() => setIsOpen(false)}
                      subItems={item.subItems}
                    />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Navbar Dekstop */}
          <nav className="hidden xl:block relative">
            <ul className="flex space-x-[60px]">
              {menuItems.map((item, index) => {
                const open = activeMenu === item.title;
                const isOpen = activeMenu === item.title;
                return (
                <li
                  key={index}
                  ref={(el) => { menuRefs.current[index] = el }}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span
                    className={[
                      "inline-flex items-center gap-1",
                      "font-bold text-sm cursor-default",
                      "transition-colors duration-200",
                      isOpen ? "text-[#F1C40F]" : "text-[#2A176F] hover:text-[#F1C40F]",
                      "group-hover:text-[#F1C40F] group-focus-within:text-[#F1C40F]",
                    ].join(" ")}
                  >
                    <span>{item.title}</span>
                    <FontAwesomeIcon
                      icon={faChevronDown} 
                      className={[
                        "h-3.5 w-3.5 transition-transform duration-500 ease-out",
                        "transform-gpu will-change-transform",
                        isOpen ? "rotate-180" : "",
                        "group-hover:rotate-180 group-focus-within:rotate-180",
                        "motion-reduce:transition-none"
                      ].join(" ")}
                    />
                  </span>

                  {activeMenu === item.title && (
                    <ul 
                    className={[
                      "absolute -left-10 mt-5.5 w-60 bg-white border-t-3 border-t-yellow-300 shadow-lg",
                      "origin-top will-change-[opacity,transform] transition-all duration-200 ease-out",
                        open
                          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                          : "opacity-0 -translate-y-2 scale-95 pointer-events-none",
                          "border-t-4 border-t-yellow-300"
                    ].join(" ")}
                    >
                      {item.subItems.map((sub) => (
                        <li key={sub.href} className="group/item">
                          <Link
                            href={sub.href}
                            className="block pl-3 py-3 text-sm font-bold text-[#2A176F] border-b border-[#D9D9D9] hover:text-[#F1C40F] hover:bg-[#D9D9D9]/20"
                          >
                            <span className="block transition-all duration-250 transform hover:translate-x-1.5">
                              <span className="absolute left-[-10px] opacity-0 hover:opacity-100 hover:before:content-['-'] transition-opacity duration-250">
                              </span>
                              {sub.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}