"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { usePostData } from "@/hooks/use-post-data";
import { useGetData } from "@/hooks/use-get-data";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PageHeaderHero from "@/components/PageHeaderHero";

interface Major {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
}

const formSchema = z.object({
  namaLengkap: z
    .string()
    .min(2, { message: "Nama lengkap wajib diisi." })
    .max(255, { message: "Maksimal 255 karakter." }),
  kelas: z
    .string()
    .min(1, { message: "Kelas wajib diisi." })
    .max(40, { message: "Maksimal 40 karakter." }),
  npm: z
    .string()
    .min(1, { message: "NPM wajib diisi." })
    .max(40, { message: "Maksimal 40 karakter." }),

  programStudi: z
    .string({ error: "Program studi wajib dipilih." })
    .min(1, "Pilih program studi."),

  bagianKampus: z
    .string({ error: "Pilih lokasi kampus." })
    .min(1, "Pilih lokasi kampus."),

  alamatDomisili: z
    .string()
    .min(10, { message: "Alamat domisili terlalu pendek." })
    .max(255, { message: "Maksimal 255 karakter." }),
  nomorWhatsapp: z
    .string()
    .max(40, { message: "Maksimal 40 karakter." })
    .regex(/^\+?[0-9]+$/, {
      message: "Nomor WhatsApp hanya boleh angka dan boleh diawali +",
    }),
  email: z
    .string()
    .email({ message: "Email tidak valid." })
    .max(255, { message: "Maksimal 255 karakter." }),
  pernahIkutRelawan: z
    .string({ error: "Pilih salah satu opsi." })
    .refine(
      (val) =>
        ["SUDAH_TAHUN_INI", "SUDAH_TAHUN_LALU", "BELUM_PERNAH"].includes(val),
      { message: "Pilihan riwayat kegiatan relawan tidak valid." }
    ),

  usernameInstagram: z
    .string()
    .min(1, { message: "Username Instagram wajib diisi." })
    .max(255, { message: "Maksimal 255 karakter." }),

  krsFile: z
    .any()
    .refine((files) => files?.length >= 1, "File KRS wajib diupload.")
    .refine((files) => files?.[0]?.size <= 5000000, "Maksimal ukuran file 5MB.")
    .refine(
      (files) => files?.[0]?.type === "application/pdf",
      "Format harus PDF."
    ),

  transkripFile: z
    .any()
    .refine((files) => files?.length >= 1, "File Transkrip wajib diupload.")
    .refine((files) => files?.[0]?.size <= 5000000, "Maksimal ukuran file 5MB.")
    .refine(
      (files) => files?.[0]?.type === "application/pdf",
      "Format harus PDF."
    ),

  buktiTwibbonFile: z
    .any()
    .refine((files) => files?.length >= 1, "Bukti Twibbon wajib diupload.")
    .refine((files) => files?.[0]?.size <= 5000000, "Maksimal ukuran file 5MB.")
    .refine(
      (files) =>
        ["application/pdf", "image/jpeg", "image/png"].includes(
          files?.[0]?.type
        ),
      "Format harus PDF, JPG, atau PNG."
    ),
});

