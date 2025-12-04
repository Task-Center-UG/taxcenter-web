"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
// Checkbox import dihapus karena tidak digunakan
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

const formSchema = z.object({
  namaLengkap: z.string().min(2, { message: "Nama lengkap wajib diisi." }),
  kelas: z.string().min(1, { message: "Kelas wajib diisi." }),
  npm: z.string().min(8, { message: "NPM wajib diisi." }),
  programStudi: z.string().min(1, { message: "Program studi wajib diisi." }),
  bagianKampus: z.string({ error: "Pilih lokasi kampus." }),
  alamatDomisili: z
    .string()
    .min(10, { message: "Alamat domisili terlalu pendek." }),
  nomorWhatsapp: z.string().min(10, { message: "Nomor WhatsApp tidak valid." }),
  email: z.string().email({ message: "Email tidak valid." }),
  pernahIkutRelawan: z.string({ error: "Pilih salah satu opsi." }),

  usernameInstagram: z
    .string()
    .min(1, { message: "Username Instagram wajib diisi." }),

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaLengkap: "",
      kelas: "",
      npm: "",
      programStudi: "",
      alamatDomisili: "",
      nomorWhatsapp: "",
      email: "",
      usernameInstagram: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log("File KRS:", values.krsFile[0]);
    console.log("File Twibbon:", values.buktiTwibbonFile[0]);
    alert("Form Non-MBKM berhasil disubmit!");
  }

  const fileInputClass =
    "cursor-pointer pl-0 py-0 file:h-full file:bg-gray-100 file:text-gray-700 file:border-0 file:border-r file:border-gray-200 file:px-4 file:mr-4 file:font-medium hover:file:bg-gray-200 transition-all";

  return (
    <>
      <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none"></div>

      <div className="w-full min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Pendaftaran Relawan Pajak Non MBKM
            </h1>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s.
            </p>
          </div>

          {/* Form Section */}
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

              <FormField
                control={form.control}
                name="programStudi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Studi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Teknik Informatika"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bagianKampus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bagian Kampus</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kampus" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Depok">Depok</SelectItem>
                        <SelectItem value="Kalimalang">Kalimalang</SelectItem>
                        <SelectItem value="Karawaci">Karawaci</SelectItem>
                        <SelectItem value="Cengkareng">Cengkareng</SelectItem>
                        <SelectItem value="Simatupang">Simatupang</SelectItem>
                        <SelectItem value="Salemba">Salemba</SelectItem>
                      </SelectContent>
                    </Select>
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

              <FormField
                control={form.control}
                name="nomorWhatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor WhatsApp Aktif</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Contoh: 0812-3456-7890"
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
                        <SelectItem value="Sudah">Sudah</SelectItem>
                        <SelectItem value="Belum">Belum</SelectItem>
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
                className="w-full bg-[#4F46E5] hover:bg-[#4338ca] text-white font-semibold py-6 rounded-md transition-all mt-8"
              >
                Submit Pendaftaran
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FormRelawanPajakNonMBKM;
