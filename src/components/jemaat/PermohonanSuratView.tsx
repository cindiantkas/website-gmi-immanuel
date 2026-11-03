'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { SuratType, ClassMeetingName } from '@/lib/types';
import { CLASS_MEETING_LIST } from '@/lib/initialData';
import { 
  Send, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const PermohonanSuratView: React.FC = () => {
  const { 
    currentUser, 
    permohonanList, 
    ajukanPermohonanJemaat, 
    prosesPermohonanKeSurat,
    setActiveTab
  } = useApp();

  const role = currentUser?.role || 'jemaat';

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<{
    namaJemaat: string;
    noHp: string;
    classMeeting: ClassMeetingName;
    jenisSurat: SuratType;
    keperluan: string;
  }>({
    namaJemaat: currentUser?.name || '',
    noHp: currentUser?.phone || '0852-9876-5432',
    classMeeting: currentUser?.classMeeting || 'Andreas',
    jenisSurat: 'Surat Keterangan Jemaat',
    keperluan: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaJemaat || !formData.keperluan) return;

    ajukanPermohonanJemaat(formData);
    setIsFormOpen(false);
    setFormData({
      ...formData,
      keperluan: ''
    });
  };

  const handleProses = (id: string) => {
    const created = prosesPermohonanKeSurat(id);
    if (created) {
      setActiveTab('persuratan');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Send className="w-6 h-6 text-blue-800" />
            <span>Pengajuan Permohonan Surat Jemaat</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Layanan pengajuan surat resmi gereja online untuk kemudahan anggota jemaat
          </p>
        </div>

        {role === 'jemaat' && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Ajukan Surat Baru</span>
          </button>
        )}
      </div>

      {/* Info Banner for Jemaat */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-900 to-blue-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Alur Pelayanan Persuratan GMI:</span>
          </div>
          <p className="text-xs sm:text-sm text-blue-200">
            Jemaat mengajukan permohonan &rarr; Sekretaris memproses draf resmi &rarr; Pendeta memverifikasi & menandatangani &rarr; Surat siap dicetak / diambil.
          </p>
        </div>
      </div>

      {/* List of Submitted Requests */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            Daftar Permohonan Surat Masuk
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Total {permohonanList.length} Permohonan
          </span>
        </div>

        {permohonanList.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            Belum ada permohonan surat yang diajukan.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {permohonanList.map((perm) => (
              <div
                key={perm.id}
                className="p-5 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 text-xs">
                      {perm.jenisSurat}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Diajukan: {perm.tanggalDiajukan}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">
                    {perm.namaJemaat} <span className="text-xs font-normal text-slate-500">(CM {perm.classMeeting})</span>
                  </h4>

                  <p className="text-slate-600 text-xs">
                    <strong>Keperluan:</strong> {perm.keperluan}
                  </p>

                  <div className="text-[11px] text-slate-500 font-mono">
                    Kontak WA: {perm.noHp}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    perm.status === 'Selesai'
                      ? 'bg-emerald-100 text-emerald-800'
                      : perm.status === 'Diproses Sekretaris'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {perm.status}
                  </span>

                  {(role === 'sekretaris' || role === 'admin') && perm.status !== 'Selesai' && (
                    <button
                      onClick={() => handleProses(perm.id)}
                      className="px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                    >
                      <span>Proses Jadi Draf Surat</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FORM MODAL PENGAJUAN SURAT JEMAAT */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="border-b pb-3">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                Portal Jemaat GMI
              </span>
              <h3 className="font-bold text-slate-900 text-lg">
                Formulir Pengajuan Surat Jemaat
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Pemohon *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama lengkap sesuai KTP..."
                  value={formData.namaJemaat}
                  onChange={(e) => setFormData({ ...formData, namaJemaat: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formData.noHp}
                    onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Class Meeting (CM)
                  </label>
                  <select
                    value={formData.classMeeting}
                    onChange={(e) => setFormData({ ...formData, classMeeting: e.target.value as ClassMeetingName })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  >
                    {CLASS_MEETING_LIST.map((cm) => (
                      <option key={cm.name} value={cm.name}>
                        CM {cm.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pilih Jenis Surat yang Diperlukan *
                </label>
                <select
                  value={formData.jenisSurat}
                  onChange={(e) => setFormData({ ...formData, jenisSurat: e.target.value as SuratType })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-semibold text-blue-900"
                >
                  <option value="Surat Keterangan Jemaat">Surat Keterangan Jemaat</option>
                  <option value="Surat Baptisan">Surat Baptisan</option>
                  <option value="Surat Rekomendasi">Surat Rekomendasi</option>
                  <option value="Surat Keterangan Pernikahan">Surat Keterangan Pernikahan</option>
                  <option value="Surat Undangan Kegiatan">Surat Undangan Kegiatan</option>
                  <option value="Surat Tugas Pelayanan">Surat Tugas Pelayanan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Maksud / Keperluan Pembuatan Surat *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Contoh: Diperlukan untuk kelengkapan administrasi mutasi dinas ke kantor cabang Bandung..."
                  value={formData.keperluan}
                  onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirimkan ke Sekretaris</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
