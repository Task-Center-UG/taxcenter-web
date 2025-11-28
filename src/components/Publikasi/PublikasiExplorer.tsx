"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PublikasiItem = {
  id: number;
  title: string;
  author: string;
  description: string;
  year: number;
};

const DUMMY: PublikasiItem[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  author: "John Doe",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  year: 2025 - ((i % 6) as number),
}));

/* ==== Helper sorters ==== */
type SortKey = "terbaru" | "terlama" | "az" | "za";

function sortData(data: PublikasiItem[], mode: SortKey) {
  const arr = [...data];
  switch (mode) {
    case "terbaru":
      return arr.sort((a, b) => b.year - a.year);
    case "terlama":
      return arr.sort((a, b) => a.year - b.year);
    case "az":
      return arr.sort((a, b) => a.title.localeCompare(b.title));
    case "za":
      return arr.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return arr;
  }
}

export default function PublikasiExplorer() {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortKey>("terbaru");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);

  // Filter + sort
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? DUMMY.filter((d) => d.title.toLowerCase().includes(q))
      : DUMMY;
    return sortData(base, sort);
  }, [query, sort]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  React.useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return (
    <section className="w-full">
      {/* Top controls: search input, sort, search button */}
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
            onClick={() => void 0}
            className="absolute right-2 top-1.5 h-8 w-8 rounded-lg bg-[#FE8100] hover:bg-[#e26100] p-0 cursor-pointer"
          >
            <Search className="h-4 w-4 text-white" />
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

      {/* List Publikasi */}
      <div className="mt-7 overflow-hidden rounded-xl border border-slate-300">
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

            {/* Subheader */}
            <div className="flex flex-col gap-1 text-sm">
              <div className="font-semibold text-slate-500">John Doe</div>
              <p className="max-w-5xl text-slate-600 leading-relaxed">
                {item.description}
              </p>
              <div className="text-[13px] font-semibold text-[#2A176F]">
                {item.year}
              </div>
            </div>
          </article>
        ))}

        {/* Garis pemisah */}
        <div className="hidden" />
      </div>

      {/* Bottom controls: page size + pagination */}
      <div className="mt-7 flex items-center justify-between">
        {/* Page size */}
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

        {/* Pagination */}
        <nav aria-label="Pagination" className="flex items-center gap-1">
          <PageButton
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            label="Sebelumnya"
          >
            ‹
          </PageButton>

          {renderPageNumbers(page, totalPages).map((p, i) =>
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
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            label="Berikutnya"
          >
            ›
          </PageButton>
        </nav>
      </div>
    </section>
  );
}

/* ===== Pagination bits (custom agar mirip desain) ===== */

function renderPageNumbers(current: number, total: number): (number | "...")[] {
  // tampilkan pertama, terakhir, current, tetangga + ellipsis
  const delta = 1;
  const pages: (number | "...")[] = [];

  const range = [];
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i);
  }

  const withBoundaries = Array.from(new Set([1, ...range, total])).sort((a, b) => a - b);

  let last = 0;
  for (const p of withBoundaries) {
    if (last && p - last > 1) pages.push("...");
    pages.push(p);
    last = p;
  }
  return withBoundaries.length <= 5 ? withBoundaries : pages;
}

function PageButton({
  children,
  disabled,
  onClick,
  label,
}: React.PropsWithChildren<{ disabled?: boolean; onClick?: () => void; label: string }>) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "h-9 min-w-9 rounded-md border px-3 text-sm",
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
        "h-9 min-w-9 rounded-md border px-3 text-sm",
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
