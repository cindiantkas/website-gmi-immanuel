'use client';

import React from 'react';
import Image from 'next/image';
import { SuratItem } from '@/lib/types';
import { CHURCH_PROFILE } from '@/lib/initialData';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { QRCodeSVG } from './QRCodeSVG';

interface SuratDocumentProps {
  surat: SuratItem;
}

export const SuratDocument: React.FC<SuratDocumentProps> = ({ surat }) => {
  // Format Indonesian date: e.g. "23 Oktober 2026"
  const formatDateIndo = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const months = [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const day = parseInt(parts[2], 10);
        const month = months[parseInt(parts[1], 10) - 1];
        const year = parts[0];
        return `${day} ${month} ${year}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const isApproved = surat.status === 'Disetujui' || surat.status === 'Selesai / Diarsipkan';

  return (
    <div className="surat-print-container bg-white p-8 sm:p-12 max-w-[210mm] mx-auto text-slate-900 shadow-xl border border-slate-200 rounded-sm relative font-serif text-[13.5px] leading-relaxed">
      
      {/* Draft Watermark if not approved */}
      {!isApproved && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 opacity-10">
          <div className="text-6xl sm:text-7xl font-sans font-black text-rose-600 rotate-[-30deg] border-8 border-rose-600 p-6 rounded-2xl uppercase">
            {surat.status}
          </div>
        </div>
      )}

      {/* Official Church Letterhead / Kop Surat */}
      <div className="border-b-[3px] border-slate-900 pb-3 mb-1">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 relative shrink-0">
            <Image
              src="/logo.png"
              alt="Logo GMI"
              width={80}
              height={80}
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 text-center font-sans">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-blue-950 uppercase">
              Gereja Methodist Indonesia (GMI)
            </h2>
            <h3 className="text-base sm:text-lg font-extrabold text-blue-900 uppercase tracking-wide">
              Jemaat Immanuel Bandar Lampung
            </h3>
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Distrik 1 Wilayah I
            </p>
            <p className="text-[11px] text-slate-600 mt-1">
              {CHURCH_PROFILE.alamat} | Telp: {CHURCH_PROFILE.telepon}
            </p>
            <p className="text-[11px] text-slate-500">
              Email: {CHURCH_PROFILE.email} | Instagram: {CHURCH_PROFILE.instagram}
            </p>
          </div>
        </div>
      </div>
      {/* Secondary thin border for formal Indonesian letter standard */}
      <div className="border-b border-slate-900 mb-6"></div>

      {/* Letter Meta Details (Nomor, Lampiran, Hal & Tanggal) */}
      <div className="flex justify-between items-start mb-6">
        <table className="text-xs leading-normal">
          <tbody>
            <tr>
              <td className="w-20 font-semibold text-slate-700">Nomor</td>
              <td className="w-4">:</td>
              <td className="font-bold font-mono text-slate-900">{surat.nomorSurat}</td>
            </tr>
            <tr>
              <td className="font-semibold text-slate-700">Lampiran</td>
              <td>:</td>
              <td>{surat.lampiran || '-'}</td>
            </tr>
            <tr>
              <td className="font-semibold text-slate-700 align-top">Perihal</td>
              <td className="align-top">:</td>
              <td className="font-bold underline text-slate-900">{surat.perihal}</td>
            </tr>
          </tbody>
        </table>

        <div className="text-right text-xs">
          <p className="font-medium text-slate-800">
            Bandar Lampung, {formatDateIndo(surat.tanggalSurat)}
          </p>
        </div>
      </div>

      {/* Recipient */}
      <div className="mb-6 text-xs sm:text-sm">
        <p className="font-semibold text-slate-800">Kepada Yth,</p>
        <p className="font-bold text-slate-900 text-sm mt-0.5">{surat.tujuanSurat}</p>
        <p className="text-slate-700">di Tempat</p>
      </div>

      {/* Salutation */}
      <div className="mb-4">
        <p className="italic font-medium">Salam sejahtera dalam kasih Tuhan kita Yesus Kristus,</p>
      </div>

      {/* Letter Body Opening */}
      <div className="mb-4 text-justify">
        <p>
          Gembala Jemaat dan Majelis Gereja Methodist Indonesia (GMI) Jemaat Immanuel Bandar Lampung dengan ini menerangkan dan menyatakan bahwa:
        </p>
      </div>

      {/* Structured Particulars Data Table */}
      <div className="my-5 pl-4 sm:pl-8">
        <table className="w-full text-xs sm:text-sm border-collapse">
          <tbody>
            <tr className="py-1">
              <td className="w-36 sm:w-44 font-semibold text-slate-700 py-1">Nama Lengkap</td>
              <td className="w-4 py-1">:</td>
              <td className="font-bold text-slate-900 uppercase py-1">{surat.namaJemaat}</td>
            </tr>
            
            {surat.nomorAnggota && (
              <tr>
                <td className="font-semibold text-slate-700 py-1">Nomor Anggota</td>
                <td>:</td>
                <td className="py-1 font-mono">{surat.nomorAnggota}</td>
              </tr>
            )}

            {surat.classMeeting && (
              <tr>
                <td className="font-semibold text-slate-700 py-1">Class Meeting (CM)</td>
                <td>:</td>
                <td className="py-1">{surat.classMeeting}</td>
              </tr>
            )}

            {surat.tempatLahir && surat.tanggalLahir && (
              <tr>
                <td className="font-semibold text-slate-700 py-1">Tempat / Tgl Lahir</td>
                <td>:</td>
                <td className="py-1">{surat.tempatLahir}, {formatDateIndo(surat.tanggalLahir)}</td>
              </tr>
            )}

            {surat.alamat && (
              <tr>
                <td className="font-semibold text-slate-700 py-1 align-top">Alamat Domisili</td>
                <td className="align-top">:</td>
                <td className="py-1 text-slate-800">{surat.alamat}</td>
              </tr>
            )}

            {/* Custom fields based on letter type */}
            {surat.jenisSurat === 'Surat Baptisan' && (
              <>
                <tr>
                  <td className="font-semibold text-slate-700 py-1">Tanggal Baptisan Kudus</td>
                  <td>:</td>
                  <td className="py-1 font-medium">{formatDateIndo(surat.tanggalBaptis)}</td>
                </tr>
                {surat.namaPendetaBaptis && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">Dilayani Oleh</td>
                    <td>:</td>
                    <td className="py-1">{surat.namaPendetaBaptis}</td>
                  </tr>
                )}
                {surat.nomorStbBaptis && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">No. STB Baptis</td>
                    <td>:</td>
                    <td className="py-1 font-mono">{surat.nomorStbBaptis}</td>
                  </tr>
                )}
              </>
            )}

            {surat.jenisSurat === 'Surat Keterangan Pernikahan' && (
              <>
                {surat.namaPasangan && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">Nama Pasangan / Tunangan</td>
                    <td>:</td>
                    <td className="py-1 font-bold">{surat.namaPasangan}</td>
                  </tr>
                )}
                {surat.tanggalPernikahan && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">Rencana Pemberkatan</td>
                    <td>:</td>
                    <td className="py-1 font-medium">{formatDateIndo(surat.tanggalPernikahan)}</td>
                  </tr>
                )}
                {surat.gerejaTujuan && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">Tempat / Gereja Tujuan</td>
                    <td>:</td>
                    <td className="py-1">{surat.gerejaTujuan}</td>
                  </tr>
                )}
              </>
            )}

            {surat.jenisSurat === 'Surat Tugas Pelayanan' && (
              <>
                {surat.namaKegiatan && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">Nama Kegiatan Pelayanan</td>
                    <td>:</td>
                    <td className="py-1 font-bold">{surat.namaKegiatan}</td>
                  </tr>
                )}
                {surat.peranPelayanan && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">Tugas / Mandat</td>
                    <td>:</td>
                    <td className="py-1 font-medium text-blue-900">{surat.peranPelayanan}</td>
                  </tr>
                )}
                {surat.tempatKegiatan && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">Lokasi Kegiatan</td>
                    <td>:</td>
                    <td className="py-1">{surat.tempatKegiatan}</td>
                  </tr>
                )}
                {surat.tanggalKegiatan && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">Tanggal & Waktu</td>
                    <td>:</td>
                    <td className="py-1">{formatDateIndo(surat.tanggalKegiatan)} {surat.waktuKegiatan ? `(${surat.waktuKegiatan})` : ''}</td>
                  </tr>
                )}
              </>
            )}

            {surat.jenisSurat === 'Surat Undangan Kegiatan' && (
              <>
                {surat.namaKegiatan && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">Nama Acara</td>
                    <td>:</td>
                    <td className="py-1 font-bold">{surat.namaKegiatan}</td>
                  </tr>
                )}
                {surat.tanggalKegiatan && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">Hari / Tanggal</td>
                    <td>:</td>
                    <td className="py-1">{formatDateIndo(surat.tanggalKegiatan)}</td>
                  </tr>
                )}
                {surat.waktuKegiatan && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">Waktu</td>
                    <td>:</td>
                    <td className="py-1">{surat.waktuKegiatan}</td>
                  </tr>
                )}
                {surat.tempatKegiatan && (
                  <tr>
                    <td className="font-semibold text-slate-700 py-1">Tempat</td>
                    <td>:</td>
                    <td className="py-1">{surat.tempatKegiatan}</td>
                  </tr>
                )}
              </>
            )}

            {surat.keperluan && (
              <tr>
                <td className="font-semibold text-slate-700 py-1 align-top">Keperluan / Keterangan</td>
                <td className="align-top">:</td>
                <td className="py-1 italic text-slate-900">{surat.keperluan}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Additional Custom text / narrative */}
      <div className="mb-6 text-justify text-xs sm:text-sm">
        {surat.isiSuratKhusus ? (
          <p>{surat.isiSuratKhusus}</p>
        ) : (
          <p>
            Adalah benar anggota jemaat yang tercatat dalam Buku Induk Jemaat Gereja Methodist Indonesia (GMI) Immanuel Bandar Lampung dan berkelakuan baik dalam kehidupan persekutuan gerejawi.
          </p>
        )}
      </div>

      {/* Closing Statement */}
      <div className="mb-8 text-justify text-xs sm:text-sm">
        <p>
          Demikian surat keterangan ini kami perbuat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya. Kasih karunia dan damai sejahtera dari Tuhan Yesus Kristus senantiasa menyertai kita sekalian.
        </p>
      </div>

      {/* Signatures Section */}
      <div className="mt-12 pt-4 font-sans text-xs sm:text-sm">
        <div className="grid grid-cols-2 text-center gap-6">
          
          {/* Sekretaris */}
          <div className="flex flex-col items-center">
            <p className="font-medium text-slate-600">Mengetahui & Membuat,</p>
            <p className="font-bold text-slate-900 mt-0.5">Sekretaris Jemaat</p>
            
            {/* Signature space / Digital Stamp */}
            <div className="h-20 sm:h-24 flex items-center justify-center my-1 relative w-36">
              {isApproved && (
                <div className="border border-blue-300 bg-blue-50/70 rounded-lg p-2 text-center w-full">
                  <span className="text-[10px] text-blue-900 font-bold block uppercase">Terverifikasi Digital</span>
                  <span className="text-[9px] text-blue-700 font-mono block">Sekretariat GMI</span>
                </div>
              )}
            </div>

            <p className="font-extrabold text-slate-900 underline">Diak. Maria Christina</p>
            <p className="text-[11px] text-slate-600">Sekretaris GMI Immanuel</p>
          </div>

          {/* Pendeta */}
          <div className="flex flex-col items-center">
            <p className="font-medium text-slate-600">Disetujui Oleh,</p>
            <p className="font-bold text-slate-900 mt-0.5">Pendeta Jemaat</p>

            {/* Signature space / Pendeta Approval Seal */}
            <div className="h-20 sm:h-24 flex items-center justify-center my-1 relative w-40">
              {isApproved ? (
                <div className="border-2 border-emerald-600 bg-emerald-50 rounded-xl p-2 text-center shadow-xs">
                  <div className="flex items-center justify-center gap-1 text-emerald-800 font-bold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>DISETUJUI RESMI</span>
                  </div>
                  <span className="text-[9px] text-emerald-700 block font-mono mt-0.5">
                    {formatDateIndo(surat.tanggalDisetujui || surat.tanggalSurat)}
                  </span>
                  <span className="text-[8px] text-slate-500 block">Digital Verification ID: {surat.id.slice(-6)}</span>
                </div>
              ) : (
                <div className="text-[10px] text-slate-400 italic">
                  (Menunggu persetujuan Pendeta)
                </div>
              )}
            </div>

            <p className="font-extrabold text-slate-900 underline">Pdt. Johanes Supard, M.Th</p>
            <p className="text-[11px] text-slate-600">Gembala Jemaat</p>
          </div>

        </div>

        {/* Verification Footer Note & QR Code */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left text-[10px] text-slate-500 max-w-md">
            <p className="font-semibold text-slate-700">Verifikasi Dokumen Resmi GMI Digital:</p>
            <p className="leading-tight mt-0.5">
              Dokumen ini sah dan diterbitkan secara digital oleh Gereja Methodist Indonesia (GMI) Immanuel Bandar Lampung. Pindai kode QR di samping untuk memvalidasi keaslian surat melalui portal resmi gereja.
            </p>
            <p className="font-mono text-[9px] text-slate-400 mt-1">
              Doc ID: {surat.id}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <QRCodeSVG 
              value={`https://gmi-digital.org/verify?doc=${encodeURIComponent(surat.nomorSurat)}&status=${surat.status}`}
              size={64}
            />
            <div className="text-left text-[9px] text-slate-400 font-mono">
              <span className="block font-bold text-slate-700">Scan Validasi</span>
              <span className="block text-emerald-700 font-bold">{isApproved ? 'TERVERIFIKASI' : 'DRAF'}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