const FormRelawanPajakNonMBKM = () => {
  const [openProdi, setOpenProdi] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);

  const { data: majors, isLoading: isLoadingMajors } = useGetData<Major[]>({
    key: ["majors"],
    url: "/majors",
  });

  const { data: regions, isLoading: isLoadingRegions } = useGetData<Region[]>({
    key: ["regions"],
    url: "/regions",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaLengkap: "",
      kelas: "",
      npm: "",
      programStudi: "",
      bagianKampus: "",
      alamatDomisili: "",
      nomorWhatsapp: "",
      email: "",
      usernameInstagram: "",
      pernahIkutRelawan: "",
    },
  });

  const { mutate, isPending } = usePostData({
    url: "/tax-volunteer/non-mbkm-registration",
    successMessage: "Pendaftaran Non-MBKM berhasil dikirim!",
    options: {
      onSuccess: () => {
        form.reset();
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("full_name", values.namaLengkap);
    formData.append("class", values.kelas);
    formData.append("npm", values.npm);
    formData.append("address", values.alamatDomisili);
    formData.append("phone_number", values.nomorWhatsapp);
    formData.append("email", values.email);
    formData.append("tax_volunteer_activities", values.pernahIkutRelawan);
    formData.append("username_ig", values.usernameInstagram);
    formData.append("major_id", values.programStudi);
    formData.append("region_id", values.bagianKampus);

    if (values.krsFile && values.krsFile[0]) {
      formData.append("krs", values.krsFile[0]);
    }
    if (values.transkripFile && values.transkripFile[0]) {
      formData.append("transcripts", values.transkripFile[0]);
    }
    if (values.buktiTwibbonFile && values.buktiTwibbonFile[0]) {
      formData.append("screenshot", values.buktiTwibbonFile[0]);
    }

    mutate(formData as any);
  }

  const fileInputClass =
    "cursor-pointer pl-0 py-0 file:h-full file:bg-gray-100 file:text-gray-700 file:border-0 file:border-r file:border-gray-200 file:px-4 file:mr-4 file:font-medium hover:file:bg-gray-200 transition-all";

  return (
    <>
      <PageHeaderHero
        title="PENDAFTARAN RELAWAN PAJAK NON MBKM"
        subtitle="Silakan lengkapi formulir pendaftaran relawan pajak Non-MBKM di bawah ini."
      />

      <div className="w-full min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Pendaftaran Relawan Pajak Non MBKM
            </h1>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Silakan lengkapi formulir di bawah ini dengan data yang
              sebenar-benarnya.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-left"
            >
              <FormField
                control={form.control}
                name="namaLengkap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan Nama Lengkap Sesuai KTP"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="kelas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelas</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: 3IA01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="npm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NPM</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: 50422xxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="programStudi"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Program Studi</FormLabel>
                    <Popover open={openProdi} onOpenChange={setOpenProdi}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openProdi}
                            disabled={isLoadingMajors}
                            className={cn(
                              "w-full justify-between font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {isLoadingMajors ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Memuat Data...
                              </span>
                            ) : field.value ? (
                              majors?.find(
                                (major) => major.id.toString() === field.value
                              )?.name
                            ) : (
                              "Pilih Program Studi"
                            )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                        <Command>
                          <CommandInput placeholder="Cari Program Studi..." />
                          <CommandList>
                            <CommandEmpty>
                              Program studi tidak ditemukan.
                            </CommandEmpty>
                            <CommandGroup>
                              {majors?.map((major) => (
                                <CommandItem
                                  key={major.id}
                                  value={major.name}
                                  onSelect={() => {
                                    form.setValue(
                                      "programStudi",
                                      major.id.toString()
                                    );
                                    setOpenProdi(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === major.id.toString()
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {major.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bagianKampus"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Bagian Kampus</FormLabel>
                    <Popover open={openRegion} onOpenChange={setOpenRegion}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openRegion}
                            disabled={isLoadingRegions}
                            className={cn(
                              "w-full justify-between font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {isLoadingRegions ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Memuat Data...
                              </span>
                            ) : field.value ? (
                              regions?.find(
                                (region) => region.id.toString() === field.value
                              )?.name
                            ) : (
                              "Pilih Lokasi Kampus"
                            )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                        <Command>
                          <CommandInput placeholder="Cari Kampus..." />
                          <CommandList>
                            <CommandEmpty>Kampus tidak ditemukan.</CommandEmpty>
                            <CommandGroup>
                              {regions?.map((region) => (
                                <CommandItem
                                  key={region.id}
                                  value={region.name}
                                  onSelect={() => {
                                    form.setValue(
                                      "bagianKampus",
                                      region.id.toString()
                                    );
                                    setOpenRegion(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === region.id.toString()
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {region.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alamatDomisili"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Domisili</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Contoh: Komplek Gunadarma, Jalan Margonda Raya..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nomorWhatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor WhatsApp Aktif</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Contoh: 081234567890 atau +6281234567890"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Aktif</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@student.gunadarma.ac.id"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="pernahIkutRelawan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Sudah pernah mengikuti kegiatan Relawan Pajak sebelumnya?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jawaban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SUDAH_TAHUN_INI">
                          Sudah (Tahun Ini)
                        </SelectItem>
                        <SelectItem value="SUDAH_TAHUN_LALU">
                          Sudah (Tahun Lalu)
                        </SelectItem>
                        <SelectItem value="BELUM_PERNAH">
                          Belum Pernah
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="krsFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>KRS AKTIF (Format PDF)</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        placeholder="Choose File"
                        type="file"
                        accept="application/pdf"
                        value={undefined}
                        onChange={(event) => onChange(event.target.files)}
                        className={fileInputClass}
                      />
                    </FormControl>
                    <p className="text-[10px] text-gray-400">
                      Upload - Tunjang Ekstensi: PDF, Maks 5 MB
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transkripFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Transkrip Nilai Terbaru (Format PDF)</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        placeholder="Choose File"
                        type="file"
                        accept="application/pdf"
                        value={undefined}
                        onChange={(event) => onChange(event.target.files)}
                        className={fileInputClass}
                      />
                    </FormControl>
                    <p className="text-[10px] text-gray-400">
                      Upload - Tunjang Ekstensi: PDF, Maks 5 MB
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="usernameInstagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder="@username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="buktiTwibbonFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>
                      Bukti Screenshot Post Twibbon di Instagram*
                    </FormLabel>
                    <FormDescription className="text-sm text-gray-800 mb-2">
                      Silahkan download Twibbon melalui link berikut:{" "}
                      <Link
                        href="https://twibbo.nz/relpak2026tcug-feed"
                        className="text-black underline font-bold"
                        target="_blank"
                      >
                        https://twibbo.nz/relpak2026tcug-feed
                      </Link>
                    </FormDescription>

                    <FormControl>
                      <Input
                        {...fieldProps}
                        placeholder="Choose File"
                        type="file"
                        accept="application/pdf, image/png, image/jpeg"
                        value={undefined}
                        onChange={(event) => onChange(event.target.files)}
                        className={fileInputClass}
                      />
                    </FormControl>
                    <p className="text-[10px] text-gray-400">
                      Upload - PDF/JPG/PNG, Maks 5 MB
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4 pt-2 text-sm md:text-base text-gray-800 leading-relaxed">
                <p className="font-medium">
                  Post Twibbon di Instagram dengan men-tag{" "}
                  <strong>@taxcenter.ug</strong> <br />
                  (akun Instagram harus asli dan publik) dengan caption:
                </p>

                <div className="bg-gray-50 p-4 rounded-md border border-gray-100 space-y-4 select-text">
                  <p className="font-bold">Halo Sobat Pajak!</p>
                  <p>
                    Perkenalkan nama saya [nama lengkap] dari Universitas
                    Gunadarma Fakultas [...] Program Studi [...] siap mengikuti
                    seleksi Relawan Pajak Untuk Negeri 2026.
                  </p>
                  <p>
                    Kami siap melayani Wajib Pajak dan memberikan pelayanan
                    terbaik serta ikut dalam menyukseskan penerimaan pajak
                    tahunan 2025.
                  </p>
                  <p className="font-bold">Generasi Muda Sadar Pajak!</p>
                  <p>
                    Yuk [tag minimal 3 teman kalian] perbanyak pengalaman dan
                    raih kesempatan emasmu bersama Relawan Pajak Untuk Negeri
                    2026.
                  </p>
                  <p className="font-semibold text-blue-600">
                    #TaxCenterUniversitasGunadarma <br />
                    #RelawanPajak2026
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#4F46E5] hover:bg-[#4338ca] text-white font-semibold py-6 rounded-md transition-all mt-8"
              >
                {isPending ? "Mengirim Data..." : "Submit Pendaftaran"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FormRelawanPajakNonMBKM;
