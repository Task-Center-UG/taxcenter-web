import Image from "next/image";

const partners = [
  {
    src: "/assets/images/mitra/djp.png",
    width: 60,
    height: 96,
  },
  {
    src: "/assets/images/mitra/pertapsi.png",
    width: 95,
    height: 96,
  },
  {
    src: "/assets/images/mitra/majalah-pajak.png",
    width: 200,
    height: 96,
  },
  {
    src: "/assets/images/mitra/hivefive.png",
    width: 140,
    height: 48,
  },
  {
    src: "/assets/images/mitra/ddtc.png",
    width: 140,
    height: 96,
  },
];

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
          <div className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-10 sm:gap-x-12 md:gap-x-14">
            {partners.map((partner) => (
              <div
                key={partner.src}
                className="flex min-h-24 w-[128px] items-center justify-center sm:w-[150px] md:w-[160px]"
              >
                <Image
                  src={partner.src}
                  alt="Logo mitra Tax Center Gunadarma"
                  width={partner.width}
                  height={partner.height}
                  loading="lazy"
                  className="h-auto max-h-24 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
