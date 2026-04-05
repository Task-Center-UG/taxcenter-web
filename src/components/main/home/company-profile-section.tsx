interface CompanyProfileSectionProps {
  embedUrl: string | null;
  directVideoUrl: string;
}

export default function CompanyProfileSection({
  embedUrl,
  directVideoUrl,
}: CompanyProfileSectionProps) {
  return (
    <section className="section-shell w-full bg-[#F5FAFF]">
      <div className="page-shell section-stack">
        <h2 className="section-title mb-5 text-[#2A176F]">
          Company Profile
        </h2>
        <p className="section-copy mb-7 max-w-4xl">
          Tax Center Universitas Gunadarma merupakan pusat kegiatan edukasi dan
          pelayanan perpajakan yang berperan dalam meningkatkan literasi,
          kompetensi, dan kesadaran pajak di lingkungan akademik dan
          masyarakat.
        </p>
        <div className="w-full max-w-5xl">
          {embedUrl ? (
            <iframe
              title="Company Profile Tax Center Gunadarma"
              src={embedUrl}
              className="aspect-video w-full rounded-2xl border border-gray-300 bg-white shadow-sm"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : directVideoUrl ? (
            <video
              controls
              className="aspect-video w-full rounded-2xl border border-gray-300 bg-white shadow-sm object-contain"
              preload="metadata"
            >
              <source src={directVideoUrl} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-gray-300 bg-white px-6 text-sm text-gray-500 shadow-sm">
              Video company profile belum tersedia.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
