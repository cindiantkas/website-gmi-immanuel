'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { INITIAL_USERS } from '@/lib/initialData';
import { User, UserRole, ClassMeetingName } from '@/lib/types';
import { CLASS_MEETING_LIST } from '@/lib/initialData';
import { 
  UserCheck, 
  ShieldCheck, 
  FileText, 
  BookOpen, 
  Users, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Lock, 
  Key,
  X
} from 'lucide-react';

export const ManajemenPenggunaView: React.FC = () => {
  const { showToast } = useApp();
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<{
    username: string;
    name: string;
    role: UserRole;
    email: string;
    phone: string;
    classMeeting?: ClassMeetingName;
  }>({
    username: '',
    name: '',
    role: 'jemaat',
    email: '',
    phone: '',
    classMeeting: 'Andreas'
  });

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({
      username: '',
      name: '',
      role: 'jemaat',
      email: '',
      phone: '',
      classMeeting: 'Andreas'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      name: user.name,
      role: user.role,
      email: user.email,
      phone: user.phone || '',
      classMeeting: user.classMeeting || 'Andreas'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.name) return;

    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)));
      showToast('Akun pengguna berhasil diperbarui.', 'success');
    } else {
      const newUser: User = {
        ...formData,
        id: `user-${Date.now()}`
      };
      setUsers([...users, newUser]);
      showToast('Akun pengguna baru berhasil ditambahkan.', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Hapus akun ${name}?`)) {
      setUsers(users.filter((u) => u.id !== id));
      showToast(`Akun ${name} telah dihapus.`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-blue-800" />
            <span>Manajemen Akun & Hak Akses Pengguna</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Atur kewenangan akses untuk Admin, Pendeta, Sekretaris Gereja, dan Jemaat
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4 text-amber-300" />
          <span>Tambah Akun Baru</span>
        </button>
      </div>

      {/* Role explanation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
          <div className="flex items-center gap-2 font-bold text-rose-900 text-xs">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <span>Peran Admin</span>
          </div>
          <p className="text-[11px] text-rose-800 leading-relaxed">
            Akses total seluruh sistem: manajemen pengguna, konfigurasi data jemaat, pengumuman, dan pengaturan.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
          <div className="flex items-center gap-2 font-bold text-blue-900 text-xs">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Peran Sekretaris</span>
          </div>
          <p className="text-[11px] text-blue-800 leading-relaxed">
            Mengelola pembuatan surat otomatis, mengedit draf, mengirim permohonan ke Pendeta, dan mencetak surat.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-xs">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Peran Pendeta</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            Memeriksa keabsahan surat gereja, menyetujui, meminta catatan revisi, atau menolak permohonan surat.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
          <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Peran Jemaat</span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            Melihat jadwal ibadah, kegiatan mendatang, warta jemaat, dan mengajukan permohonan surat online.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Nama Pengguna</th>
                <th className="py-3.5 px-4">Nama Lengkap & Kontak</th>
                <th className="py-3.5 px-4">Hak Akses (Peran)</th>
                <th className="py-3.5 px-4">Class Meeting</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-blue-50/30 transition">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-bold text-slate-900 font-mono">{u.username}</div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-800">{u.name}</div>
                    <div className="text-[11px] text-slate-500">{u.email}</div>
                  </td>

                  <td className="py-4 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      u.role === 'admin'
                        ? 'bg-rose-100 text-rose-800'
                        : u.role === 'sekretaris'
                        ? 'bg-blue-100 text-blue-800'
                        : u.role === 'pendeta'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {u.role}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-slate-600 font-medium">
                    {u.classMeeting ? `CM ${u.classMeeting}` : '-'}
                  </td>

                  <td className="py-4 px-4 sm:px-6 text-right space-x-1">
                    <button
                      onClick={() => handleOpenEdit(u)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition"
                      title="Edit Akun"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    {u.username !== 'admin' && (
                      <button
                        onClick={() => handleDelete(u.id, u.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Hapus Akun"
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
      </div>

      {/* MODAL ADD / EDIT USER */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingUser ? 'Ubah Akun Pengguna' : 'Tambah Akun Pengguna Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Pengguna (Username) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: pdt_andreas"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap & Gelar *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pdt. Andreas Sumarsono"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Peran (Role) *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
                  >
                    <option value="admin">Admin</option>
                    <option value="sekretaris">Sekretaris Gereja</option>
                    <option value="pendeta">Pendeta</option>
                    <option value="jemaat">Jemaat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Class Meeting
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@gmi.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nomor Telepon / WA
                  </label>
                  <input
                    type="text"
                    placeholder="0812-xxxx-xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                  />
                </div>
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
                  Simpan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
