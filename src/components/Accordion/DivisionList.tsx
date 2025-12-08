"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useGetData } from "@/hooks/use-get-data";

interface Division {
  id: number;
  name: string;
  description: string;
  picture_url: string;
}

interface DivisionResponse {
  divisions: Division[];
  paging: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}

interface Assistant {
  id: number;
  name: string;
  picture_url: string;
  Major: {
    name: string;
  };
}

interface AssistantResponse {
  divisionAssistants: Assistant[];
  paging: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}

const API_BASE_URL = "https://dev.api.taxcenterug.com";

const DivisionMembers = ({ divisionId }: { divisionId: number }) => {
  const { data, isLoading } = useGetData<AssistantResponse>({
    key: ["division-assistants", String(divisionId)],
    url: "/division-assistants",
    params: {
      division_id: divisionId,
      page: 1,
      size: 4,
      sort_by: "name",
      order: "asc",
    },
  });

  const members = data?.divisionAssistants || [];

  if (isLoading) {
    return (
      <div className="py-8 text-center text-sm text-neutral-500">
        Memuat anggota...
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-4">
        <p className="text-center text-sm text-neutral-500">
          Belum ada anggota di divisi ini.
        </p>
        <Link
          href={`/tentang-kami/tim-kami/${divisionId}`}
          className="px-6 py-2.5 bg-[#2E2365] text-white text-sm font-semibold rounded-lg hover:bg-[#241b50] transition-colors"
        >
          Lihat Divisi
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-8 px-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {members.map((member) => (
          <div
            key={member.id}
            className="relative aspect-[3/4] w-full overflow-hidden bg-gray-200 group"
          >
            {member.picture_url ? (
              <img
                src={`${API_BASE_URL}/${member.picture_url}`}
                alt={member.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-500">
                No Photo
              </div>
            )}

            <div className="absolute bottom-0 left-0 w-full bg-neutral-500/90 p-3 text-white">
              <h3 className="text-sm md:text-base font-bold uppercase truncate">
                {member.name}
              </h3>
              <p className="text-xs md:text-sm font-light uppercase opacity-90 truncate">
                {member.Major?.name || "-"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href={`/tentang-kami/tim-kami/${divisionId}`}
        className="px-10 py-3 bg-[#2E2365] text-white text-sm font-semibold rounded-lg hover:bg-[#201848] transition-colors shadow-sm"
      >
        Lihat Divisi
      </Link>
    </div>
  );
};

type DivisionListProps = {
  maxWidth?: number;
};

export default function DivisionList({ maxWidth = 1024 }: DivisionListProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const { data, isLoading } = useGetData<DivisionResponse>({
    key: ["divisions-list"],
    url: "/divisions",
    params: {
      page: 1,
      size: 100,
      sort_by: "name",
      order: "asc",
    },
  });

  const divisions = data?.divisions || [];

  const handleToggle = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section>
      <div
        className="mx-auto w-full px-6 sm:px-8 py-10 md:py-12"
        style={{ maxWidth }}
      >
        <h2 className="text-center mb-7 text-2xl md:text-3xl font-bold">
          Anggota Divisi
        </h2>

        {isLoading && (
          <div className="text-center py-10 text-neutral-500">
            Memuat data divisi...
          </div>
        )}

        <ul className="divide-y divide-[#D9D9D9]">
          {divisions.map((division, i) => {
            const isOpen = openIdx === i;

            return (
              <li key={division.id}>
                <button
                  type="button"
                  onClick={() => handleToggle(i)}
                  className="w-full flex items-center justify-between py-4 md:py-5 hover:bg-black/5 rounded transition-colors cursor-pointer px-2"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-medium text-neutral-900">
                    {division.name}
                  </span>
                  <FontAwesomeIcon
                    icon={isOpen ? faChevronDown : faChevronRight}
                    className="h-4 w-4 text-neutral-800"
                  />
                </button>

                {isOpen && (
                  <div className="pb-8 animate-in fade-in zoom-in duration-300">
                    <DivisionMembers divisionId={division.id} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {!isLoading && divisions.length === 0 && (
          <p className="text-center text-neutral-500 mt-4">
            Belum ada data divisi.
          </p>
        )}
      </div>
    </section>
  );
}
