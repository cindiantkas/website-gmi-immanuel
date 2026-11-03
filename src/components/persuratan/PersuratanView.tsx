'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { SuratItem, SuratType, SuratStatus, ClassMeetingName } from '@/lib/types';
import { CLASS_MEETING_LIST } from '@/lib/initialData';
import { SuratDocument } from './SuratDocument';
import { 
  FileText, 
  PlusCircle, 
  Search, 
  Filter, 
  Printer, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Send, 
  Edit3, 
  Trash2, 
  Archive, 
  ChevronRight, 
  Clock, 
  History,
  X,
  Sparkles
} from 'lucide-react';

export const PersuratanView: React.FC = () => {
  const { 
    suratList, 
    jemaatList, 
    currentUser, 
    createSurat, 
    updateSurat, 
    ajukanSurat, 
    setujuiSurat, 
    revisiSurat, 
    tolakSurat, 
    arsipkanSurat, 
    deleteSurat,
    generateNomorSurat,
    showToast
  } = useApp();

  const role = currentUser?.role || 'jemaat';

  // State
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'preview'>('list');
  const [selectedSurat, setSelectedSurat] = useState<SuratItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Revision Modal State
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');

  // Form State for New / Edit Letter
  const [formData, setFormData] = useState<{
    id?: string;
    jenisSurat: SuratType;
    nomorSurat: string;
    tanggalSurat: string;
    perihal: string;
    lampiran: string;
    namaJemaat: string;
    nomorAnggota: string;
    classMeeting: ClassMeetingName;
    tempatLahir: string;
    tanggalLahir: string;
    alamat: string;
    noHp: string;
    tujuanSurat: string;
    keperluan: string;
    tanggalBaptis: string;
    namaPendetaBaptis: string;
    nomorStbBaptis: string;
    namaPasangan: string;
    tanggalPernikahan: string;
    gerejaTujuan: string;
    namaKegiatan: string;
    tanggalKegiatan: string;
    waktuKegiatan: string;
    tempatKegiatan: string;
    peranPelayanan: string;
    isiSuratKhusus: string;
  }>({
    jenisSurat: 'Surat Keterangan Jemaat',
    nomorSurat: '',
    tanggalSurat: new Date().toISOString().split('T')[0],
    perihal: 'Surat Keterangan Keanggotaan Jemaat',
    lampiran: '-',
    namaJemaat: '',
    nomorAnggota: '',
    classMeeting: 'Andreas',
    tempatLahir: 'Bandar Lampung',
    tanggalLahir: '1995-01-01',
    alamat: '',
    noHp: '',
    tujuanSurat: 'Pihak yang Berkepentingan',
    keperluan: '',
    tanggalBaptis: '',
    namaPendetaBaptis: 'Pdt. Johanes Supard, M.Th',
    nomorStbBaptis: '',
    namaPasangan: '',
    tanggalPernikahan: '',
    gerejaTujuan: '',
    namaKegiatan: '',
    tanggalKegiatan: '',
    waktuKegiatan: '',
    tempatKegiatan: '',
    peranPelayanan: '',
    isiSuratKhusus: ''
  });

  // Filter letters
  const filteredSurat = suratList.filter((s) => {
    const matchesSearch = 
      s.nomorSurat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.namaJemaat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.perihal.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesType = typeFilter === 'all' || s.jenisSurat === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Handle opening New Letter Form
  const handleOpenCreate = (type: SuratType = 'Surat Keterangan Jemaat') => {
    const newNo = generateNomorSurat(type);
    setFormData({
      jenisSurat: type,
      nomorSurat: newNo,
      tanggalSurat: new Date().toISOString().split('T')[0],
      perihal: `Surat Resmi ${type}`,
      lampiran: '-',
      namaJemaat: '',
      nomorAnggota: '',
      classMeeting: 'Andreas',
      tempatLahir: 'Bandar Lampung',
      tanggalLahir: '1995-01-01',
      alamat: '',
      noHp: '',
      tujuanSurat: 'Pihak yang Berkepentingan',
      keperluan: '',
      tanggalBaptis: '',
      namaPendetaBaptis: 'Pdt. Johanes Supard, M.Th',
      nomorStbBaptis: '',
      namaPasangan: '',
      tanggalPernikahan: '',
      gerejaTujuan: '',
      namaKegiatan: '',
      tanggalKegiatan: '',
      waktuKegiatan: '',
      tempatKegiatan: '',
      peranPelayanan: '',
      isiSuratKhusus: ''
    });
    setViewMode('create');
  };

  // Change letter type in form
  const handleTypeChange = (newType: SuratType) => {
    const newNo = generateNomorSurat(newType);
    setFormData((prev) => ({
      ...prev,
      jenisSurat: newType,
      nomorSurat: newNo,
      perihal: `Surat Resmi ${newType}`
    }));
  };

  // Auto-populate when member is picked from registered list
  const handlePickMember = (nama: string) => {
    const member = jemaatList.find((j) => j.namaLengkap === nama);
    if (member) {
      setFormData((prev) => ({
        ...prev,
        namaJemaat: member.namaLengkap,
        nomorAnggota: member.nomorAnggota,
        classMeeting: member.classMeeting,
        tempatLahir: member.tempatLahir,
        tanggalLahir: member.tanggalLahir,
        alamat: member.alamat,
        noHp: member.noHp,
        tanggalBaptis: member.tanggalBaptis || ''
      }));
      showToast(`Data jemaat ${member.namaLengkap} otomatis diisikan.`, 'info');
    }
  };

  // Save new letter
  const handleSaveSurat = (asDraft: boolean = false) => {
    if (!formData.namaJemaat || !formData.tujuanSurat) {
      showToast('Harap lengkapi nama jemaat dan tujuan surat.', 'warning');
      return;
    }

    const initialStatus: SuratStatus = asDraft ? 'Draf' : 'Menunggu Pemeriksaan';

    const created = createSurat({
      nomorSurat: formData.nomorSurat,
      jenisSurat: formData.jenisSurat,
      tanggalSurat: formData.tanggalSurat,
      perihal: formData.perihal,
      lampiran: formData.lampiran,
      status: initialStatus,
      dibuatOleh: currentUser?.name || 'Sekretaris',
      namaJemaat: formData.namaJemaat,
      nomorAnggota: formData.nomorAnggota,
      classMeeting: formData.classMeeting,
      tempatLahir: formData.tempatLahir,
      tanggalLahir: formData.tanggalLahir,
      alamat: formData.alamat,
      noHp: formData.noHp,
      tujuanSurat: formData.tujuanSurat,
      keperluan: formData.keperluan,
      tanggalBaptis: formData.tanggalBaptis,
      namaPendetaBaptis: formData.namaPendetaBaptis,
      nomorStbBaptis: formData.nomorStbBaptis,
      namaPasangan: formData.namaPasangan,
      tanggalPernikahan: formData.tanggalPernikahan,
      gerejaTujuan: formData.gerejaTujuan,
      namaKegiatan: formData.namaKegiatan,
      tanggalKegiatan: formData.tanggalKegiatan,
      waktuKegiatan: formData.waktuKegiatan,
      tempatKegiatan: formData.tempatKegiatan,
      peranPelayanan: formData.peranPelayanan,
      isiSuratKhusus: formData.isiSuratKhusus
    });

    setSelectedSurat(created);
    setViewMode('preview');
  };

  // Status Badge Component
  const renderStatusBadge = (status: SuratStatus) => {
    switch (status) {
      case 'Draf':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">Draf</span>;
      case 'Menunggu Pemeriksaan':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1"><Clock className="w-3 h-3" /> Menunggu Persetujuan</span>;
      case 'Perlu Revisi':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Perlu Revisi</span>;
      case 'Disetujui':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Disetujui</span>;
      case 'Ditolak':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 flex items-center gap-1"><XCircle className="w-3 h-3" /> Ditolak</span>;
      case 'Selesai / Diarsipkan':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1"><Archive className="w-3 h-3" /> Diarsipkan</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Persuratan Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-800" />
            <span>Manajemen Persuratan Resmi</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Buat, verifikasi, setujui, dan cetak dokumen resmi GMI Immanuel Bandar Lampung
          </p>
        </div>

        {viewMode === 'list' && (role === 'sekretaris' || role === 'admin') && (
          <button
            onClick={() => handleOpenCreate()}
            className="px-4 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-semibold text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>Buat Surat Baru</span>
          </button>
        )}

        {viewMode !== 'list' && (
          <button
            onClick={() => setViewMode('list')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition flex items-center gap-1.5"
          >
            <span>&larr; Kembali ke Daftar Surat</span>
          </button>
        )}
      </div>

      {/* VIEW: LIST OF LETTERS */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          
          {/* Search & Filter Toolbar */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between no-print">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Cari nomor surat, nama jemaat, perihal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Status</option>
                <option value="Menunggu Pemeriksaan">Menunggu Persetujuan</option>
                <option value="Perlu Revisi">Perlu Revisi</option>
                <option value="Disetujui">Disetujui</option>
                <option value="Draf">Draf</option>
                <option value="Selesai / Diarsipkan">Arsip</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Jenis Surat</option>
                <option value="Surat Keterangan Jemaat">Surat Keterangan Jemaat</option>
                <option value="Surat Baptisan">Surat Baptisan</option>
                <option value="Surat Rekomendasi">Surat Rekomendasi</option>
                <option value="Surat Undangan Kegiatan">Surat Undangan Kegiatan</option>
                <option value="Surat Tugas Pelayanan">Surat Tugas Pelayanan</option>
                <option value="Surat Keterangan Pernikahan">Surat Keterangan Pernikahan</option>
              </select>
            </div>

          </div>

          {/* Letters Table / Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            {filteredSurat.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="font-semibold text-slate-700">Tidak ada surat ditemukan</p>
                <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter status.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="py-3.5 px-4 sm:px-6">Nomor & Tanggal</th>
                      <th className="py-3.5 px-4">Jenis Surat & Perihal</th>
                      <th className="py-3.5 px-4">Nama Jemaat / Pihak</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {filteredSurat.map((surat) => (
                      <tr 
                        key={surat.id}
                        className="hover:bg-blue-50/30 transition group"
                      >
                        {/* Nomor & Tanggal */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="font-bold font-mono text-slate-900">{surat.nomorSurat}</div>
                          <div className="text-[11px] text-slate-500">{surat.tanggalSurat}</div>
                        </td>

                        {/* Jenis Surat & Perihal */}
                        <td className="py-4 px-4">
                          <div className="font-semibold text-blue-900">{surat.jenisSurat}</div>
                          <div className="text-xs text-slate-500 line-clamp-1">{surat.perihal}</div>
                          {surat.catatanRevisi && surat.status === 'Perlu Revisi' && (
                            <div className="mt-1 text-[11px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              Catatan Revisi: {surat.catatanRevisi}
                            </div>
                          )}
                        </td>

                        {/* Nama Jemaat */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-800">{surat.namaJemaat}</div>
                          <div className="text-[11px] text-slate-500">
                            {surat.classMeeting ? `CM ${surat.classMeeting}` : 'Umum'}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          {renderStatusBadge(surat.status)}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 sm:px-6 text-right space-x-1.5 whitespace-nowrap">
                          {/* Preview / Print */}
                          <button
                            onClick={() => {
                              setSelectedSurat(surat);
                              setViewMode('preview');
                            }}
                            title="Pratinjau & Cetak Surat"
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition inline-flex items-center gap-1 text-xs font-semibold px-2.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Lihat</span>
                          </button>

                          {/* Pendeta Actions */}
                          {role === 'pendeta' && surat.status === 'Menunggu Pemeriksaan' && (
                            <>
                              <button
                                onClick={() => setujuiSurat(surat.id)}
                                title="Setujui Surat Resmi"
                                className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition inline-flex items-center gap-1 text-xs font-semibold px-2.5"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Setujui</span>
                              </button>

                              <button
                                onClick={() => {
                                  setSelectedSurat(surat);
                                  setIsRevisionModalOpen(true);
                                }}
                                title="Minta Revisi ke Sekretaris"
                                className="p-1.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition inline-flex items-center gap-1 text-xs font-semibold px-2"
                              >
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>Revisi</span>
                              </button>
                            </>
                          )}

                          {/* Sekretaris Actions */}
                          {role === 'sekretaris' && (surat.status === 'Draf' || surat.status === 'Perlu Revisi') && (
                            <button
                              onClick={() => ajukanSurat(surat.id)}
                              title="Ajukan ke Pendeta"
                              className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition inline-flex items-center gap-1 text-xs font-semibold px-2.5"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Kirim</span>
                            </button>
                          )}

                          {/* Archive Action */}
                          {(role === 'admin' || role === 'sekretaris') && surat.status === 'Disetujui' && (
                            <button
                              onClick={() => arsipkanSurat(surat.id)}
                              title="Pindahkan ke Arsip"
                              className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition inline-flex items-center gap-1 text-xs px-2"
                            >
                              <Archive className="w-3.5 h-3.5" />
                              <span>Arsipkan</span>
                            </button>
                          )}

                          {/* Delete (Admin only or Sekretaris on Draft) */}
                          {(role === 'admin' || (role === 'sekretaris' && surat.status === 'Draf')) && (
                            <button
                              onClick={() => {
                                if (confirm(`Hapus surat ${surat.nomorSurat}?`)) {
                                  deleteSurat(surat.id);
                                }
                              }}
                              title="Hapus Surat"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

        </div>
      )}

      {/* VIEW: CREATE NEW LETTER */}
      {viewMode === 'create' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Formulir Pembuatan Surat Gereja</h3>
            <p className="text-xs text-slate-500">Pilih template surat resmi dan lengkapi data yang dibutuhkan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Pilih Template & Nomor Surat */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  1. Jenis Template Surat Resmi
                </label>
                <select
                  value={formData.jenisSurat}
                  onChange={(e) => handleTypeChange(e.target.value as SuratType)}
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Surat Keterangan Jemaat">1. Surat Keterangan Jemaat</option>
                  <option value="Surat Baptisan">2. Surat Baptisan</option>
                  <option value="Surat Rekomendasi">3. Surat Rekomendasi</option>
                  <option value="Surat Undangan Kegiatan">4. Surat Undangan Kegiatan</option>
                  <option value="Surat Tugas Pelayanan">5. Surat Tugas Pelayanan</option>
                  <option value="Surat Keterangan Pernikahan">6. Surat Keterangan Pernikahan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nomor Surat Otomatis (Format Resmi)
                </label>
                <input
                  type="text"
                  readOnly
                  value={formData.nomorSurat}
                  className="w-full py-2 px-3 bg-slate-100 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono font-bold text-blue-900 cursor-not-allowed"
                />
                <p className="text-[11px] text-slate-400 mt-1">Dibuat otomatis oleh generator anti-duplikat sistem.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Perihal Surat
                </label>
                <input
                  type="text"
                  value={formData.perihal}
                  onChange={(e) => setFormData({ ...formData, perihal: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tujuan Surat (Kepada Yth.)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Majelis Jemaat GKI Menteng / Pimpinan Instansi"
                  value={formData.tujuanSurat}
                  onChange={(e) => setFormData({ ...formData, tujuanSurat: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Fast Pick from registered Jemaat */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                <label className="block text-xs font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Isi Cepat dari Data Jemaat Terdaftar:</span>
                </label>
                <select
                  onChange={(e) => handlePickMember(e.target.value)}
                  className="w-full py-2 px-3 bg-white border border-blue-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
                >
                  <option value="">-- Pilih Anggota Jemaat --</option>
                  {jemaatList.map((j) => (
                    <option key={j.id} value={j.namaLengkap}>
                      {j.namaLengkap} ({j.nomorAnggota} - CM {j.classMeeting})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-blue-700 mt-1">
                  Memilih jemaat akan mengisi otomatis Nomor Anggota, TTL, Alamat, dan Class Meeting.
                </p>
              </div>

            </div>

            {/* 2. Data Subjek / Jemaat */}
            <div className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nama Lengkap Jemaat / Pihak Terkait *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap sesuai KTP / Buku Induk"
                  value={formData.namaJemaat}
                  onChange={(e) => setFormData({ ...formData, namaJemaat: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nomor Anggota Jemaat
                  </label>
                  <input
                    type="text"
                    placeholder="GMI-2026-001"
                    value={formData.nomorAnggota}
                    onChange={(e) => setFormData({ ...formData, nomorAnggota: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Class Meeting
                  </label>
                  <select
                    value={formData.classMeeting}
                    onChange={(e) => setFormData({ ...formData, classMeeting: e.target.value as ClassMeetingName })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  >
                    {CLASS_MEETING_LIST.map((cm) => (
                      <option key={cm.name} value={cm.name}>
                        {cm.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    value={formData.tempatLahir}
                    onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={formData.tanggalLahir}
                    onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Jl. ..., Bandar Lampung"
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

              {/* Dynamic Specific Fields Based on Letter Type */}
              {formData.jenisSurat === 'Surat Baptisan' && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
                  <h4 className="text-xs font-bold text-amber-900 uppercase">Data Baptisan Kudus</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tanggal Baptis</label>
                      <input
                        type="date"
                        value={formData.tanggalBaptis}
                        onChange={(e) => setFormData({ ...formData, tanggalBaptis: e.target.value })}
                        className="w-full py-1.5 px-2 bg-white border border-amber-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">No. STB Baptis</label>
                      <input
                        type="text"
                        placeholder="BPT-2009-042"
                        value={formData.nomorStbBaptis}
                        onChange={(e) => setFormData({ ...formData, nomorStbBaptis: e.target.value })}
                        className="w-full py-1.5 px-2 bg-white border border-amber-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Dilayani Oleh Pendeta</label>
                    <input
                      type="text"
                      value={formData.namaPendetaBaptis}
                      onChange={(e) => setFormData({ ...formData, namaPendetaBaptis: e.target.value })}
                      className="w-full py-1.5 px-2 bg-white border border-amber-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}

              {formData.jenisSurat === 'Surat Keterangan Pernikahan' && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase">Data Pernikahan Kudus</h4>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nama Calon Pasangan / Tunangan</label>
                    <input
                      type="text"
                      value={formData.namaPasangan}
                      onChange={(e) => setFormData({ ...formData, namaPasangan: e.target.value })}
                      className="w-full py-1.5 px-2 bg-white border border-emerald-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Rencana Tanggal Nikah</label>
                      <input
                        type="date"
                        value={formData.tanggalPernikahan}
                        onChange={(e) => setFormData({ ...formData, tanggalPernikahan: e.target.value })}
                        className="w-full py-1.5 px-2 bg-white border border-emerald-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Gereja Tujuan Pemberkatan</label>
                      <input
                        type="text"
                        placeholder="Contoh: GKI Menteng Jakarta"
                        value={formData.gerejaTujuan}
                        onChange={(e) => setFormData({ ...formData, gerejaTujuan: e.target.value })}
                        className="w-full py-1.5 px-2 bg-white border border-emerald-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.jenisSurat === 'Surat Tugas Pelayanan' && (
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-3">
                  <h4 className="text-xs font-bold text-purple-900 uppercase">Mandat & Tugas Pelayanan</h4>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Peran / Tugas Pelayanan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Pemusik Keyboardis / Delegasi Distrik"
                      value={formData.peranPelayanan}
                      onChange={(e) => setFormData({ ...formData, peranPelayanan: e.target.value })}
                      className="w-full py-1.5 px-2 bg-white border border-purple-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nama Kegiatan</label>
                      <input
                        type="text"
                        value={formData.namaKegiatan}
                        onChange={(e) => setFormData({ ...formData, namaKegiatan: e.target.value })}
                        className="w-full py-1.5 px-2 bg-white border border-purple-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tempat / Lokasi</label>
                      <input
                        type="text"
                        value={formData.tempatKegiatan}
                        onChange={(e) => setFormData({ ...formData, tempatKegiatan: e.target.value })}
                        className="w-full py-1.5 px-2 bg-white border border-purple-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Keperluan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Keperluan / Maksud Pembuatan Surat
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Kelengkapan administrasi mutasi dinas dan pendaftaran sekolah..."
                  value={formData.keperluan}
                  onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

            </div>

          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
            >
              Batal
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleSaveSurat(true)}
                className="px-4 py-2.5 rounded-xl border border-blue-800 text-blue-900 hover:bg-blue-50 text-xs font-semibold"
              >
                Simpan sebagai Draf
              </button>

              <button
                type="button"
                onClick={() => handleSaveSurat(false)}
                className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>Simpan & Ajukan ke Pendeta</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: PREVIEW & PRINT OF SELECTED LETTER */}
      {viewMode === 'preview' && selectedSurat && (
        <div className="space-y-6">
          
          {/* Action Toolbar on Preview */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm text-slate-900">
                {selectedSurat.nomorSurat}
              </span>
              {renderStatusBadge(selectedSurat.status)}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Native Print / PDF Button */}
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-xs transition"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Cetak / Unduh PDF</span>
              </button>

              {/* Pendeta Actions on Preview */}
              {role === 'pendeta' && selectedSurat.status === 'Menunggu Pemeriksaan' && (
                <>
                  <button
                    onClick={() => {
                      setujuiSurat(selectedSurat.id);
                      setSelectedSurat({ ...selectedSurat, status: 'Disetujui' });
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Setujui Surat Ini</span>
                  </button>

                  <button
                    onClick={() => setIsRevisionModalOpen(true)}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Minta Revisi</span>
                  </button>

                  <button
                    onClick={() => {
                      const reason = prompt('Masukkan alasan penolakan surat:');
                      if (reason) {
                        tolakSurat(selectedSurat.id, reason);
                        setSelectedSurat({ ...selectedSurat, status: 'Ditolak' });
                      }
                    }}
                    className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Tolak</span>
                  </button>
                </>
              )}

              {/* Sekretaris Send for review */}
              {role === 'sekretaris' && (selectedSurat.status === 'Draf' || selectedSurat.status === 'Perlu Revisi') && (
                <button
                  onClick={() => {
                    ajukanSurat(selectedSurat.id);
                    setSelectedSurat({ ...selectedSurat, status: 'Menunggu Pemeriksaan' });
                  }}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim ke Pendeta</span>
                </button>
              )}
            </div>
          </div>

          {/* If there is a revision note */}
          {selectedSurat.catatanRevisi && selectedSurat.status === 'Perlu Revisi' && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs no-print">
              <strong className="block font-bold mb-0.5">Catatan Perbaikan dari Pendeta:</strong>
              <p>{selectedSurat.catatanRevisi}</p>
            </div>
          )}

          {/* Actual Printable Physical Letter View */}
          <div className="bg-slate-200/50 p-2 sm:p-6 rounded-3xl">
            <SuratDocument surat={selectedSurat} />
          </div>

          {/* Audit Trail & History on Letter */}
          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs no-print">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-blue-700" />
              <span>Riwayat & Audit Trail Surat</span>
            </h4>
            <div className="space-y-2 text-xs">
              {selectedSurat.riwayatStatus?.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5"></span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{r.status}</span>
                      <span className="text-[11px] text-slate-400">{r.waktu}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Oleh: <strong className="text-slate-800">{r.oleh}</strong></p>
                    {r.catatan && <p className="text-slate-500 italic text-[11px] mt-1 bg-white p-1.5 rounded border border-slate-200">&ldquo;{r.catatan}&rdquo;</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Revision Modal */}
      {isRevisionModalOpen && selectedSurat && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Catatan Revisi untuk Sekretaris</span>
              </h4>
              <button
                onClick={() => setIsRevisionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Tuliskan koreksi atau catatan perbaikan yang harus dilengkapi oleh Sekretaris sebelum surat No. <strong>{selectedSurat.nomorSurat}</strong> disetujui.
            </p>

            <textarea
              rows={4}
              required
              placeholder="Contoh: Harap periksa kembali ejaan nama jemaat atau lampirkan fotokopi surat sidi..."
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsRevisionModalOpen(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!revisionNotes.trim()) {
                    showToast('Harap masukkan catatan revisi.', 'warning');
                    return;
                  }
                  revisiSurat(selectedSurat.id, revisionNotes);
                  setSelectedSurat({ ...selectedSurat, status: 'Perlu Revisi', catatanRevisi: revisionNotes });
                  setIsRevisionModalOpen(false);
                  setRevisionNotes('');
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Kirim Catatan Revisi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
