'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { SuratItem } from '@/lib/types';
import { SuratDocument } from './SuratDocument';
import { 
  Archive, 
  Search, 
  Printer, 
  Eye, 
  FileText, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  Download,
  ArrowLeft
} from 'lucide-react';

export const ArsipSuratView: React.FC = () => {
  const { suratList } = useApp();
  const [search, setSearch] = useState('');
  const [selectedSurat, setSelectedSurat] = useState<SuratItem | null>(null);
  const [filterType, setFilterType] = useState('all');

  // Completed or approved letters
  const archivedSurat = suratList.filter((s) => 
    s.status === 'Disetujui' || s.status === 'Selesai / Diarsipkan'
  );

  const filtered = archivedSurat.filter((s) => {
    const matchSearch = 
      s.nomorSurat.toLowerCase().includes(search.toLowerCase()) ||
      s.namaJemaat.toLowerCase().includes(search.toLowerCase()) ||
      s.perihal.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || s.jenisSurat === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Archive className="w-6 h-6 text-blue-800" />
            <span>Arsip Surat Digital Gereja</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Dokumen resmi gereja yang telah diverifikasi, disetujui, dan diarsipkan secara permanen
          </p>
        </div>

        {selectedSurat && (
          <button
            onClick={() => setSelectedSurat(null)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Arsip</span>
          </button>
        )}
      </div>

      {/* Detail / Print Preview */}
      {selectedSurat ? (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between no-print">
            <div>
              <span className="text-xs text-slate-500">Nomor Arsip:</span>
              <p className="font-bold text-slate-900 text-sm font-mono">{selectedSurat.nomorSurat}</p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-xs transition"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>

          <div className="bg-slate-200/50 p-2 sm:p-6 rounded-3xl">
            <SuratDocument surat={selectedSurat} />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Filter Bar */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between no-print">
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Cari arsip nomor surat, nama..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            >
              <option value="all">Semua Kategori Arsip</option>
              <option value="Surat Keterangan Jemaat">Surat Keterangan Jemaat</option>
              <option value="Surat Baptisan">Surat Baptisan</option>
              <option value="Surat Rekomendasi">Surat Rekomendasi</option>
              <option value="Surat Undangan Kegiatan">Surat Undangan Kegiatan</option>
              <option value="Surat Tugas Pelayanan">Surat Tugas Pelayanan</option>
              <option value="Surat Keterangan Pernikahan">Surat Keterangan Pernikahan</option>
            </select>
          </div>

          {/* Archived Letters Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            {filtered.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <Archive className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="font-semibold text-slate-700">Belum ada dokumen yang diarsipkan</p>
                <p className="text-xs text-slate-400 mt-1">Surat yang disetujui Pendeta akan otomatis tersimpan dalam arsip digital.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="py-3.5 px-4 sm:px-6">No. Surat & Tanggal</th>
                      <th className="py-3.5 px-4">Jenis Dokumen</th>
                      <th className="py-3.5 px-4">Nama Jemaat</th>
                      <th className="py-3.5 px-4">Status & Pengesahan</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {filtered.map((surat) => (
                      <tr key={surat.id} className="hover:bg-blue-50/30 transition">
                        <td className="py-4 px-4 sm:px-6 font-mono font-bold text-slate-900">
                          <div>{surat.nomorSurat}</div>
                          <div className="text-[11px] font-sans text-slate-400 font-normal">{surat.tanggalSurat}</div>
                        </td>
                        <td className="py-4 px-4 font-semibold text-blue-900">
                          {surat.jenisSurat}
                        </td>
                        <td className="py-4 px-4 text-slate-800 font-medium">
                          {surat.namaJemaat}
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> Disetujui Pendeta
                          </span>
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-right space-x-1.5">
                          <button
                            onClick={() => setSelectedSurat(surat)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition inline-flex items-center gap-1 text-xs font-semibold px-2.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Buka Dokumen</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
