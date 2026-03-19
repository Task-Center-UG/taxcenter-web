export interface SliderItem {
  title: string;
  picture_url: string;
  cta_url: string;
  description: string;
}

export interface AwardItem {
  id: number;
  title: string;
  picture_url: string;
}

export interface AwardResponse {
  awards: AwardItem[];
  paging: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}

export interface NewsItem {
  id: number;
  title: string;
  image_url: string;
  description: string;
  created_at: string;
}

export interface NewsResponse {
  news: NewsItem[];
  paging: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}

export interface CompanyProfileResponse {
  video_url: string;
}

export interface Division {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  picture_url: string;
}

export interface DivisionResponse {
  divisions: Division[];
  paging: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}
