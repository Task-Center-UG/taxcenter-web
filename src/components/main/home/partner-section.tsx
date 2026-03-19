import Image from "next/image";

export default function PartnerSection() {
  return (
    <>
      <div className="flex justify-center text-center border-t-1 border-b-3 w-full">
        <h2 className="font-bold sm:text-xl md:text-2xl lg:text-3xl text-[#FE8100] my-12">
          Tax Center Gunadarma Bersinergi Membangun Indonesia
        </h2>
      </div>

      <section className="flex flex-col justify-center items-center my-12">
        <h2 className="font-bold text-center text-2xl lg:text-3xl mb-8">
          Mitra Kerjasama Tax Center Gunadarma
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-20 px-2">
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
      </section>
    </>
  );
}
