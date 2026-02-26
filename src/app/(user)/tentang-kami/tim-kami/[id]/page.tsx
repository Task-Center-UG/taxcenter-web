"use client";

import { useGetData } from "@/hooks/use-get-data";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageHeaderHero from "@/components/PageHeaderHero";

const API_BASE_URL = "https://dev.api.taxcenterug.com";

interface Division {
  id: number;
  name: string;
  description: string;
  picture_url: string;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  picture_url: string;
  created_at: string;
}

interface ActivityResponse {
  activityDivisons: Activity[];
  paging: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}

interface SingleDivisionResponse {
  division: Division;
}

export default function DivisionDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: divData, isLoading: isLoadingDiv } = useGetData<any>({
    key: ["division-detail", id],
    url: `/divisions/${id}`,
  });

  const division: Division | null = divData?.division || divData || null;

  const { data: actData, isLoading: isLoadingAct } =
    useGetData<ActivityResponse>({
      key: ["division-activities", id],
      url: "/activity-divisions",
      params: {
        division_id: id,
        page: 1,
        size: 100,
        sort_by: "created_at",
        order: "desc",
      },
    });

  const activities = actData?.activityDivisons || [];

  if (isLoadingDiv) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[70px]">
        <p className="text-neutral-500">Memuat data divisi...</p>
      </div>
    );
  }

  if (!division) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-[70px] gap-4">
        <p className="text-neutral-500">Divisi tidak ditemukan.</p>
        <Link href="/structure" className="text-blue-600 underline">
          Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="relative pt-[70px] lg:pt-[120px] pb-20">
      <PageHeaderHero
        title={division.name}
        className="pt-0 lg:pt-0"
        innerClassName="min-h-[200px] md:min-h-[240px]"
        titleClassName="text-3xl md:text-4xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div
              className="text-neutral-700 leading-relaxed text-justify space-y-4"
              dangerouslySetInnerHTML={{ __html: division.description }}
            />
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 w-full">
            <div className="relative aspect-video w-full bg-gray-200 rounded-lg overflow-hidden shadow-sm">
              {division.picture_url ? (
                <Image
                  src={`${API_BASE_URL}/${division.picture_url}`}
                  alt={division.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold uppercase mb-8">KEGIATAN</h2>

          {isLoadingAct ? (
            <p className="text-neutral-500">Memuat kegiatan...</p>
          ) : activities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="relative h-56 w-full bg-gray-200">
                    {activity.picture_url ? (
                      <Image
                        src={`${API_BASE_URL}/${activity.picture_url}`}
                        alt={activity.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        No Preview
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-3 mb-4 flex-1">
                      {activity.description}
                    </p>

                    <div className="text-xs text-neutral-400 mt-auto pt-4 border-t border-gray-100">
                      {new Date(activity.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-gray-50 rounded-lg text-center border border-dashed border-gray-300">
              <p className="text-neutral-500">
                Belum ada kegiatan yang didokumentasikan untuk divisi ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
