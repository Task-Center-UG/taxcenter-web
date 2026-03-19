"use client";

import { useGetData } from "@/hooks/use-get-data";
import HeroSliderSection from "./hero-slider-section";
import PartnerSection from "./partner-section";
import CompanyProfileSection from "./company-profile-section";
import DivisionSection from "./division-section";
import AwardCarouselSection from "./award-carousel-section";
import LatestNewsSection from "./latest-news-section";
import TaxRegulationSection from "./tax-regulation-section";
import type {
  AwardResponse,
  CompanyProfileResponse,
  DivisionResponse,
  NewsResponse,
  SliderItem,
} from "./types";
import {
  fallback_slides,
  get_image_url,
  get_youtube_embed_url,
  MAX_DIVISION_PREVIEW,
} from "./utils";

export default function HomePage() {
  const { data: slidersResponse } = useGetData<SliderItem[]>({
    key: ["home-sliders"],
    url: "/sliders",
  });
  const { data: awardsResponse } = useGetData<AwardResponse>({
    key: ["home-awards"],
    url: "/awards",
    params: {
      page: 1,
      size: 9,
      sort_by: "created_at",
      order: "desc",
    },
  });
  const { data: newsResponse } = useGetData<NewsResponse>({
    key: ["home-news"],
    url: "/news",
    params: {
      page: 1,
      size: 3,
      sort_by: "created_at",
      order: "desc",
    },
  });
  const { data: companyProfile } = useGetData<CompanyProfileResponse>({
    key: ["home-company-profile"],
    url: "/company-profile",
  });
  const { data: divisionsResponse, isLoading: isLoadingDivisions } =
    useGetData<DivisionResponse>({
      key: ["home-divisions"],
      url: "/divisions",
      params: {
        page: 1,
        size: 100,
        sort_by: "name",
        order: "asc",
      },
    });

  const slides = slidersResponse?.length ? slidersResponse : fallback_slides;
  const awardsData = awardsResponse?.awards || [];
  const beritaData = newsResponse?.news || [];
  const divisions = divisionsResponse?.divisions || [];
  const divisionPreview = divisions.slice(0, MAX_DIVISION_PREVIEW);

  const companyProfileVideoUrl = companyProfile?.video_url?.trim() || "";
  const companyProfileEmbedUrl = companyProfileVideoUrl
    ? get_youtube_embed_url(companyProfileVideoUrl)
    : null;
  const companyProfileDirectVideoUrl =
    companyProfileVideoUrl && !companyProfileEmbedUrl
      ? get_image_url(companyProfileVideoUrl)
      : "";

  return (
    <>
      <HeroSliderSection slides={slides} />
      <PartnerSection />
      <CompanyProfileSection
        embedUrl={companyProfileEmbedUrl}
        directVideoUrl={companyProfileDirectVideoUrl}
      />
      <DivisionSection
        divisionPreview={divisionPreview}
        divisions={divisions}
        isLoadingDivisions={isLoadingDivisions}
      />
      <AwardCarouselSection awardsData={awardsData} />
      <LatestNewsSection beritaData={beritaData} />
      <TaxRegulationSection />
    </>
  );
}
