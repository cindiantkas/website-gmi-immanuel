'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { 
  Menu, 
  User as UserIcon, 
  LogOut, 
  ShieldCheck, 
  FileText, 
  BookOpen, 
  Users, 
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const { currentUser, loginAsRole, logout } = useApp();
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <ShieldCheck className="w-3 h-3" /> Admin
          </span>
        );
      case 'sekretaris':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <FileText className="w-3 h-3" /> Sekretaris
          </span>
        );
      case 'pendeta':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
            <BookOpen className="w-3 h-3" /> Pendeta
          </span>
        );
      case 'jemaat':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Users className="w-3 h-3" /> Jemaat {currentUser?.classMeeting ? `(${currentUser.classMeeting})` : ''}
          </span>
        );
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs no-print">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative w-11 h-9 sm:w-12 sm:h-10 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="GMI Immanuel Bandar Lampung Logo"
                width={48}
                height={40}
                className="object-contain w-full h-full"
                priority
                unoptimized
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
                  GMI <span className="text-blue-700">Digital</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-amber-100 text-amber-900 rounded">
                  Immanuel BDL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block leading-none">
                Sistem Informasi Manajemen Gereja
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick Role Switcher & User Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Quick Switch Role Dropdown (Helpful for test/review pair programming) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium transition"
              title="Ganti Peran Pengguna Cepat"
            >
              <span className="hidden md:inline text-slate-500">Peran:</span>
              <span className="font-bold capitalize text-blue-900">{currentUser?.role || 'Guest'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showRoleMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setShowRoleMenu(false)}
              >
                <div className="px-3 py-1.5 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Simulasi Akses Peran
                  </p>
                </div>
                
                <button
                  onClick={() => { loginAsRole('admin'); setShowRoleMenu(false); }}
                  className={`w-full px-3 py-2 text-left text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 ${currentUser?.role === 'admin' ? 'bg-rose-50 text-rose-800 font-semibold' : 'text-slate-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-rose-600" />
                    <span>Admin</span>
                  </div>
                  {currentUser?.role === 'admin' && <span className="text-[10px] bg-rose-200 px-1 rounded">Aktif</span>}
                </button>

                <button
                  onClick={() => { loginAsRole('sekretaris'); setShowRoleMenu(false); }}
                  className={`w-full px-3 py-2 text-left text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 ${currentUser?.role === 'sekretaris' ? 'bg-blue-50 text-blue-800 font-semibold' : 'text-slate-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Sekretaris Gereja</span>
                  </div>
                  {currentUser?.role === 'sekretaris' && <span className="text-[10px] bg-blue-200 px-1 rounded">Aktif</span>}
                </button>

                <button
                  onClick={() => { loginAsRole('pendeta'); setShowRoleMenu(false); }}
                  className={`w-full px-3 py-2 text-left text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 ${currentUser?.role === 'pendeta' ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span>Pendeta (Persetujuan)</span>
                  </div>
                  {currentUser?.role === 'pendeta' && <span className="text-[10px] bg-amber-200 px-1 rounded">Aktif</span>}
                </button>

                <button
                  onClick={() => { loginAsRole('jemaat', 'Andreas'); setShowRoleMenu(false); }}
                  className={`w-full px-3 py-2 text-left text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 ${currentUser?.role === 'jemaat' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Jemaat (CM Andreas)</span>
                  </div>
                  {currentUser?.role === 'jemaat' && <span className="text-[10px] bg-emerald-200 px-1 rounded">Aktif</span>}
                </button>
              </div>
            )}
          </div>

          {/* User info & logout */}
          {currentUser ? (
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-semibold text-slate-800 leading-tight">
                  {currentUser.name}
                </p>
                <div className="mt-0.5">
                  {getRoleBadge(currentUser.role)}
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 overflow-hidden shrink-0">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
              </div>

              <button
                onClick={logout}
                title="Keluar dari Akun"
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => loginAsRole('admin')}
              className="px-4 py-1.5 bg-blue-800 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-900 shadow-xs transition"
            >
              Masuk
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
