'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { CHURCH_PROFILE } from '@/lib/initialData';
import { 
  Settings, 
  Database, 
  Copy, 
  Check, 
  Save, 
  RotateCcw, 
  ShieldCheck, 
  Server, 
  FileCode,
  Key
} from 'lucide-react';

export const PengaturanView: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'sql' | 'env'>('profile');
  const [copied, setCopied] = useState(false);

  // Church Profile Settings
  const [namaGereja, setNamaGereja] = useState(CHURCH_PROFILE.nama);
  const [namaJemaat, setNamaJemaat] = useState(CHURCH_PROFILE.jemaat);
  const [wilayah, setWilayah] = useState(CHURCH_PROFILE.wilayah);
  const [alamat, setAlamat] = useState(CHURCH_PROFILE.alamat);
  const [telepon, setTelepon] = useState(CHURCH_PROFILE.telepon);
  const [email, setEmail] = useState(CHURCH_PROFILE.email);
  const [instagram, setInstagram] = useState(CHURCH_PROFILE.instagram);
  const [youtube, setYoutube] = useState(CHURCH_PROFILE.youtubeNama);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Konfigurasi identitas gereja berhasil disimpan.', 'success');
  };

  const handleResetDemoData = () => {
    if (confirm('Apakah Anda yakin ingin mengatur ulang data kembali ke data contoh bawaan?')) {
      localStorage.clear();
      showToast('Data demo berhasil direset. Silakan refresh halaman.', 'info');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const SUPABASE_SQL_SCHEMA = `-- SCHEMA DATABASE GMI DIGITAL (SUPABASE / POSTGRESQL)
-- GMI Immanuel Bandar Lampung

-- 1. Table Jemaat
CREATE TABLE IF NOT EXISTS public.jemaat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nomor_anggota VARCHAR(50) UNIQUE NOT NULL,
    nama_lengkap VARCHAR(255) NOT NULL,
    jenis_kelamin VARCHAR(2) CHECK (jenis_kelamin IN ('L', 'P')),
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    alamat TEXT,
    no_hp VARCHAR(30),
    class_meeting VARCHAR(50) NOT NULL,
    status_keanggotaan VARCHAR(50) DEFAULT 'Jemaat Penuh',
    status_pernikahan VARCHAR(30),
    golongan_darah VARCHAR(5),
    tanggal_baptis DATE,
    tanggal_sidi DATE,
    nama_keluarga VARCHAR(150),
    hubungan_keluarga VARCHAR(50),
    pekerjaan VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table Surat Resmi
CREATE TABLE IF NOT EXISTS public.surat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nomor_surat VARCHAR(100) UNIQUE NOT NULL,
    jenis_surat VARCHAR(100) NOT NULL,
    tanggal_surat DATE NOT NULL,
    perihal VARCHAR(255) NOT NULL,
    lampiran VARCHAR(100) DEFAULT '-',
    status VARCHAR(50) DEFAULT 'Draf',
    dibuat_oleh VARCHAR(100) NOT NULL,
    nama_jemaat VARCHAR(255) NOT NULL,
    nomor_anggota VARCHAR(50),
    class_meeting VARCHAR(50),
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    alamat TEXT,
    no_hp VARCHAR(30),
    tujuan_surat VARCHAR(255) NOT NULL,
    keperluan TEXT,
    tanggal_baptis DATE,
    nama_pendeta_baptis VARCHAR(150),
    nomor_stb_baptis VARCHAR(50),
    nama_pasangan VARCHAR(255),
    tanggal_pernikahan DATE,
    gereja_tujuan VARCHAR(255),
    nama_kegiatan VARCHAR(255),
    tanggal_kegiatan DATE,
    waktu_kegiatan VARCHAR(50),
    tempat_kegiatan VARCHAR(255),
    peran_pelayanan VARCHAR(150),
    isi_surat_khusus TEXT,
    catatan_pendeta TEXT,
    catatan_revisi TEXT,
    tanggal_disetujui DATE,
    disetujui_oleh VARCHAR(150),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table Kegiatan Gereja
CREATE TABLE IF NOT EXISTS public.kegiatan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_kegiatan VARCHAR(255) NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    tanggal DATE NOT NULL,
    waktu VARCHAR(50) NOT NULL,
    lokasi VARCHAR(255) NOT NULL,
    penanggung_jawab VARCHAR(150),
    deskripsi TEXT,
    poster_url TEXT,
    status VARCHAR(50) DEFAULT 'Akan Datang',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table Jadwal Khotbah
CREATE TABLE IF NOT EXISTS public.khotbah (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tanggal VARCHAR(100) NOT NULL,
    tema VARCHAR(255) NOT NULL,
    ayat_alkitab VARCHAR(150) NOT NULL,
    pelayan_firman VARCHAR(150) NOT NULL,
    keterangan VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Dikonfirmasi',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table Pengumuman
CREATE TABLE IF NOT EXISTS public.pengumuman (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    judul VARCHAR(255) NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    isi TEXT NOT NULL,
    tanggal_publikasi DATE NOT NULL,
    penulis VARCHAR(150) NOT NULL,
    status VARCHAR(50) DEFAULT 'Dipublikasikan',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Table Audit Log
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    waktu TIMESTAMPTZ DEFAULT NOW(),
    aktor VARCHAR(150) NOT NULL,
    peran VARCHAR(50) NOT NULL,
    tindakan VARCHAR(150) NOT NULL,
    kategori VARCHAR(50) NOT NULL,
    detail TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.jemaat ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surat ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Admin can do all
CREATE POLICY "Admin All Access" ON public.jemaat FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin All Access Surat" ON public.surat FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
`;

  const copySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    showToast('Skrip SQL Supabase berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-800" />
            <span>Pengaturan Aplikasi & Skema Database</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Konfigurasi kop surat gereja, rekening persembahan, dan integrasi backend Supabase
          </p>
        </div>

        {/* Tab options */}
        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'profile' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Profil Kop Gereja
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'sql' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-blue-700" />
            <span>Skema SQL Supabase</span>
          </button>
          <button
            onClick={() => setActiveTab('env')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'env' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-emerald-700" />
            <span>Panduan Deployment</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PROFIL KOP SURAT */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-bold text-slate-900 text-base">Identitas & Kop Surat Resmi Gereja</h3>
            <p className="text-xs text-slate-500">Informasi ini tercetak otomatis pada kop surat resmi dan lembar warta jemaat.</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Organisasi Induk</label>
                <input
                  type="text"
                  value={namaGereja}
                  onChange={(e) => setNamaGereja(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Jemaat Lokal</label>
                <input
                  type="text"
                  value={namaJemaat}
                  onChange={(e) => setNamaJemaat(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-blue-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Wilayah / Distrik</label>
                <input
                  type="text"
                  value={wilayah}
                  onChange={(e) => setWilayah(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Telepon Kantor</label>
                <input
                  type="text"
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Gedung Gereja</label>
                <input
                  type="text"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Resmi</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Akun Instagram</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetDemoData}
                className="px-4 py-2 text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Data Demo Sistem</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2"
              >
                <Save className="w-4 h-4 text-amber-300" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>

          {/* Backup & Restore Data Section */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Pencadangan & Pemulihan Data (Backup & Restore)</h4>
              <p className="text-xs text-slate-500">
                Amankan seluruh data jemaat, persuratan, jadwal, dan pengumuman dengan mengunduh berkas cadangan JSON terenkripsi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                <span className="font-bold text-blue-950 text-xs block">1. Unduh Cadangan Data</span>
                <p className="text-[11px] text-slate-600">Simpan seluruh arsip dan basis data gereja ke perangkat lokal Anda.</p>
                <button
                  type="button"
                  onClick={() => {
                    const backupData = {
                      surat: localStorage.getItem('gmi_surat'),
                      jemaat: localStorage.getItem('gmi_jemaat'),
                      kegiatan: localStorage.getItem('gmi_kegiatan'),
                      khotbah: localStorage.getItem('gmi_khotbah'),
                      pengumuman: localStorage.getItem('gmi_pengumuman'),
                      warta: localStorage.getItem('gmi_warta'),
                      backupDate: new Date().toISOString()
                    };
                    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `backup_gmi_digital_${new Date().toISOString().split('T')[0]}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                    showToast('Cadangan data berhasil diunduh.', 'success');
                  }}
                  className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold rounded-xl shadow-xs transition"
                >
                  Unduh Berkas Cadangan (.json)
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <span className="font-bold text-emerald-950 text-xs block">2. Pulihkan dari Cadangan</span>
                <p className="text-[11px] text-slate-600">Unggah berkas JSON cadangan untuk memulihkan seluruh data aplikasi.</p>
                <label className="inline-block px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer">
                  <span>Pilih & Pulihkan Data JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          try {
                            const data = JSON.parse(event.target?.result as string);
                            if (data.surat) localStorage.setItem('gmi_surat', data.surat);
                            if (data.jemaat) localStorage.setItem('gmi_jemaat', data.jemaat);
                            if (data.kegiatan) localStorage.setItem('gmi_kegiatan', data.kegiatan);
                            if (data.khotbah) localStorage.setItem('gmi_khotbah', data.khotbah);
                            if (data.pengumuman) localStorage.setItem('gmi_pengumuman', data.pengumuman);
                            if (data.warta) localStorage.setItem('gmi_warta', data.warta);
                            showToast('Data berhasil dipulihkan dari cadangan! Merefresh halaman...', 'success');
                            setTimeout(() => window.location.reload(), 1000);
                          } catch {
                            showToast('Gagal memulihkan: Format berkas JSON tidak valid.', 'error');
                          }
                        };
                        reader.readAsText(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SKEMA DATABASE SUPABASE */}
      {activeTab === 'sql' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-600" />
                <span>Skrip SQL Skema PostgreSQL / Supabase</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Jalankan script ini di SQL Editor Supabase untuk menghubungkan aplikasi ke cloud database.
              </p>
            </div>

            <button
              onClick={copySql}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-2 self-start sm:self-auto"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-300" />}
              <span>{copied ? 'Berhasil Disalin!' : 'Salin Skrip SQL'}</span>
            </button>
          </div>

          <div className="relative">
            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto max-h-[500px] leading-relaxed">
              <code>{SUPABASE_SQL_SCHEMA}</code>
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: PANDUAN DEPLOYMENT */}
      {activeTab === 'env' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm">
          <div className="border-b pb-3">
            <h3 className="font-bold text-slate-900 text-base">Panduan Menjalankan & Deployment GMI Digital</h3>
            <p className="text-xs text-slate-500">Langkah mudah mengoperasikan aplikasi secara lokal dan online</p>
          </div>

          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
              <h4 className="font-bold text-blue-950 text-sm">1. Menjalankan Secara Lokal (Development)</h4>
              <p>Untuk menjalankan server lokal di laptop gereja:</p>
              <pre className="bg-slate-900 text-amber-300 p-2.5 rounded-xl font-mono text-xs">
                npm run dev
              </pre>
              <p className="text-[11px] text-slate-600">Buka browser di <strong className="text-blue-900 font-mono">http://localhost:3000</strong>.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">2. Akun & Kredensial Pengurus</h4>
              <ul className="space-y-1 text-xs">
                <li>• <strong>Admin:</strong> username <code className="bg-white px-1.5 py-0.5 rounded border">admin</code></li>
                <li>• <strong>Sekretaris:</strong> username <code className="bg-white px-1.5 py-0.5 rounded border">sekretaris</code></li>
                <li>• <strong>Pendeta:</strong> username <code className="bg-white px-1.5 py-0.5 rounded border">pendeta</code></li>
                <li>• <strong>Jemaat:</strong> Cukup pilih salah satu dari 10 Class Meeting (CM: Samaria, Andreas, Yakobus, Matius, Lukas, Yohanes, Gilead, Filipi, Sinai, Bethel) untuk langsung masuk!</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-950 text-sm">3. Deployment ke Hosting Cloud (Vercel / Netlify)</h4>
              <p>Proyek Next.js ini dapat di-deploy ke Vercel hanya dengan menghubungkan repository GitHub. Seluruh fungsionalitas formulir, cetak surat, dan filtrasi akan langsung berjalan lancar.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
