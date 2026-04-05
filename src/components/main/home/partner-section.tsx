import Image from "next/image";

export default function PartnerSection() {
  return (
    <>
      <div className="flex w-full justify-center border-t-1 border-b-3 text-center">
        <h2 className="mx-auto max-w-4xl px-4 py-8 text-lg font-bold leading-snug text-[#FE8100] sm:text-xl md:py-10 md:text-2xl lg:text-3xl">
          Tax Center Gunadarma Bersinergi Membangun Indonesia
        </h2>
      </div>

      <section className="section-shell">
        <div className="page-shell section-stack">
          <h2 className="section-title mb-8 text-center text-slate-900">
            Mitra Kerjasama Tax Center Gunadarma
          </h2>
          <div className="grid w-full max-w-4xl grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
          <Image
            src="/assets/images/mitra/djp.png"
            alt="Tax Center Gunadarma Logo"
            width={60}
            height={96}
            loading="lazy"
          />
          <Image
            src="/assets/images/mitra/pertapsi.png"
            alt="Tax Center Gunadarma Logo"
            width={95}
            height={96}
            loading="lazy"
          />
          <Image
            src="/assets/images/mitra/majalah-pajak.png"
            alt="Tax Center Gunadarma Logo"
            width={200}
            height={96}
            loading="lazy"
          />
          <Image
            src="/assets/images/mitra/hivefive.png"
            alt="Tax Center Gunadarma Logo"
            width={140}
            height={48}
            loading="lazy"
          />
          <Image
            src="/assets/images/mitra/ddtc.png"
            alt="Tax Center Gunadarma Logo"
            width={140}
            height={96}
            loading="lazy"
          />
        </div>
        </div>
      </section>
    </>
  );
}
