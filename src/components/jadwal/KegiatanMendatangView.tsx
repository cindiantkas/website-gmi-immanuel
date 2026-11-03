'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { KegiatanItem, KegiatanStatus } from '@/lib/types';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Filter, 
  X, 
  LayoutGrid, 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export const KegiatanMendatangView: React.FC = () => {
  const { kegiatanList, addKegiatan, updateKegiatan, deleteKegiatan, currentUser } = useApp();
  const role = currentUser?.role || 'jemaat';

  const [viewType, setViewType] = useState<'cards' | 'calendar'>('cards');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>('2026-10-25');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKegiatan, setEditingKegiatan] = useState<KegiatanItem | null>(null);

  const [formData, setFormData] = useState<Omit<KegiatanItem, 'id'>>({
    namaKegiatan: '',
    kategori: 'Ibadah Minggu',
    tanggal: new Date().toISOString().split('T')[0],
    waktu: '09:00 WIB',
    lokasi: 'Gedung Gereja GMI Immanuel',
    penanggungJawab: '',
    deskripsi: '',
    status: 'Akan Datang'
  });

  const handleOpenAdd = () => {
    setEditingKegiatan(null);
    setFormData({
      namaKegiatan: '',
      kategori: 'Ibadah Minggu',
      tanggal: new Date().toISOString().split('T')[0],
      waktu: '09:00 WIB',
      lokasi: 'Gedung Gereja GMI Immanuel Bandar Lampung',
      penanggungJawab: '',
      deskripsi: '',
      status: 'Akan Datang'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: KegiatanItem) => {
    setEditingKegiatan(item);
    setFormData({
      namaKegiatan: item.namaKegiatan,
      kategori: item.kategori,
      tanggal: item.tanggal,
      waktu: item.waktu,
      lokasi: item.lokasi,
      penanggungJawab: item.penanggungJawab,
      deskripsi: item.deskripsi,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingKegiatan) {
      updateKegiatan(editingKegiatan.id, formData);
    } else {
      addKegiatan(formData);
    }
    setIsModalOpen(false);
  };

  const filteredKegiatan = kegiatanList.filter((k) => 
    categoryFilter === 'all' || k.kategori === categoryFilter
  );

  // Calendar dates for October 2026 (starts on Thursday = offset 4, 31 days)
  const daysInOctober = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-10-${String(day).padStart(2, '0')}`;
    const dayEvents = kegiatanList.filter((k) => k.tanggal === dateStr);
    return { day, dateStr, events: dayEvents };
  });

  const selectedDateEvents = kegiatanList.filter((k) => k.tanggal === selectedCalendarDate);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span>Kegiatan & Agenda Mendatang</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Jadwal kegiatan kategorial, persekutuan doa, perayaan gereja, dan rapat pelayanan
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setViewType('cards')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                viewType === 'cards' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kartu</span>
            </button>
            <button
              onClick={() => setViewType('calendar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                viewType === 'calendar' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Kalender</span>
            </button>
          </div>

          {role === 'admin' && (
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Tambah Kegiatan</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Category Toolbar (Cards View) */}
      {viewType === 'cards' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'Semua Kategori' },
            { id: 'Ibadah Minggu', label: 'Ibadah Minggu' },
            { id: 'Persekutuan Doa Pagi', label: 'Doa Pagi' },
            { id: 'Ibadah Usindah', label: 'Usindah (Lansia)' },
            { id: 'Ibadah P3MI', label: 'P3MI (Pemuda)' },
            { id: 'Kegiatan PRMI', label: 'PRMI (Remaja)' },
            { id: 'Perayaan Natal', label: 'Perayaan Natal' },
            { id: 'Rapat & Pelayanan', label: 'Rapat Pelayanan' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                categoryFilter === cat.id
                  ? 'bg-blue-800 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* VIEW: CARDS / GRID */}
      {viewType === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredKegiatan.map((keg) => (
            <div
              key={keg.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 uppercase tracking-wide">
                    {keg.kategori}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      keg.status === 'Akan Datang' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {keg.status}
                    </span>

                    {role === 'admin' && (
                      <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(keg)}
                          className="p-1 text-slate-400 hover:text-blue-800"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus kegiatan ${keg.namaKegiatan}?`)) {
                              deleteKegiatan(keg.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {keg.namaKegiatan}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {keg.deskripsi}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <CalendarIcon className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span>{keg.tanggal}</span>
                  <span className="text-slate-400">•</span>
                  <Clock className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span>{keg.waktu}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{keg.lokasi}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">PJ: <strong className="text-slate-700">{keg.penanggungJawab}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW: INTERACTIVE CALENDAR */}
      {viewType === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Monthly Calendar Grid */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Oktober 2026</h3>
                <p className="text-xs text-slate-500">Bulan Keluarga & Kebangkitan Pelayanan</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>Kegiatan Terjadwal</span>
              </div>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 text-center font-bold text-xs text-slate-500 py-1">
              <span className="text-rose-600">Min</span>
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
            </div>

            {/* Calendar Grid (October 2026 starts on Thursday: 4 empty slots) */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {/* Empty leading days: Sun, Mon, Tue, Wed */}
              <div className="h-16 sm:h-20 bg-slate-50/50 rounded-xl"></div>
              <div className="h-16 sm:h-20 bg-slate-50/50 rounded-xl"></div>
              <div className="h-16 sm:h-20 bg-slate-50/50 rounded-xl"></div>
              <div className="h-16 sm:h-20 bg-slate-50/50 rounded-xl"></div>

              {daysInOctober.map((item) => {
                const isSelected = selectedCalendarDate === item.dateStr;
                const hasEvents = item.events.length > 0;
                const isSunday = (item.day - 4) % 7 === 0;

                return (
                  <button
                    key={item.day}
                    onClick={() => setSelectedCalendarDate(item.dateStr)}
                    className={`h-16 sm:h-20 p-1.5 sm:p-2 rounded-xl text-left border flex flex-col justify-between transition ${
                      isSelected
                        ? 'bg-blue-800 text-white border-blue-900 shadow-sm'
                        : hasEvents
                        ? 'bg-blue-50/70 border-blue-200 hover:bg-blue-100 text-slate-800'
                        : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${
                        isSelected ? 'text-white' : isSunday ? 'text-rose-600 font-extrabold' : 'text-slate-800'
                      }`}>
                        {item.day}
                      </span>
                      {hasEvents && (
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-blue-600'}`}></span>
                      )}
                    </div>

                    {hasEvents && (
                      <div className="truncate">
                        <span className={`text-[9px] font-bold block truncate leading-tight ${
                          isSelected ? 'text-blue-100' : 'text-blue-900'
                        }`}>
                          {item.events[0].namaKegiatan}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Date Agenda Details */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="border-b pb-3">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                Detail Tanggal Terpilih
              </span>
              <h3 className="font-bold text-slate-900 text-base mt-0.5">
                {selectedCalendarDate}
              </h3>
            </div>

            {selectedDateEvents.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Tidak ada kegiatan khusus yang dijadwalkan pada tanggal ini.
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateEvents.map((keg) => (
                  <div key={keg.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {keg.kategori}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{keg.namaKegiatan}</h4>
                    <p className="text-slate-600 text-xs">{keg.deskripsi}</p>
                    <div className="pt-2 border-t border-slate-200/60 text-slate-500 space-y-1 text-[11px]">
                      <div>⏰ Waktu: <strong>{keg.waktu}</strong></div>
                      <div>📍 Lokasi: <strong>{keg.lokasi}</strong></div>
                      <div>👤 Pelayan: <strong>{keg.penanggungJawab}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* MODAL ADD / EDIT KEGIATAN */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingKegiatan ? 'Edit Kegiatan Gereja' : 'Tambah Kegiatan Gereja Baru'}
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
                  Nama Kegiatan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Persekutuan Doa Pagi Sepekan"
                  value={formData.namaKegiatan}
                  onChange={(e) => setFormData({ ...formData, namaKegiatan: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Kegiatan
                  </label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value as KegiatanItem['kategori'] })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  >
                    <option value="Ibadah Minggu">Ibadah Minggu</option>
                    <option value="Persekutuan Doa Pagi">Persekutuan Doa Pagi</option>
                    <option value="Ibadah Usindah">Ibadah Usindah</option>
                    <option value="Ibadah P3MI">Ibadah P3MI</option>
                    <option value="Kegiatan PRMI">Kegiatan PRMI</option>
                    <option value="Perayaan Natal">Perayaan Natal</option>
                    <option value="Rapat & Pelayanan">Rapat & Pelayanan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Status Kegiatan
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as KegiatanStatus })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  >
                    <option value="Akan Datang">Akan Datang</option>
                    <option value="Berlangsung">Berlangsung</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tanggal (YYYY-MM-DD) *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Waktu (Format WIB) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="09:00 - 11:00 WIB"
                    value={formData.waktu}
                    onChange={(e) => setFormData({ ...formData, waktu: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lokasi Kegiatan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Gedung Utama / Aula / Ruang Doa"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Penanggung Jawab / Pelayan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama pelayan / ketua komisi"
                  value={formData.penanggungJawab}
                  onChange={(e) => setFormData({ ...formData, penanggungJawab: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deskripsi Kegiatan
                </label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan agenda dan sasaran kegiatan..."
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
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
                  Simpan Kegiatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
