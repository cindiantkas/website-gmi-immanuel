'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { JemaatItem, ClassMeetingName, KeanggotaanStatus } from '@/lib/types';
import { CLASS_MEETING_LIST } from '@/lib/initialData';
import { 
  Users, 
  Search, 
  Filter, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  X,
  FileSpreadsheet
} from 'lucide-react';

export const DataJemaatView: React.FC = () => {
  const { jemaatList, addJemaat, updateJemaat, deleteJemaat, currentUser, showToast } = useApp();
  const role = currentUser?.role || 'jemaat';

  // Filters & Search
  const [search, setSearch] = useState('');
  const [cmFilter, setCmFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedJemaat, setSelectedJemaat] = useState<JemaatItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<JemaatItem, 'id' | 'createdAt'>>({
    nomorAnggota: '',
    namaLengkap: '',
    jenisKelamin: 'L',
    tempatLahir: 'Bandar Lampung',
    tanggalLahir: '1990-01-01',
    alamat: '',
    noHp: '',
    classMeeting: 'Andreas',
    statusKeanggotaan: 'Jemaat Penuh',
    statusPernikahan: 'Belum Menikah',
    golonganDarah: 'O',
    tanggalBaptis: '',
    tanggalSidi: '',
    namaKeluarga: '',
    hubunganKeluarga: 'Kepala Keluarga',
    pekerjaan: ''
  });

  // Filtered List
  const filteredJemaat = jemaatList.filter((j) => {
    const matchSearch = 
      j.namaLengkap.toLowerCase().includes(search.toLowerCase()) ||
      j.nomorAnggota.toLowerCase().includes(search.toLowerCase()) ||
      j.alamat.toLowerCase().includes(search.toLowerCase());
    
    const matchCM = cmFilter === 'all' || j.classMeeting === cmFilter;
    const matchStatus = statusFilter === 'all' || j.statusKeanggotaan === statusFilter;

    return matchSearch && matchCM && matchStatus;
  });

  // Open Add modal with auto-generated ID
  const handleOpenAdd = () => {
    // Generate next member ID
    const nextNum = jemaatList.length + 1;
    const newId = `GMI-2026-${String(nextNum).padStart(3, '0')}`;

    setSelectedJemaat(null);
    setFormData({
      nomorAnggota: newId,
      namaLengkap: '',
      jenisKelamin: 'L',
      tempatLahir: 'Bandar Lampung',
      tanggalLahir: '1990-01-01',
      alamat: '',
      noHp: '',
      classMeeting: 'Andreas',
      statusKeanggotaan: 'Jemaat Penuh',
      statusPernikahan: 'Belum Menikah',
      golonganDarah: 'O',
      tanggalBaptis: '',
      tanggalSidi: '',
      namaKeluarga: '',
      hubunganKeluarga: 'Kepala Keluarga',
      pekerjaan: ''
    });
    setIsFormModalOpen(true);
  };

  // Open Edit modal
  const handleOpenEdit = (jemaat: JemaatItem) => {
    setSelectedJemaat(jemaat);
    setFormData({
      nomorAnggota: jemaat.nomorAnggota,
      namaLengkap: jemaat.namaLengkap,
      jenisKelamin: jemaat.jenisKelamin,
      tempatLahir: jemaat.tempatLahir,
      tanggalLahir: jemaat.tanggalLahir,
      alamat: jemaat.alamat,
      noHp: jemaat.noHp,
      classMeeting: jemaat.classMeeting,
      statusKeanggotaan: jemaat.statusKeanggotaan,
      statusPernikahan: jemaat.statusPernikahan,
      golonganDarah: jemaat.golonganDarah || 'O',
      tanggalBaptis: jemaat.tanggalBaptis || '',
      tanggalSidi: jemaat.tanggalSidi || '',
      namaKeluarga: jemaat.namaKeluarga || '',
      hubunganKeluarga: jemaat.hubunganKeluarga || 'Kepala Keluarga',
      pekerjaan: jemaat.pekerjaan || ''
    });
    setIsFormModalOpen(true);
  };

  // Save form
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaLengkap.trim()) {
      showToast('Nama lengkap wajib diisi!', 'warning');
      return;
    }

    if (selectedJemaat) {
      updateJemaat(selectedJemaat.id, formData);
    } else {
      addJemaat(formData);
    }
    setIsFormModalOpen(false);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Nomor Anggota', 'Nama Lengkap', 'Jenis Kelamin', 'Class Meeting', 'Status Keanggotaan', 'No HP', 'Alamat', 'Tgl Lahir'];
    const rows = filteredJemaat.map((j) => [
      j.nomorAnggota,
      `"${j.namaLengkap}"`,
      j.jenisKelamin,
      j.classMeeting,
      j.statusKeanggotaan,
      j.noHp,
      `"${j.alamat}"`,
      j.tanggalLahir
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data_jemaat_gmi_immanuel_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Data jemaat berhasil diekspor ke file CSV.', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-800" />
            <span>Basis Data Jemaat Terpadu</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Kelola data jemaat, pengelompokan Class Meeting, dan riwayat administrasi gereja
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Ekspor CSV</span>
          </button>

          {(role === 'admin' || role === 'sekretaris') && (
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Tambah Jemaat Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Cari nama jemaat, no anggota, alamat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Class Meeting Filter */}
          <select
            value={cmFilter}
            onChange={(e) => setCmFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Class Meeting</option>
            {CLASS_MEETING_LIST.map((cm) => (
              <option key={cm.name} value={cm.name}>
                CM {cm.name}
              </option>
            ))}
          </select>

          {/* Membership Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Status Keanggotaan</option>
            <option value="Jemaat Penuh">Jemaat Penuh</option>
            <option value="Katekisasi">Katekisasi</option>
            <option value="Pemuda/i">Pemuda/i</option>
            <option value="Lansia (Usindah)">Lansia (Usindah)</option>
            <option value="Simpatisan">Simpatisan</option>
          </select>
        </div>
      </div>

      {/* Jemaat Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredJemaat.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">Data jemaat tidak ditemukan</p>
            <p className="text-xs text-slate-400 mt-1">Coba sesuaikan filter pencarian Anda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">No. Anggota</th>
                  <th className="py-3.5 px-4">Nama Lengkap & Kontak</th>
                  <th className="py-3.5 px-4">Class Meeting</th>
                  <th className="py-3.5 px-4">Status Anggota</th>
                  <th className="py-3.5 px-4">Domisili</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredJemaat.map((jemaat) => (
                  <tr key={jemaat.id} className="hover:bg-blue-50/30 transition">
                    
                    {/* Nomor Anggota */}
                    <td className="py-4 px-4 sm:px-6 font-mono font-bold text-blue-950">
                      {jemaat.nomorAnggota}
                    </td>

                    {/* Nama & Kontak */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{jemaat.namaLengkap}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                          {jemaat.jenisKelamin}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{jemaat.noHp}</span>
                      </div>
                    </td>

                    {/* Class Meeting */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-100 text-blue-900 border border-blue-200">
                        CM {jemaat.classMeeting}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        jemaat.statusKeanggotaan === 'Jemaat Penuh'
                          ? 'bg-emerald-100 text-emerald-800'
                          : jemaat.statusKeanggotaan === 'Lansia (Usindah)'
                          ? 'bg-amber-100 text-amber-800'
                          : jemaat.statusKeanggotaan === 'Pemuda/i'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {jemaat.statusKeanggotaan}
                      </span>
                    </td>

                    {/* Domisili */}
                    <td className="py-4 px-4 text-slate-600 max-w-xs truncate">
                      {jemaat.alamat}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right space-x-1 whitespace-nowrap">
                      {/* View Detail */}
                      <button
                        onClick={() => {
                          setSelectedJemaat(jemaat);
                          setIsDetailModalOpen(true);
                        }}
                        title="Lihat Detail Kartu Jemaat"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-800 hover:bg-blue-50 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit */}
                      {(role === 'admin' || role === 'sekretaris') && (
                        <button
                          onClick={() => handleOpenEdit(jemaat)}
                          title="Edit Data Jemaat"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}

                      {/* Delete */}
                      {role === 'admin' && (
                        <button
                          onClick={() => {
                            if (confirm(`Apakah Anda yakin ingin menghapus data jemaat ${jemaat.namaLengkap}?`)) {
                              deleteJemaat(jemaat.id);
                            }
                          }}
                          title="Hapus Data Jemaat"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {isDetailModalOpen && selectedJemaat && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                  Kartu Induk Jemaat Resmi
                </span>
                <h3 className="font-bold text-slate-900 text-lg">{selectedJemaat.namaLengkap}</h3>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-500 text-xs block">Nomor Anggota</span>
                  <span className="font-bold font-mono text-slate-900">{selectedJemaat.nomorAnggota}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Class Meeting</span>
                  <span className="font-bold text-blue-900">CM {selectedJemaat.classMeeting}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Status Keanggotaan</span>
                  <span className="font-semibold text-slate-800">{selectedJemaat.statusKeanggotaan}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">Golongan Darah</span>
                  <span className="font-bold text-slate-800">{selectedJemaat.golonganDarah || '-'}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Tempat, Tanggal Lahir</span>
                  <span className="font-medium text-slate-900">{selectedJemaat.tempatLahir}, {selectedJemaat.tanggalLahir}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Alamat Domisili</span>
                  <span className="font-medium text-slate-900 text-right max-w-xs">{selectedJemaat.alamat}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Nomor Telepon / WA</span>
                  <span className="font-medium text-blue-900">{selectedJemaat.noHp}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Status Pernikahan</span>
                  <span className="font-medium text-slate-900">{selectedJemaat.statusPernikahan}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Pekerjaan</span>
                  <span className="font-medium text-slate-900">{selectedJemaat.pekerjaan || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Tanggal Baptis Kudus</span>
                  <span className="font-medium text-slate-900">{selectedJemaat.tanggalBaptis || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <span className="text-slate-500">Tanggal Pengakuan Percaya (Sidi)</span>
                  <span className="font-medium text-slate-900">{selectedJemaat.tanggalSidi || '-'}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORM MODAL (ADD / EDIT) */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="font-bold text-slate-900 text-lg">
                {selectedJemaat ? 'Ubah Data Jemaat' : 'Pendaftaran Data Jemaat Baru'}
              </h3>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Anggota *</label>
                  <input
                    type="text"
                    required
                    value={formData.nomorAnggota}
                    onChange={(e) => setFormData({ ...formData, nomorAnggota: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama sesuai KTP..."
                    value={formData.namaLengkap}
                    onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.jenisKelamin}
                    onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as 'L' | 'P' })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class Meeting (CM) *</label>
                  <select
                    value={formData.classMeeting}
                    onChange={(e) => setFormData({ ...formData, classMeeting: e.target.value as ClassMeetingName })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-blue-900"
                  >
                    {CLASS_MEETING_LIST.map((cm) => (
                      <option key={cm.name} value={cm.name}>
                        Class Meeting {cm.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    value={formData.tempatLahir}
                    onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={formData.tanggalLahir}
                    onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Kontak / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formData.noHp}
                    onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status Keanggotaan</label>
                  <select
                    value={formData.statusKeanggotaan}
                    onChange={(e) => setFormData({ ...formData, statusKeanggotaan: e.target.value as KeanggotaanStatus })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  >
                    <option value="Jemaat Penuh">Jemaat Penuh</option>
                    <option value="Katekisasi">Katekisasi</option>
                    <option value="Pemuda/i">Pemuda/i</option>
                    <option value="Lansia (Usindah)">Lansia (Usindah)</option>
                    <option value="Simpatisan">Simpatisan</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Domisili Lengkap</label>
                  <input
                    type="text"
                    placeholder="Nama Jalan, Kelurahan, Kecamatan, Bandar Lampung"
                    value={formData.alamat}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Baptis Kudus</label>
                  <input
                    type="date"
                    value={formData.tanggalBaptis}
                    onChange={(e) => setFormData({ ...formData, tanggalBaptis: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Sidi</label>
                  <input
                    type="date"
                    value={formData.tanggalSidi}
                    onChange={(e) => setFormData({ ...formData, tanggalSidi: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>

              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Simpan Data Jemaat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
