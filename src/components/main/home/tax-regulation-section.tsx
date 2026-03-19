import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TaxRegulationSection() {
  return (
    <section className="bg-[#F5FAFF] w-full py-12">
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
          Peraturan Perpajakan
        </h2>
        <p className="text-sm md:text-base max-w-5xl mx-5">
          Menyediakan akses informasi terkait peraturan perpajakan melalui
          website khusus yang dikembangkan sebagai referensi bagi mahasiswa dan
          masyarakat.
        </p>
        <Link href="/" target="_blank">
          <Button
            size="lg"
            className="bg-[#2A176F] hover:opacity-30 text-white font-bold h-11 px-10 rounded-md mt-8 md:mt-12 cursor-pointer"
          >
            Website Advance Search
          </Button>
        </Link>
      </div>
    </section>
  );
}
