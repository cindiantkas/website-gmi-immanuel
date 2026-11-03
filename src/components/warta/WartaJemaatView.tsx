'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { CHURCH_PROFILE, CLASS_MEETING_LIST } from '@/lib/initialData';
import { ClassMeetingName } from '@/lib/types';
import { 
  BookOpenText, 
  Printer, 
  Calendar, 
  Heart, 
  Gift, 
  Coins, 
  Users, 
  CheckCircle2, 
  Download, 
  Share2, 
  Edit3, 
  PlusCircle, 
  Trash2, 
  X, 
  Save
} from 'lucide-react';

export const WartaJemaatView: React.FC = () => {
  const { wartaJemaat, updateWarta, currentUser, showToast } = useApp();
  const role = currentUser?.role || 'jemaat';

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Editor state
  const [nomorEdisi, setNomorEdisi] = useState(wartaJemaat.nomorEdisi);
  const [tanggalMinggu, setTanggalMinggu] = useState(wartaJemaat.tanggalMinggu);
  const [temaMinggu, setTemaMinggu] = useState(wartaJemaat.temaMinggu);
  const [pelayanFirman, setPelayanFirman] = useState(wartaJemaat.pelayanFirman);
  const [kolekte, setKolekte] = useState(wartaJemaat.laporanKeuangan?.persembahanKolekte || 'Rp 4.850.000');
  const [persepuluhan, setPersepuluhan] = useState(wartaJemaat.laporanKeuangan?.persembahanPersepuluhan || 'Rp 8.400.000');
  const [syukur, setSyukur] = useState(wartaJemaat.laporanKeuangan?.persembahanSyukur || 'Rp 2.150.000');
  const [totalMingguLalu, setTotalMingguLalu] = useState(wartaJemaat.laporanKeuangan?.totalMingguLalu || 'Rp 15.400.000');
  const [beritaDuka, setBeritaDuka] = useState(wartaJemaat.beritaDuka || '');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Warta Jemaat GMI Immanuel - ${wartaJemaat.nomorEdisi}`,
        text: `Warta Jemaat GMI Immanuel Bandar Lampung edisi ${wartaJemaat.tanggalMinggu}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Tautan Warta Jemaat disalin ke clipboard!', 'info');
    }
  };

  const handleSaveWarta = (e: React.FormEvent) => {
    e.preventDefault();
    updateWarta({
      nomorEdisi,
      tanggalMinggu,
      temaMinggu,
      pelayanFirman,
      beritaDuka: beritaDuka.trim() || undefined,
      laporanKeuangan: {
        persembahanKolekte: kolekte,
        persembahanPersepuluhan: persepuluhan,
        persembahanSyukur: syukur,
        totalMingguLalu
      }
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpenText className="w-6 h-6 text-amber-600" />
            <span>Warta Jemaat Digital</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Edisi Mingguan Resmi GMI Immanuel Bandar Lampung
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(role === 'admin' || role === 'sekretaris') && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-3.5 py-2 bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4" />
              <span>Kelola Warta</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Bagikan</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Cetak / Unduh PDF Warta</span>
          </button>
        </div>
      </div>

      {/* Main Warta Sheet (Designed like a clean printed bulletin) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-4xl mx-auto space-y-8 font-sans print:border-none print:shadow-none print:p-0">
        
        {/* Warta Header Kop */}
        <div className="border-b-[3px] border-slate-900 pb-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 relative shrink-0">
              <Image
                src="/logo.png"
                alt="Logo GMI"
                width={56}
                height={56}
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-black text-blue-950 uppercase tracking-tight">
                Gereja Methodist Indonesia (GMI)
              </h1>
              <h2 className="text-base sm:text-lg font-bold text-blue-900 uppercase">
                Jemaat Immanuel Bandar Lampung
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            {CHURCH_PROFILE.alamat} | Telp: {CHURCH_PROFILE.telepon}
          </p>
          
          <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-200 text-xs font-bold text-slate-800">
            <span>EDISI: {wartaJemaat.nomorEdisi}</span>
            <span className="text-blue-900">{wartaJemaat.tanggalMinggu}</span>
          </div>
        </div>

        {/* Section 1: Tema Khotbah & Pelayan Firman */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-950 text-white space-y-2 text-center shadow-md">
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest bg-blue-800/80 px-3 py-1 rounded-full">
            Tema Ibadah Minggu Ini
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1">
            &ldquo;{wartaJemaat.temaMinggu}&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 font-medium">
            Pelayan Firman: <strong className="text-white">{wartaJemaat.pelayanFirman}</strong>
          </p>
        </div>

        {/* Section 2: Liturgi Ringkas */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <BookOpenText className="w-5 h-5 text-blue-800" />
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base uppercase tracking-wide">
              Tata Ibadah & Liturgi Minggu
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {wartaJemaat.liturgiRingkas.map((item, idx) => (
              <div key={idx} className="py-1">
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Petugas Pelayanan */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Users className="w-5 h-5 text-blue-800" />
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base uppercase tracking-wide">
              Petugas Pelayan Ibadah Minggu Ini
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {wartaJemaat.petugasPelayanan.map((petugas, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="text-[11px] text-slate-400 font-medium">{petugas.peran}</div>
                <div className="font-bold text-slate-900 mt-0.5">{petugas.nama}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Ucapan Ulang Tahun Jemaat (Berdasarkan CM) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Gift className="w-5 h-5 text-amber-500" />
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base uppercase tracking-wide">
              Ucapan Selamat Ulang Tahun Pekan Ini
            </h4>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950 space-y-2">
            <p className="italic text-slate-600">
              Majelis Jemaat dan seluruh sidang jemaat mengucapkan Selamat Hari Ulang Tahun kepada saudara/i kami yang berulang tahun:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-medium">
              {wartaJemaat.ucapanUlangTahun.map((hut, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white border border-amber-200">
                  <span className="font-bold text-slate-900">{hut.nama}</span>
                  <span className="text-[11px] text-amber-800 font-semibold">{hut.tanggal} (CM {hut.classMeeting})</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 text-center pt-2 italic">
              &ldquo;Tuhan memberkati engkau dan melindungi engkau; Tuhan menyinari engkau dengan wajah-Nya.&rdquo; (Bilangan 6:24-25)
            </p>
          </div>
        </div>

        {/* Section 5: Berita Duka Cita (jika ada) */}
        {wartaJemaat.beritaDuka && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Heart className="w-5 h-5 text-rose-600" />
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base uppercase tracking-wide">
                Warta Duka Cita
              </h4>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 leading-relaxed">
              {wartaJemaat.beritaDuka}
            </div>
          </div>
        )}

        {/* Section 6: Laporan Keuangan & Persembahan */}
        {wartaJemaat.laporanKeuangan && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Coins className="w-5 h-5 text-emerald-600" />
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base uppercase tracking-wide">
                Laporan Persembahan Jemaat Minggu Lalu
              </h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-slate-500 block text-[11px]">Kolekte Umum</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{wartaJemaat.laporanKeuangan.persembahanKolekte}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-slate-500 block text-[11px]">Persepuluhan</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{wartaJemaat.laporanKeuangan.persembahanPersepuluhan}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-slate-500 block text-[11px]">Syukur & Khusus</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{wartaJemaat.laporanKeuangan.persembahanSyukur}</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-emerald-700 block text-[11px] font-bold">Total Persembahan</span>
                <span className="font-extrabold text-emerald-900 text-sm mt-0.5 block">{wartaJemaat.laporanKeuangan.totalMingguLalu}</span>
              </div>
            </div>
          </div>
        )}

        {/* Section 7: Pengumuman Sepekan */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Calendar className="w-5 h-5 text-blue-800" />
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base uppercase tracking-wide">
              Pengumuman Sepekan
            </h4>
          </div>
          <div className="space-y-2 text-xs text-slate-700">
            {wartaJemaat.pengumumanSepekan.map((peng, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  {idx + 1}
                </span>
                <p className="leading-relaxed">{peng}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-700">
            Gereja Methodist Indonesia — Jemaat Immanuel Bandar Lampung
          </p>
          <p className="text-[11px]">
            Rekening Persembahan / Pembangunan: BCA {CHURCH_PROFILE.rekeningBank[0].noRek} a.n {CHURCH_PROFILE.rekeningBank[0].an}
          </p>
        </div>

      </div>

      {/* MODAL EDIT WARTA JEMAAT */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 my-8 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                Kelola Informasi Warta Jemaat Edisi Ini
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWarta} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Edisi</label>
                  <input
                    type="text"
                    value={nomorEdisi}
                    onChange={(e) => setNomorEdisi(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Minggu</label>
                  <input
                    type="text"
                    value={tanggalMinggu}
                    onChange={(e) => setTanggalMinggu(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tema Ibadah Minggu Ini</label>
                <input
                  type="text"
                  value={temaMinggu}
                  onChange={(e) => setTemaMinggu(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pelayan Firman</label>
                <input
                  type="text"
                  value={pelayanFirman}
                  onChange={(e) => setPelayanFirman(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <span className="font-bold text-xs text-emerald-950 uppercase">Laporan Keuangan / Persembahan</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Kolekte Umum</label>
                    <input
                      type="text"
                      value={kolekte}
                      onChange={(e) => setKolekte(e.target.value)}
                      className="w-full py-1.5 px-2 bg-white border border-emerald-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Persepuluhan</label>
                    <input
                      type="text"
                      value={persepuluhan}
                      onChange={(e) => setPersepuluhan(e.target.value)}
                      className="w-full py-1.5 px-2 bg-white border border-emerald-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Syukur / Lainnya</label>
                    <input
                      type="text"
                      value={syukur}
                      onChange={(e) => setSyukur(e.target.value)}
                      className="w-full py-1.5 px-2 bg-white border border-emerald-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Total Minggu Lalu</label>
                    <input
                      type="text"
                      value={totalMingguLalu}
                      onChange={(e) => setTotalMingguLalu(e.target.value)}
                      className="w-full py-1.5 px-2 bg-white border border-emerald-300 rounded-lg text-xs font-bold text-emerald-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Berita Duka Cita (Kosongkan jika tidak ada)</label>
                <textarea
                  rows={2}
                  value={beritaDuka}
                  onChange={(e) => setBeritaDuka(e.target.value)}
                  placeholder="Informasi berpulang jemaat..."
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan Warta</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
