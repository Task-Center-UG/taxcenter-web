import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[url('/assets/images/footer-bg.png')] bg-cover bg-center text-white py-8 min-h-[250px] bottom-0 w-full items-center justify-center">
      <div className="container pt-8 px-3 grid grid-cols-1 md:grid-cols-2 gap-10 xl:w-1/2 justify-center md:ml-6 xl:ml-26">
        {/* Tentang Tax Center */}
        <div className="pb-6">
          <h2 className="text-2xl font-bold mb-4">Tentang Tax Center</h2>
          <hr className="border-t-4 border-[#F1C40F] mb-5 w-5"/>
          <p className="text-sm text-gray-300 leading-relaxed">
            Tax Center adalah suatu lembaga yang ada di suatu Perguruan Tinggi
            yang berfungsi sebagai pusat pengkajian, pendidikan, pelatihan dan
            sosialisasi perpajakan di lingkungan perguruan tinggi dan masyarakat
            yang dilakukan secara mandiri.
          </p>
          <div className="flex space-x-4 mt-5">
            <Link href="https://www.facebook.com/taxcentergunadarmauniversity/" target="_blank" className="hover:text-yellow-400 transition-colors">
              <FontAwesomeIcon icon={faFacebookF} className="w-9 h-9 bg-[#212239] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-2.5 py-3 text center"/>
            </Link>
            <Link href="https://x.com/taxcenterug" target="_blank" className="hover:text-yellow-400 transition-colors">
              <FontAwesomeIcon icon={faTwitter} className="w-9 h-9 bg-[#212239] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-2.5 py-3 text center"/>
            </Link>
            <Link href="https://www.instagram.com/taxcenter.ug/" target="_blank" className="hover:text-yellow-400 transition-colors">
              <FontAwesomeIcon icon={faInstagram} className="w-9 h-9 bg-[#212239] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-2.5 py-3 text center"/>
            </Link>
          </div>
        </div>
        {/* Alamat */}
        <div className="pb-6">
          <h2 className="text-2xl font-bold mb-4">Alamat</h2>
          <hr className="border-t-4 border-[#F1C40F] mb-5 w-5" />
          <ul className="space-y-2 md:space-y-4 text-sm text-gray-300">
            <li>
                <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-[#F1C40F]"/>
                Kampus D Universitas Gunadarma Jl. Margonda Raya No 100, Kota
                Depok P: 021-7888-111-2 ext : 110
            </li>
            <li>
                <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-[#F1C40F]"/>
                Universitas Gunadarma Kampus F4 Jalan Raya Bogor No 28 16951,
                Depok Jawa Barat · (021) 39730888
            </li>
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-gray-700 mt-24 pt-6 text-center text-sm text-gray-400">
        Copyright @{new Date().getFullYear()}{" "}
        <Link href="#" className="hover:text-yellow-400 transition-colors font-bold text-white-400 underline">
          IT Team Tax Center Gunadarma
        </Link>
        . All rights reserved.
      </div>
    </footer>
  );
}