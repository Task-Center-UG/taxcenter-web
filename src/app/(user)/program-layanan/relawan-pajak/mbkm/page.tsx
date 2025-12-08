"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
  diterimaRelawan2023: z.string({ error: "Pilih salah satu opsi." }),
  ipk: z.string().refine((val) => !isNaN(Number(val)) && Number(val) <= 4.0, {
    message: "IPK harus berupa angka maksimal 4.00",
  }),
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
    .refine(
      (files) => files?.[0]?.type === "application/pdf",
      "Format harus PDF."
    ),
});

const FormRelawanPajakMBKM = () => {
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
      ipk: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log("File KRS:", values.krsFile[0]);
    console.log("File Transkrip:", values.transkripFile[0]);
    alert("Form berhasil disubmit! Cek console untuk data.");
  }

  return (
    <>
      <div className="relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none"></div>

      <div className="w-full min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Pendaftaran Relawan Pajak MBKM
            </h1>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
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
                      Apakah Anda pernah mengikuti kegiatan Relawan Pajak
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
                name="diterimaRelawan2023"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Apakah Anda diterima di Relawan Pajak 2023?
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
                        <SelectItem value="Ya">Ya</SelectItem>
                        <SelectItem value="Tidak">Tidak</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ipk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IPK</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="3.50" {...field} />
                    </FormControl>
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
                        onChange={(event) => {
                          onChange(event.target.files);
                        }}
                        className="cursor-pointer pl-0 py-0 file:h-full file:bg-gray-100 file:text-gray-700 file:border-0 file:border-r file:border-gray-200 file:px-4 file:mr-4 file:font-medium hover:file:bg-gray-200 transition-all"
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
                        onChange={(event) => {
                          onChange(event.target.files);
                        }}
                        className="cursor-pointer pl-0 py-0 file:h-full file:bg-gray-100 file:text-gray-700 file:border-0 file:border-r file:border-gray-200 file:px-4 file:mr-4 file:font-medium hover:file:bg-gray-200 transition-all"
                      />
                    </FormControl>
                    <p className="text-[10px] text-gray-400">
                      Upload - Tunjang Ekstensi: PDF, Maks 5 MB
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

export default FormRelawanPajakMBKM;
