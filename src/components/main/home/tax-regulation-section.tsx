import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TaxRegulationSection() {
  return (
    <section className="section-shell w-full bg-[#F5FAFF]">
      <div className="page-shell section-stack">
        <h2 className="section-title mb-5 text-[#2A176F]">
          Peraturan Perpajakan
        </h2>
        <p className="section-copy max-w-4xl">
          Menyediakan akses informasi terkait peraturan perpajakan melalui
          website khusus yang dikembangkan sebagai referensi bagi mahasiswa dan
          masyarakat.
        </p>
        <Link href="/" target="_blank">
          <Button
            size="lg"
            className="mt-8 h-11 rounded-md bg-[#2A176F] px-8 font-bold text-white hover:opacity-80 md:mt-10 cursor-pointer"
          >
            Website Advance Search
          </Button>
        </Link>
      </div>
    </section>
  );
}
