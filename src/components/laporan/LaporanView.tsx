'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { CLASS_MEETING_LIST } from '@/lib/initialData';
import { 
  BarChart3, 
  History, 
  Search, 
  FileText, 
  Users, 
  ShieldCheck, 
  Calendar, 
  Download,
  Filter
} from 'lucide-react';

export const LaporanView: React.FC = () => {
  const { suratList, jemaatList, auditLogs, kegiatanList, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'surat' | 'jemaat' | 'audit'>('surat');
  const [auditSearch, setAuditSearch] = useState('');

  // Surat statistics
  const totalSurat = suratList.length;
  const suratDisetujui = suratList.filter((s) => s.status === 'Disetujui' || s.status === 'Selesai / Diarsipkan').length;
  const suratMenunggu = suratList.filter((s) => s.status === 'Menunggu Pemeriksaan').length;
  const suratRevisi = suratList.filter((s) => s.status === 'Perlu Revisi').length;
  const suratDraf = suratList.filter((s) => s.status === 'Draf').length;

  // By type count
  const suratByType: Record<string, number> = {};
  suratList.forEach((s) => {
    suratByType[s.jenisSurat] = (suratByType[s.jenisSurat] || 0) + 1;
  });

  // Jemaat statistics by Class Meeting
  const cmStats = CLASS_MEETING_LIST.map((cm) => {
    const count = jemaatList.filter((j) => j.classMeeting === cm.name).length;
    return { name: cm.name, count };
  });

  // Jemaat by status
  const jemaatPenuh = jemaatList.filter((j) => j.statusKeanggotaan === 'Jemaat Penuh').length;
  const katekisasi = jemaatList.filter((j) => j.statusKeanggotaan === 'Katekisasi').length;
  const pemuda = jemaatList.filter((j) => j.statusKeanggotaan === 'Pemuda/i').length;
  const lansia = jemaatList.filter((j) => j.statusKeanggotaan === 'Lansia (Usindah)').length;

  // Audit filter
  const filteredLogs = auditLogs.filter((log) => 
    log.aktor.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.tindakan.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.detail.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-800" />
            <span>Laporan Statistik & Riwayat Audit</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Analisis administrasi pelayanan, rekapitulasi persuratan, dan log audit sistem
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('surat')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'surat' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Laporan Persuratan
          </button>
          <button
            onClick={() => setActiveTab('jemaat')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'jemaat' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Statistik Jemaat
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'audit' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Log Aktivitas (Audit)
          </button>
        </div>
      </div>

      {/* TAB 1: LAPORAN PERSURATAN */}
      {activeTab === 'surat' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold uppercase">Total Surat Diterbitkan</span>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{suratDisetujui}</p>
              <span className="text-[11px] text-emerald-600 font-medium">Disetujui Pendeta</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold uppercase">Menunggu Review</span>
              <p className="text-3xl font-extrabold text-amber-600 mt-1">{suratMenunggu}</p>
              <span className="text-[11px] text-amber-700 font-medium">Antrean persetujuan</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold uppercase">Dalam Revisi</span>
              <p className="text-3xl font-extrabold text-rose-600 mt-1">{suratRevisi}</p>
              <span className="text-[11px] text-rose-700 font-medium">Perlu perbaikan</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold uppercase">Draf / Disiapkan</span>
              <p className="text-3xl font-extrabold text-blue-600 mt-1">{suratDraf}</p>
              <span className="text-[11px] text-blue-700 font-medium">Belum diajukan</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">
              Distribusi Surat Berdasarkan Jenis Layanan
            </h3>
            <div className="space-y-3">
              {Object.entries(suratByType).map(([jenis, count]) => {
                const percentage = totalSurat > 0 ? Math.round((count / totalSurat) * 100) : 0;
                return (
                  <div key={jenis} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800">{jenis}</span>
                      <span className="text-blue-900">{count} surat ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-700 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STATISTIK JEMAAT */}
      {activeTab === 'jemaat' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold uppercase">Jemaat Penuh</span>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{jemaatPenuh}</p>
              <span className="text-[11px] text-slate-500">Anggota Sidi</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold uppercase">Pemuda / Remaja</span>
              <p className="text-3xl font-extrabold text-purple-600 mt-1">{pemuda}</p>
              <span className="text-[11px] text-purple-700">P3MI & PRMI</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold uppercase">Lansia (Usindah)</span>
              <p className="text-3xl font-extrabold text-amber-600 mt-1">{lansia}</p>
              <span className="text-[11px] text-amber-700">Usia Indah</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold uppercase">Peserta Katekisasi</span>
              <p className="text-3xl font-extrabold text-emerald-600 mt-1">{katekisasi}</p>
              <span className="text-[11px] text-emerald-700">Calon Sidi</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">
              Jumlah Anggota per Class Meeting (10 Kelompok CM)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cmStats.map((cm) => (
                <div key={cm.name} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">Class Meeting {cm.name}</span>
                  </div>
                  <span className="font-extrabold text-blue-900 text-xs sm:text-sm bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {cm.count} Jiwa
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT TRAIL / RIWAYAT AKTIVITAS */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari aktor, tindakan, atau detail audit..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Pencatatan Aktivitas Keamanan Sistem
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="divide-y divide-slate-100 text-xs">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-slate-50 transition flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{log.tindakan}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold uppercase">
                        {log.kategori}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs">{log.detail}</p>
                    <div className="text-[11px] text-slate-400">
                      Oleh: <strong className="text-slate-700">{log.aktor}</strong> ({log.peran})
                    </div>
                  </div>
                  <div className="text-right shrink-0 text-[11px] text-slate-400 font-mono">
                    {log.waktu}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
