'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  Send, 
  PlusCircle, 
  ArrowRight, 
  AlertCircle,
  Newspaper,
  BookOpenText,
  MapPin,
  ChevronRight
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    suratList, 
    jemaatList, 
    kegiatanList, 
    khotbahList, 
    pengumumanList, 
    wartaJemaat,
    setActiveTab,
    permohonanList
  } = useApp();

  const role = currentUser?.role || 'jemaat';

  // Calculations
  const totalJemaat = jemaatList.length;
  const suratMenunggu = suratList.filter((s) => s.status === 'Menunggu Pemeriksaan').length;
  const suratDiproses = suratList.filter((s) => s.status === 'Draf' || s.status === 'Perlu Revisi').length;
  const suratSelesai = suratList.filter((s) => s.status === 'Disetujui' || s.status === 'Selesai / Diarsipkan').length;

  // Next Sermon (e.g. 25 Oktober 2026)
  const latestSermon = khotbahList[khotbahList.length - 1] || khotbahList[0];

  // Upcoming activities
  const upcomingKegiatan = kegiatanList.slice(0, 3);

  // Latest announcements (published)
  const publishedPengumuman = pengumumanList.filter((p) => p.status === 'Dipublikasikan').slice(0, 3);

  // Get greeting based on current local hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0B2545] via-[#133E87] to-[#1E40AF] p-6 sm:p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-400/20 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/70 border border-blue-600/40 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GMI Immanuel Bandar Lampung</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {getGreeting()}, {currentUser?.name || 'Saudara/i Terkasih'}!
            </h2>
            
            <p className="text-blue-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Selamat datang di portal <strong className="text-white">GMI Digital</strong>. 
              {role === 'jemaat'
                ? ` Anda tergabung dalam persekutuan Class Meeting ${currentUser?.classMeeting || 'GMI'}. Mari bertumbuh bersama dalam iman dan pelayanan.`
                : ' Kelola persuratan, data jemaat, dan administrasi gereja secara efisien, tertata, dan terintegrasi.'}
            </p>
          </div>

          {/* Quick Action Buttons on Hero */}
          <div className="flex flex-wrap gap-2.5 shrink-0">
            {role === 'jemaat' ? (
              <button
                onClick={() => setActiveTab('permohonan-jemaat')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Ajukan Surat Jemaat</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('persuratan')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Buat Surat Baru</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('warta-jemaat')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition flex items-center gap-2"
            >
              <BookOpenText className="w-4 h-4" />
              <span>Baca Warta Jemaat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role Notice Alert for Pendeta / Sekretaris */}
      {role === 'pendeta' && suratMenunggu > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs sm:text-sm">
              <strong>Pemberitahuan Persetujuan:</strong> Terdapat{' '}
              <span className="font-bold underline">{suratMenunggu} surat</span> yang sedang menunggu pemeriksaan dan tanda tangan persetujuan Bapak Pendeta.
            </div>
          </div>
          <button
            onClick={() => setActiveTab('persuratan')}
            className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 shrink-0 transition"
          >
            Periksa Sekarang
          </button>
        </div>
      )}

      {/* KPI Stats Cards (For Admin / Sekretaris / Pendeta) */}
      {role !== 'jemaat' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Total Jemaat Terdaftar</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalJemaat}</h3>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">10 Class Meeting</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Menunggu Persetujuan</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">{suratMenunggu}</h3>
              <p className="text-[11px] text-amber-700 font-medium mt-0.5">Perlu diverifikasi</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Surat Diproses / Draf</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">{suratDiproses}</h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Dalam pengerjaan</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Surat Selesai & Arsip</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">{suratSelesai}</h3>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Telah diterbitkan</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Theme of the Month & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 cols): Tema Khotbah & Jadwal Ibadah */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Highlight Card: Tema Khotbah Minggu Ini */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="border-b border-slate-100 pb-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Khotbah Minggu Ini</h3>
                  <p className="text-xs text-slate-500">{latestSermon.tanggal}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('jadwal-ibadah')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >
                <span>Lihat Jadwal Sebulan</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-blue-100/60">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider bg-blue-100/70 px-2.5 py-1 rounded-md">
                Tema Khotbah
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 mt-2 leading-snug">
                &ldquo;{latestSermon.tema}&rdquo;
              </h4>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <span className="text-slate-400">Ayat Firman:</span>
                  <span className="font-bold text-blue-900 bg-white px-2 py-0.5 rounded border border-slate-200">{latestSermon.ayatAlkitab}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <span className="text-slate-400">Pelayan Firman:</span>
                  <span className="font-bold text-slate-900">{latestSermon.pelayanFirman}</span>
                </div>
              </div>
              {latestSermon.keterangan && (
                <p className="mt-3 text-xs text-slate-500 italic">
                  * Catatan: {latestSermon.keterangan}
                </p>
              )}
            </div>

            {/* Quick Sunday Service Times */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <div className="text-[11px] text-slate-500 font-medium">Ibadah I</div>
                <div className="font-bold text-sm text-slate-900">06:30 WIB</div>
                <div className="text-[10px] text-slate-400">Gedung Utama</div>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-center">
                <div className="text-[11px] text-blue-700 font-medium">Ibadah II</div>
                <div className="font-bold text-sm text-blue-950">09:00 WIB</div>
                <div className="text-[10px] text-blue-600">Umum & Live</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center col-span-2 sm:col-span-1">
                <div className="text-[11px] text-slate-500 font-medium">Ibadah Usindah</div>
                <div className="font-bold text-sm text-slate-900">Kamis 10:00 WIB</div>
                <div className="text-[10px] text-slate-400">Aula Serbaguna</div>
              </div>
            </div>
          </div>

          {/* Kegiatan Mendatang Preview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Agenda & Kegiatan Terdekat</h3>
              </div>
              <button
                onClick={() => setActiveTab('kegiatan-mendatang')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {upcomingKegiatan.map((keg) => (
                <div
                  key={keg.id}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {keg.kategori}
                      </span>
                      <span className="text-xs font-medium text-slate-500">{keg.waktu}</span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">{keg.namaKegiatan}</h5>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{keg.lokasi}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="inline-block text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      {keg.tanggal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1 col): Warta Jemaat & Latest News */}
        <div className="space-y-6">
          
          {/* Warta Jemaat Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpenText className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">Warta Jemaat Terbaru</h3>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Edisi Pekan Ini
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60">
                <p className="font-semibold text-amber-950">{wartaJemaat.nomorEdisi}</p>
                <p className="text-slate-600 text-[11px] mt-0.5">{wartaJemaat.tanggalMinggu}</p>
              </div>

              <div>
                <p className="font-bold text-slate-800 mb-1">Liturgi Singkat Minggu Ini:</p>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  {wartaJemaat.liturgiRingkas.slice(0, 4).map((l, idx) => (
                    <li key={idx} className="truncate">• {l}</li>
                  ))}
                </ul>
              </div>

              {wartaJemaat.laporanKeuangan && (
                <div className="pt-2 border-t border-slate-100">
                  <p className="font-bold text-slate-800 text-xs mb-1">Persembahan Minggu Lalu:</p>
                  <p className="text-emerald-700 font-extrabold text-sm">{wartaJemaat.laporanKeuangan.totalMingguLalu}</p>
                </div>
              )}

              <button
                onClick={() => setActiveTab('warta-jemaat')}
                className="w-full mt-2 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs text-center transition flex items-center justify-center gap-2"
              >
                <span>Buka Lembar Warta Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pengumuman Terbaru */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Pengumuman Resmi</h3>
              </div>
              <button
                onClick={() => setActiveTab('pengumuman')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900"
              >
                Semua
              </button>
            </div>

            <div className="space-y-3">
              {publishedPengumuman.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveTab('pengumuman')}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition border border-slate-100 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-700">{item.kategori}</span>
                    <span className="text-[10px] text-slate-400">{item.tanggalPublikasi}</span>
                  </div>
                  <h6 className="font-semibold text-slate-800 text-xs leading-snug line-clamp-2">
                    {item.judul}
                  </h6>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
