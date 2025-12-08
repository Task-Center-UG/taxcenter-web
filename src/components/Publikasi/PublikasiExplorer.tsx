"use client";

import * as React from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetData } from "@/hooks/use-get-data";

type UserInfo = {
  id: number;
  username: string;
  full_name: string;
};

type PublicationItem = {
  id: number;
  title: string;
  description: string;
  year: number;
  created_at: string;
  updated_at: string;
  created_by: UserInfo;
  updated_by: UserInfo;
};

type PagingInfo = {
  page: number;
  total_pages: number;
  total_items: number;
};

type PublicationResponse = {
  publications: PublicationItem[];
  paging: PagingInfo;
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

type SortKey = "terbaru" | "terlama" | "az" | "za";

function getSortParams(sort: SortKey) {
  switch (sort) {
    case "terbaru":
      return { sort_by: "year", order: "desc" };
    case "terlama":
      return { sort_by: "year", order: "asc" };
    case "az":
      return { sort_by: "title", order: "asc" };
    case "za":
      return { sort_by: "title", order: "desc" };
    default:
      return { sort_by: "created_at", order: "desc" };
  }
}

export default function PublikasiExplorer() {
  // State UI
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [sort, setSort] = React.useState<SortKey>("terbaru");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);

  React.useEffect(() => {
    setPage(1);
  }, [debouncedQuery, sort, pageSize]);

  const apiParams = React.useMemo(() => {
    const { sort_by, order } = getSortParams(sort);
    return {
      page,
      size: pageSize,
      search: debouncedQuery || undefined,
      sort_by,
      order,
    };
  }, [page, pageSize, debouncedQuery, sort]);

  const { data, isLoading, isError } = useGetData<PublicationResponse>({
    key: ["publications", JSON.stringify(apiParams)],
    url: "/publication",
    params: apiParams,
  });

  const items = data?.publications || [];
  const paging = data?.paging || { page: 1, total_pages: 1, total_items: 0 };

  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pencarian berdasarkan judul penelitian.."
            className="h-11 rounded-lg border-slate-300 pr-12 text-[13px] md:text-sm placeholder:text-slate-500"
          />
          <Button
            aria-label="Cari"
            disabled={isLoading}
            className="absolute right-2 top-1.5 h-8 w-8 rounded-lg bg-[#FE8100] hover:bg-[#e26100] p-0 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 text-white animate-spin" />
            ) : (
              <Search className="h-4 w-4 text-white" />
            )}
          </Button>
        </div>

        <Select value={sort} onValueChange={(v: SortKey) => setSort(v)}>
          <SelectTrigger className="h-11 w-[140px] rounded-lg border-slate-300 text-[13px] md:text-sm cursor-pointer">
            <SelectValue placeholder="Terbaru.." />
          </SelectTrigger>
          <SelectContent align="end" className="text-sm">
            <SelectItem value="terbaru">Terbaru..</SelectItem>
            <SelectItem value="terlama">Terlama..</SelectItem>
            <SelectItem value="az">A — Z</SelectItem>
            <SelectItem value="za">Z — A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-7 overflow-hidden rounded-xl border border-slate-300 min-h-[200px] relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-[#FE8100] animate-spin" />
          </div>
        )}

        {isError && (
          <div className="p-10 text-center text-red-500">
            Terjadi kesalahan saat memuat data. Silakan coba lagi.
          </div>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            Tidak ada publikasi ditemukan.
          </div>
        )}

        {items.map((item, idx) => (
          <article
            key={item.id}
            className={cn(
              "grid grid-cols-1 gap-1 px-5 py-5 md:px-8",
              idx % 2 === 0 ? "bg-white" : "bg-[#F3F4F6]"
            )}
          >
            <h3 className="text-xl md:text-2xl font-extrabold leading-snug text-slate-900">
              {item.title}
            </h3>

            <div className="flex flex-col gap-1 text-sm">
              <div className="font-semibold text-slate-500">
                {item.created_by?.full_name || "Unknown Author"}
              </div>
              <p className="max-w-5xl text-slate-600 leading-relaxed line-clamp-3">
                {item.description}
              </p>
              <div className="text-[13px] font-semibold text-[#2A176F] mt-2">
                {item.year}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Select
            value={String(pageSize)}
            onValueChange={(v) => setPageSize(Number(v))}
          >
            <SelectTrigger className="h-9 w-[72px] rounded-md border-slate-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-slate-600">per halaman</span>
        </div>

        <nav aria-label="Pagination" className="flex items-center gap-1">
          <PageButton
            disabled={page === 1 || isLoading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            label="Sebelumnya"
          >
            ‹
          </PageButton>

          {renderPageNumbers(page, paging.total_pages).map((p, i) =>
            typeof p === "number" ? (
              <PageNumber
                key={`${p}-${i}`}
                active={p === page}
                onClick={() => setPage(p)}
              >
                {p}
              </PageNumber>
            ) : (
              <Ellipsis key={`e-${i}`} />
            )
          )}

          <PageButton
            disabled={page >= paging.total_pages || isLoading}
            onClick={() => setPage((p) => Math.min(paging.total_pages, p + 1))}
            label="Berikutnya"
          >
            ›
          </PageButton>
        </nav>
      </div>
    </section>
  );
}

function renderPageNumbers(current: number, total: number): (number | "...")[] {
  const delta = 1;
  const pages: (number | "...")[] = [];
  const range = [];
  for (
    let i = Math.max(1, current - delta);
    i <= Math.min(total, current + delta);
    i++
  ) {
    range.push(i);
  }
  const withBoundaries = Array.from(new Set([1, ...range, total])).sort(
    (a, b) => a - b
  );
  let last = 0;
  for (const p of withBoundaries) {
    if (last && p - last > 1) pages.push("...");
    pages.push(p);
    last = p;
  }
  if (total === 0) return [1];

  return withBoundaries.length <= 5 ? withBoundaries : pages;
}

function PageButton({
  children,
  disabled,
  onClick,
  label,
}: React.PropsWithChildren<{
  disabled?: boolean;
  onClick?: () => void;
  label: string;
}>) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "h-9 min-w-9 rounded-md border px-3 text-sm transition-colors",
        disabled
          ? "cursor-not-allowed border-slate-200 text-slate-400"
          : "border-slate-300 text-slate-700 hover:bg-slate-50"
      )}
    >
      {children}
    </button>
  );
}

function PageNumber({
  children,
  active,
  onClick,
}: React.PropsWithChildren<{ active?: boolean; onClick?: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 min-w-9 rounded-md border px-3 text-sm transition-colors",
        active
          ? "border-transparent bg-[#FF8A00] text-white"
          : "border-slate-300 text-slate-700 hover:bg-slate-50"
      )}
    >
      {children}
    </button>
  );
}

function Ellipsis() {
  return (
    <span className="mx-1 px-2 text-sm text-slate-500 select-none">…</span>
  );
}
