'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { CLASS_MEETING_LIST } from '@/lib/initialData';
import { ClassMeetingName } from '@/lib/types';
import { 
  Network, 
  Users, 
  MapPin, 
  Calendar, 
  Phone, 
  UserCheck, 
  ChevronRight, 
  Search,
  Sparkles
} from 'lucide-react';

export const ClassMeetingView: React.FC = () => {
  const { jemaatList, currentUser } = useApp();
  const [selectedCM, setSelectedCM] = useState<ClassMeetingName | null>(
    currentUser?.classMeeting || 'Andreas'
  );
  const [searchMember, setSearchMember] = useState('');

  // Count members per CM
  const getMemberCount = (name: ClassMeetingName) => {
    return jemaatList.filter((j) => j.classMeeting === name).length;
  };

  // Current selected CM info
  const activeCMGroup = CLASS_MEETING_LIST.find((c) => c.name === selectedCM) || CLASS_MEETING_LIST[0];

  // Members in selected CM
  const cmMembers = jemaatList
    .filter((j) => j.classMeeting === selectedCM)
    .filter((j) => j.namaLengkap.toLowerCase().includes(searchMember.toLowerCase()));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Network className="w-6 h-6 text-blue-800" />
          <span>Pengelompokan Class Meeting (CM)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Struktur 10 kelompok persekutuan sel jemaat GMI Immanuel Bandar Lampung
        </p>
      </div>

      {/* Grid of 10 Class Meetings */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {CLASS_MEETING_LIST.map((cm) => {
          const isSelected = selectedCM === cm.name;
          const count = getMemberCount(cm.name);

          return (
            <button
              key={cm.name}
              onClick={() => setSelectedCM(cm.name)}
              className={`p-4 rounded-2xl text-left transition-all border ${
                isSelected
                  ? 'bg-blue-800 text-white shadow-md border-blue-900 scale-[1.02]'
                  : 'bg-white text-slate-800 hover:bg-blue-50/50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
                }`}>
                  CM
                </span>
                <span className={`text-xs font-bold ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                  {count} Jemaat
                </span>
              </div>

              <h4 className="font-extrabold text-base tracking-tight">{cm.name}</h4>
              <p className={`text-[11px] truncate mt-1 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                {cm.ketua}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detail Section of Selected Class Meeting */}
      {activeCMGroup && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* CM Info Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Profil Persekutuan
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Class Meeting {activeCMGroup.name}
                </h3>
              </div>
              <div className="px-3 py-1 rounded-xl bg-blue-50 text-blue-800 font-bold text-sm">
                {getMemberCount(activeCMGroup.name)} Anggota
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeCMGroup.deskripsi}
            </p>

            <div className="space-y-3 text-xs pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <UserCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[11px]">Ketua Class Meeting</span>
                  <span className="font-bold text-slate-900">{activeCMGroup.ketua}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[11px]">Kontak WhatsApp</span>
                  <span className="font-medium text-slate-900 font-mono">{activeCMGroup.kontak}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Calendar className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[11px]">Jadwal Rutin Persekutuan</span>
                  <span className="font-medium text-slate-900">{activeCMGroup.jadwalRutin}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[11px]">Lokasi Persekutuan</span>
                  <span className="font-medium text-slate-900">{activeCMGroup.lokasiPersekutuan}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Members List of this Class Meeting */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Daftar Anggota CM {activeCMGroup.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Total {cmMembers.length} jemaat terdaftar dalam kelompok ini
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari anggota CM..."
                  value={searchMember}
                  onChange={(e) => setSearchMember(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
            </div>

            {cmMembers.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Tidak ada anggota terdaftar untuk filter ini.
              </div>
            ) : (
              <div className="space-y-2.5">
                {cmMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-100 transition flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{member.namaLengkap}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-white rounded border border-slate-200 text-slate-600">
                          {member.jenisKelamin}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                          {member.statusKeanggotaan}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        ID: <span className="font-mono">{member.nomorAnggota}</span> • Domisili: {member.alamat}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-blue-900 font-mono text-[11px] block">{member.noHp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
