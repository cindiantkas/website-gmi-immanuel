'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { KhotbahItem } from '@/lib/types';
import { 
  Calendar, 
  BookOpen, 
  Clock, 
  User, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  MapPin, 
  Sparkles,
  X
} from 'lucide-react';

export const JadwalIbadahView: React.FC = () => {
  const { khotbahList, addKhotbah, updateKhotbah, deleteKhotbah, currentUser } = useApp();
  const role = currentUser?.role || 'jemaat';

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKhotbah, setEditingKhotbah] = useState<KhotbahItem | null>(null);

  const [formData, setFormData] = useState<Omit<KhotbahItem, 'id'>>({
    tanggal: '',
    tema: '',
    ayatAlkitab: '',
    pelayanFirman: '',
    keterangan: '',
    status: 'Dikonfirmasi'
  });

  const handleOpenAdd = () => {
    setEditingKhotbah(null);
    setFormData({
      tanggal: 'Minggu, 1 November 2026',
      tema: '',
      ayatAlkitab: '',
      pelayanFirman: 'Pdt. Johanes Supard, M.Th',
      keterangan: 'Ibadah Minggu Pembuka Bulan',
      status: 'Dikonfirmasi'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: KhotbahItem) => {
    setEditingKhotbah(item);
    setFormData({
      tanggal: item.tanggal,
      tema: item.tema,
      ayatAlkitab: item.ayatAlkitab,
      pelayanFirman: item.pelayanFirman,
      keterangan: item.keterangan || '',
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingKhotbah) {
      updateKhotbah(editingKhotbah.id, formData);
    } else {
      addKhotbah(formData);
    }
    setIsModalOpen(false);
  };

  // Regular service hours
  const regularServices = [
    {
      nama: 'Ibadah Raya I',
      hari: 'Setiap Hari Minggu',
      waktu: '06:30 - 08:00 WIB',
      tempat: 'Gedung Gereja Utama Lt. 1',
      bahasa: 'Bahasa Indonesia',
      pelayan: 'Pdt. Jemaat & Majelis'
    },
    {
      nama: 'Ibadah Raya II & Live Streaming',
      hari: 'Setiap Hari Minggu',
      waktu: '09:00 - 11:00 WIB',
      tempat: 'Gedung Gereja Utama Lt. 1 & Youtube',
      bahasa: 'Bahasa Indonesia & Liturgi Methodist',
      pelayan: 'Pdt. Jemaat & Paduan Suara'
    },
    {
      nama: 'Sekolah Minggu Anak (SMMI)',
      hari: 'Setiap Hari Minggu',
      waktu: '09:00 - 10:30 WIB',
      tempat: 'Ruang Kelas Anak Lt. 2',
      bahasa: 'Bahasa Indonesia',
      pelayan: 'Guru-guru Sekolah Minggu'
    },
    {
      nama: 'Ibadah Pemuda & Remaja (P3MI)',
      hari: 'Setiap Hari Sabtu',
      waktu: '19:00 - 21:00 WIB',
      tempat: 'Ruang Pemuda Lt. 3',
      bahasa: 'Bahasa Indonesia (Praise & Worship)',
      pelayan: 'Pengurus P3MI & Tim Musik'
    },
    {
      nama: 'Persekutuan Doa Pagi',
      hari: 'Setiap Hari Rabu',
      waktu: '05:30 - 06:30 WIB',
      tempat: 'Ruang Konsistori',
      bahasa: 'Bahasa Indonesia',
      pelayan: 'Diaken & Tim Doa Syafaat'
    },
    {
      nama: 'Ibadah Kaum Lansia (Usindah)',
      hari: 'Setiap Hari Kamis (Pekan II & IV)',
      waktu: '10:00 - 12:00 WIB',
      tempat: 'Aula Serbaguna GMI',
      bahasa: 'Bahasa Indonesia',
      pelayan: 'Komisi Usia Indah'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-800" />
            <span>Jadwal Ibadah & Tema Khotbah</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Informasi tema khotbah, ayat Alkitab, dan pelayan firman resmi GMI Immanuel Bandar Lampung
          </p>
        </div>

        {role === 'admin' && (
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>Tambah Jadwal Khotbah</span>
          </button>
        )}
      </div>

      {/* Featured: Tema Khotbah Bulan Ini */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
              Bulan Keluarga & Tema Bulanan
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              Daftar Khotbah & Pelayan Firman — Oktober 2026
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Terverifikasi & Dikonfirmasi oleh Gembala Jemaat
          </span>
        </div>

        {/* 4 Sunday Sermons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {khotbahList.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-blue-100 hover:border-blue-300 transition-all shadow-xs space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-900 bg-white px-3 py-1 rounded-full shadow-xs border border-slate-200">
                  {item.tanggal}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.status}
                  </span>

                  {role === 'admin' && (
                    <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1 rounded text-slate-500 hover:text-blue-700 hover:bg-white"
                        title="Edit Khotbah"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Hapus jadwal khotbah ini?')) {
                            deleteKhotbah(item.id);
                          }
                        }}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-white"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Tema Khotbah:
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 leading-snug">
                  &ldquo;{item.tema}&rdquo;
                </h4>
              </div>

              <div className="pt-2 border-t border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-slate-500">Nas Alkitab:</span>
                  <span className="font-bold text-blue-950 bg-white px-2 py-0.5 rounded border border-slate-200">{item.ayatAlkitab}</span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-700 shrink-0" />
                  <span className="text-slate-500">Pelayan Firman:</span>
                  <span className="font-bold text-slate-900">{item.pelayanFirman}</span>
                </div>

                {item.keterangan && (
                  <div className="text-[11px] text-amber-800 bg-amber-50/70 p-2 rounded-lg border border-amber-200/60 mt-1">
                    * {item.keterangan}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Routine Services Schedule Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-lg font-bold text-slate-900">
            Jadwal Ibadah Rutin Mingguan & Pelayanan Kategorial
          </h3>
          <p className="text-xs text-slate-500">
            Waktu ibadah tetap yang berlangsung di lingkungan GMI Immanuel Bandar Lampung
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {regularServices.map((service, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                  {service.hari}
                </span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-700" />
                  <span>{service.waktu}</span>
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm">{service.nama}</h4>

              <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-200/60">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{service.tempat}</span>
                </div>
                <div className="text-slate-500 text-[11px]">
                  Pelayan: <strong className="text-slate-700">{service.pelayan}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL ADD / EDIT KHOTBAH */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingKhotbah ? 'Edit Jadwal Khotbah' : 'Tambah Jadwal Khotbah Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hari & Tanggal *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Minggu, 1 November 2026"
                  value={formData.tanggal}
                  onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tema Khotbah *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan tema khotbah..."
                  value={formData.tema}
                  onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ayat Alkitab *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Roma 12:18"
                    value={formData.ayatAlkitab}
                    onChange={(e) => setFormData({ ...formData, ayatAlkitab: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pelayan Firman *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Pendeta / Pengkhotbah"
                    value={formData.pelayanFirman}
                    onChange={(e) => setFormData({ ...formData, pelayanFirman: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Keterangan Tambahan (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Minggu P3MI / Perjamuan Kudus"
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
