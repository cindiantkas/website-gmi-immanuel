'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { 
  LayoutDashboard, 
  FileText, 
  Archive, 
  Users, 
  Network, 
  Calendar, 
  Sparkles, 
  Newspaper, 
  BookOpenText, 
  Share2, 
  BarChart3, 
  UserCheck, 
  Settings, 
  X,
  Send,
  AlertCircle
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { activeTab, setActiveTab, currentUser, suratList } = useApp();
  const role = currentUser?.role || 'jemaat';

  // Count letters waiting for approval (relevant for Pendeta & Admin)
  const waitingApprovalCount = suratList.filter((s) => s.status === 'Menunggu Pemeriksaan').length;
  // Count letters needing revision (relevant for Sekretaris)
  const revisionCount = suratList.filter((s) => s.status === 'Perlu Revisi').length;

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'sekretaris', 'pendeta', 'jemaat']
    },
    {
      id: 'persuratan',
      label: 'Persuratan',
      icon: FileText,
      roles: ['admin', 'sekretaris', 'pendeta'],
      badge: role === 'pendeta' && waitingApprovalCount > 0 ? (
        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-white rounded-full">
          {waitingApprovalCount} perlu dicek
        </span>
      ) : role === 'sekretaris' && revisionCount > 0 ? (
        <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full">
          {revisionCount} revisi
        </span>
      ) : null
    },
    {
      id: 'arsip-surat',
      label: 'Arsip Surat',
      icon: Archive,
      roles: ['admin', 'sekretaris', 'pendeta']
    },
    {
      id: 'permohonan-jemaat',
      label: 'Pengajuan Surat',
      icon: Send,
      roles: ['jemaat']
    },
    {
      id: 'data-jemaat',
      label: 'Data Jemaat',
      icon: Users,
      roles: ['admin', 'sekretaris', 'pendeta']
    },
    {
      id: 'class-meeting',
      label: 'Class Meeting',
      icon: Network,
      roles: ['admin', 'sekretaris', 'pendeta', 'jemaat']
    },
    {
      id: 'jadwal-ibadah',
      label: 'Jadwal Ibadah',
      icon: Calendar,
      roles: ['admin', 'sekretaris', 'pendeta', 'jemaat']
    },
    {
      id: 'kegiatan-mendatang',
      label: 'Kegiatan Mendatang',
      icon: Sparkles,
      roles: ['admin', 'sekretaris', 'pendeta', 'jemaat']
    },
    {
      id: 'pengumuman',
      label: 'Pengumuman & Berita',
      icon: Newspaper,
      roles: ['admin', 'sekretaris', 'pendeta', 'jemaat']
    },
    {
      id: 'warta-jemaat',
      label: 'Warta Jemaat',
      icon: BookOpenText,
      roles: ['admin', 'sekretaris', 'pendeta', 'jemaat']
    },
    {
      id: 'media-sosial',
      label: 'Media Sosial Resmi',
      icon: Share2,
      roles: ['admin', 'sekretaris', 'pendeta', 'jemaat']
    },
    {
      id: 'laporan',
      label: 'Laporan & Audit',
      icon: BarChart3,
      roles: ['admin', 'pendeta', 'sekretaris']
    },
    {
      id: 'manajemen-pengguna',
      label: 'Manajemen Pengguna',
      icon: UserCheck,
      roles: ['admin']
    },
    {
      id: 'pengaturan',
      label: 'Pengaturan & SQL',
      icon: Settings,
      roles: ['admin']
    }
  ];

  const visibleMenuItems = menuItems.filter((item) => item.roles.includes(role));

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0B2545] text-slate-100 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } no-print`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-20 px-6 border-b border-blue-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-10 flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="Logo GMI"
                width={48}
                height={40}
                className="object-contain w-full h-full drop-shadow-xs"
                unoptimized
              />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-wide text-white">GMI IMMANUEL</h1>
              <p className="text-[11px] text-blue-200">Bandar Lampung</p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-900/50 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card inside Sidebar */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900/80 border border-blue-800/40">
          <div className="text-[10px] uppercase font-semibold text-amber-300 tracking-wider">
            Akun Aktif:
          </div>
          <div className="font-semibold text-sm text-white truncate mt-0.5">
            {currentUser?.name || 'Tamu / Jemaat'}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-200 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="capitalize">{currentUser?.role || 'Jemaat'}</span>
            {currentUser?.classMeeting && (
              <span className="text-[11px] text-amber-200">({currentUser.classMeeting})</span>
            )}
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-blue-300/70 tracking-wider">
            Menu Utama
          </div>

          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30 font-semibold'
                    : 'text-slate-300 hover:bg-blue-900/40 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-blue-300'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-blue-900/50 bg-[#081B33] text-[11px] text-blue-300/80 flex flex-col gap-1">
          <div className="flex items-center justify-between font-medium">
            <span>GMI Digital v2.4</span>
            <span className="text-amber-400">Distrik 1 Wil. I</span>
          </div>
          <p className="text-[10px] text-slate-400">
            Sistem Informasi Manajemen Gereja
          </p>
        </div>
      </aside>
    </>
  );
};
