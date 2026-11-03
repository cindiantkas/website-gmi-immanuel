'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { PengumumanItem } from '@/lib/types';
import { 
  Newspaper, 
  Search, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Calendar, 
  User, 
  Eye, 
  EyeOff, 
  Sparkles,
  X,
  Share2
} from 'lucide-react';

export const PengumumanView: React.FC = () => {
  const { pengumumanList, addPengumuman, updatePengumuman, deletePengumuman, currentUser } = useApp();
  const role = currentUser?.role || 'jemaat';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PengumumanItem | null>(null);
  const [viewingItem, setViewingItem] = useState<PengumumanItem | null>(null);

  const [formData, setFormData] = useState<Omit<PengumumanItem, 'id'>>({
    judul: '',
    kategori: 'Pengumuman Umum',
    isi: '',
    tanggalPublikasi: new Date().toISOString().split('T')[0],
    penulis: currentUser?.name || 'Sekretariat GMI',
    status: 'Dipublikasikan'
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      judul: '',
      kategori: 'Pengumuman Umum',
      isi: '',
      tanggalPublikasi: new Date().toISOString().split('T')[0],
      penulis: currentUser?.name || 'Sekretariat GMI',
      status: 'Dipublikasikan'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PengumumanItem) => {
    setEditingItem(item);
    setFormData({
      judul: item.judul,
      kategori: item.kategori,
      isi: item.isi,
      tanggalPublikasi: item.tanggalPublikasi,
      penulis: item.penulis,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updatePengumuman(editingItem.id, formData);
    } else {
      addPengumuman(formData);
    }
    setIsModalOpen(false);
  };

  // Filter list: Jemaat only sees published items!
  const visibleList = pengumumanList.filter((p) => {
    if (role === 'jemaat' && p.status === 'Draf') return false;
    const matchSearch = p.judul.toLowerCase().includes(search.toLowerCase()) || p.isi.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'all' || p.kategori === selectedCategory;
    return matchSearch && matchCategory;
  });

  const categories = [
    { id: 'all', label: 'Semua Berita' },
    { id: 'Tema & Jadwal Khotbah', label: 'Tema Khotbah' },
    { id: 'Informasi Pelayanan', label: 'Pelayanan' },
    { id: 'Pengumuman Umum', label: 'Umum' },
    { id: 'Ucapan Ulang Tahun', label: 'Ulang Tahun' },
    { id: 'Berita Duka Cita', label: 'Duka Cita' },
    { id: 'Info Penting', label: 'Penting' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-blue-800" />
            <span>Pengumuman & Warta Berita Gereja</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pusat publikasi informasi resmi jemaat GMI Immanuel Bandar Lampung
          </p>
        </div>

        {(role === 'admin' || role === 'sekretaris') && (
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>Tulis Pengumuman Baru</span>
          </button>
        )}
      </div>

      {/* Categories Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-blue-800 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Cari isi atau judul pengumuman..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
        />
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleList.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                  item.kategori === 'Berita Duka Cita'
                    ? 'bg-rose-100 text-rose-800'
                    : item.kategori === 'Ucapan Ulang Tahun'
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.kategori === 'Tema & Jadwal Khotbah'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.kategori}
                </span>

                <div className="flex items-center gap-1.5">
                  {role !== 'jemaat' && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'Dipublikasikan' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.status}
                    </span>
                  )}

                  {(role === 'admin' || role === 'sekretaris') && (
                    <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1 text-slate-400 hover:text-blue-800"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus pengumuman "${item.judul}"?`)) {
                            deletePengumuman(item.id);
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

              <h3 
                onClick={() => {
                  setViewingItem(item);
                  setIsDetailModalOpen(true);
                }}
                className="font-bold text-slate-900 text-base leading-snug cursor-pointer hover:text-blue-800 transition line-clamp-2"
              >
                {item.judul}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed whitespace-pre-line">
                {item.isi}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.tanggalPublikasi}</span>
              </div>
              <button
                onClick={() => {
                  setViewingItem(item);
                  setIsDetailModalOpen(true);
                }}
                className="text-blue-700 hover:text-blue-900 font-semibold"
              >
                Baca Lengkap &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL MODAL BACA PENGUMUMAN */}
      {isDetailModalOpen && viewingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                  {viewingItem.kategori}
                </span>
                <p className="text-xs text-slate-400 mt-1">{viewingItem.tanggalPublikasi} • Oleh: {viewingItem.penulis}</p>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {viewingItem.judul}
            </h3>

            <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed max-h-96 overflow-y-auto pr-2">
              {viewingItem.isi}
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORM MODAL ADD / EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingItem ? 'Edit Pengumuman' : 'Buat Pengumuman Baru'}
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
                  Judul Pengumuman *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan judul..."
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Informasi
                  </label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value as any })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  >
                    <option value="Berita Duka Cita">Berita Duka Cita</option>
                    <option value="Ucapan Ulang Tahun">Ucapan Ulang Tahun</option>
                    <option value="Pengumuman Umum">Pengumuman Umum</option>
                    <option value="Dokumentasi Kegiatan">Dokumentasi Kegiatan</option>
                    <option value="Informasi Pelayanan">Informasi Pelayanan</option>
                    <option value="Tema & Jadwal Khotbah">Tema & Jadwal Khotbah</option>
                    <option value="Info Penting">Info Penting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Status Publikasi
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Draf' | 'Dipublikasikan' })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  >
                    <option value="Dipublikasikan">Dipublikasikan (Jemaat dapat melihat)</option>
                    <option value="Draf">Draf (Hanya Admin)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Isi Pengumuman *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Tuliskan isi pengumuman lengkap..."
                  value={formData.isi}
                  onChange={(e) => setFormData({ ...formData, isi: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 leading-relaxed"
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
                  Simpan & Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
