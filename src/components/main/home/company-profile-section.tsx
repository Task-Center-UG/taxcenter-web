interface CompanyProfileSectionProps {
  embedUrl: string | null;
  directVideoUrl: string;
}

export default function CompanyProfileSection({
  embedUrl,
  directVideoUrl,
}: CompanyProfileSectionProps) {
  return (
    <section className="bg-[#F5FAFF] w-full h-[550px] md:h-[715px] overflow-hidden">
      <div className="flex flex-col justify-center items-center text-center mt-12">
        <h2 className="font-bold text-2xl text-[#2A176F] lg:text-3xl mb-7">
          Company Profile
        </h2>
        <p className="text-sm md:text-base max-w-5xl mb-7 mx-5">
          Tax Center Universitas Gunadarma merupakan pusat kegiatan edukasi dan
          pelayanan perpajakan yang berperan dalam meningkatkan literasi,
          kompetensi, dan kesadaran pajak di lingkungan akademik dan
          masyarakat.
        </p>
        <div className="px-5">
          {embedUrl ? (
            <iframe
              title="Company Profile Tax Center Gunadarma"
              src={embedUrl}
              className="w-2xl md:w-4xl xl:w-5xl h-60 sm:h-67 md:h-102 lg:h-107 rounded-md border border-gray-300 shadow-sm"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : directVideoUrl ? (
            <video
              controls
              className="w-2xl md:w-4xl xl:w-5xl h-60 sm:h-67 md:h-102 lg:h-107 rounded-md border border-gray-300 shadow-sm object-cover"
              preload="metadata"
            >
              <source src={directVideoUrl} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-2xl md:w-4xl xl:w-5xl h-60 sm:h-67 md:h-102 lg:h-107 rounded-md border border-gray-300 shadow-sm bg-white flex items-center justify-center text-sm text-gray-500 px-6">
              Video company profile belum tersedia.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
