'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { ClassMeetingName } from '@/lib/types';
import { CLASS_MEETING_LIST } from '@/lib/initialData';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  User as UserIcon, 
  Users, 
  ShieldCheck, 
  FileText, 
  BookOpen, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, loginAsRole } = useApp();

  const [loginMode, setLoginMode] = useState<'pengurus' | 'jemaat'>('pengurus');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCM, setSelectedCM] = useState<ClassMeetingName>('Andreas');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePengurusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(username, password);
      setIsSubmitting(false);
    }, 300);
  };

  const handleJemaatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login('', '', selectedCM);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B2545] via-[#133E87] to-[#0A1A2F] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-md sm:max-w-lg z-10">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          
          {/* Top Brand Banner */}
          <div className="bg-[#0B2545] p-6 sm:p-8 text-center text-white relative">
            <div className="mx-auto w-44 h-24 mb-4 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo GMI Immanuel Bandar Lampung"
                width={176}
                height={96}
                className="object-contain w-auto h-full drop-shadow-md"
                priority
                unoptimized
              />
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              GMI <span className="text-amber-400">Digital</span>
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-1 font-medium">
              Sistem Informasi Manajemen Gereja
            </p>
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-[11px] text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GMI Immanuel Bandar Lampung</span>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex gap-2">
            <button
              type="button"
              onClick={() => setLoginMode('pengurus')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
                loginMode === 'pengurus'
                  ? 'bg-blue-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Pengurus Gereja</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginMode('jemaat')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
                loginMode === 'jemaat'
                  ? 'bg-blue-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Akses Jemaat (CM)</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            
            {loginMode === 'pengurus' ? (
              <form onSubmit={handlePengurusSubmit} className="space-y-4">
                <div className="text-xs text-slate-500 mb-2">
                  Masuk sebagai <strong className="text-slate-800">Admin, Sekretaris,</strong> atau <strong className="text-slate-800">Pendeta</strong> menggunakan sandi resmi gereja.
                </div>

                {/* Username Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nama Pengguna atau Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="admin, sekretaris, atau pendeta"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Masukkan kata sandi..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? 'Memverifikasi...' : 'Masuk ke Sistem'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleJemaatSubmit} className="space-y-4">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                  <strong>Akses Cepat Jemaat:</strong> Anggota jemaat cukup memilih nama <strong>Class Meeting (CM)</strong> di bawah ini untuk melihat jadwal ibadah, kegiatan, warta jemaat, dan pengajuan surat tanpa kata sandi.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Pilih Class Meeting (CM) Anda
                  </label>
                  <select
                    value={selectedCM}
                    onChange={(e) => setSelectedCM(e.target.value as ClassMeetingName)}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    {CLASS_MEETING_LIST.map((cm) => (
                      <option key={cm.name} value={cm.name}>
                        Class Meeting {cm.name} — ({cm.ketua})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Tersedia 10 Class Meeting resmi GMI Immanuel Bandar Lampung.
                  </p>
                </div>

                {/* Submit Jemaat */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 mt-3"
                >
                  {isSubmitting ? 'Membuka Portal...' : `Masuk sebagai Jemaat CM ${selectedCM}`}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>

          {/* Footer Card */}
          <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500">
            Gereja Methodist Indonesia — Jemaat Immanuel Bandar Lampung
          </div>
        </div>

      </div>
    </div>
  );
};
