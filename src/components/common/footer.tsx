import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[url('/assets/images/footer-bg.png')] bg-cover bg-center py-10 text-white">
      <div className="page-shell grid gap-10 pt-4 md:grid-cols-2 xl:max-w-5xl">
        <div className="pb-2">
          <h2 className="mb-4 text-2xl font-bold">Tentang Tax Center</h2>
          <hr className="mb-5 w-5 border-t-4 border-[#F1C40F]" />
          <p className="text-sm leading-7 text-gray-300 sm:text-[15px]">
            Tax Center adalah suatu lembaga yang ada di suatu Perguruan Tinggi
            yang berfungsi sebagai pusat pengkajian, pendidikan, pelatihan dan
            sosialisasi perpajakan di lingkungan perguruan tinggi dan
            masyarakat yang dilakukan secara mandiri.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="https://www.facebook.com/taxcentergunadarmauniversity/"
              target="_blank"
              className="transition-colors hover:text-yellow-400"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="h-9 w-9 rounded-full bg-[#212239] bg-opacity-50 px-2.5 py-3 text-white hover:bg-[#626262] hover:text-yellow-300"
              />
            </Link>
            <Link
              href="https://x.com/taxcenterug"
              target="_blank"
              className="transition-colors hover:text-yellow-400"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="h-9 w-9 rounded-full bg-[#212239] bg-opacity-50 px-2.5 py-3 text-white hover:bg-[#626262] hover:text-yellow-300"
              />
            </Link>
            <Link
              href="https://www.instagram.com/taxcenter.ug/"
              target="_blank"
              className="transition-colors hover:text-yellow-400"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="h-9 w-9 rounded-full bg-[#212239] bg-opacity-50 px-2.5 py-3 text-white hover:bg-[#626262] hover:text-yellow-300"
              />
            </Link>
          </div>
        </div>

        <div className="pb-2">
          <h2 className="mb-4 text-2xl font-bold">Alamat</h2>
          <hr className="mb-5 w-5 border-t-4 border-[#F1C40F]" />
          <ul className="space-y-4 text-sm leading-7 text-gray-300 sm:text-[15px]">
            <li className="flex items-start gap-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="mt-1 text-[#F1C40F]"
              />
              <span>
                Kampus D Universitas Gunadarma Jl. Margonda Raya No 100, Kota
                Depok P: 021-7888-111-2 ext : 110
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="mt-1 text-[#F1C40F]"
              />
              <span>
                Universitas Gunadarma Kampus F4 Jalan Raya Bogor No 28 16951,
                Depok Jawa Barat Â· (021) 39730888
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="page-shell mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        Copyright @{new Date().getFullYear()}{" "}
        <Link
          href="#"
          className="font-bold text-white-400 underline transition-colors hover:text-yellow-400"
        >
          IT Team Tax Center Gunadarma
        </Link>
        . All rights reserved.
      </div>
    </footer>
  );
}
