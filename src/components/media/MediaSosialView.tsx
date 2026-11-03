'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { CHURCH_PROFILE } from '@/lib/initialData';
import { 
  Share2, 
  ExternalLink, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Video, 
  Camera
} from 'lucide-react';

// Custom Crisp Brand SVG Icons
const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const MediaSosialView: React.FC = () => {
  const { currentUser } = useApp();
  const role = currentUser?.role || 'jemaat';

  const [youtubeUrl] = useState(CHURCH_PROFILE.youtubeUrl);
  const [instagramUrl] = useState(CHURCH_PROFILE.instagramUrl);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Share2 className="w-6 h-6 text-blue-800" />
          <span>Media Sosial & Saluran Komunikasi Resmi</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Ikuti siaran ibadah langsung, renungan harian, dan dokumentasi kegiatan GMI Immanuel Bandar Lampung
        </p>
      </div>

      {/* Main Social Channels Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Instagram Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition space-y-5">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md">
              <InstagramIcon className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              Akun Resmi Instagram
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Instagram GMI Immanuel
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5 font-mono">
              {CHURCH_PROFILE.instagram}
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Dapatkan update jadwal ibadah, ayat renungan mingguan, dokumentasi pelayanan P3MI & anak sekolah minggu, serta ucapan ulang tahun jemaat.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Instagram Web & App</span>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition"
            >
              <span>Kunjungi Instagram Resmi</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* YouTube Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition space-y-5">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md">
              <YoutubeIcon className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
              Kanal Resmi YouTube
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              YouTube Channel
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              {CHURCH_PROFILE.youtubeNama}
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Siaran langsung (Live Streaming) Ibadah Raya Minggu II setiap pukul 09.00 WIB, arsip khotbah, perayaan puji-pujian Natal, dan rekaman paduan suara.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Live Streaming & Video</span>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition"
            >
              <span>Buka Kanal YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Official Contact Info Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">
            Sekretariat & Kantor Gereja
          </h3>
          <p className="text-xs text-slate-500">
            Alamat fisik dan jalur koordinasi langsung dengan petugas sekretariat
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-slate-500 font-semibold">
              <MapPin className="w-4 h-4 text-blue-800" />
              <span>Alamat Gedung Gereja</span>
            </div>
            <p className="font-bold text-slate-900 text-xs leading-relaxed pt-1">
              {CHURCH_PROFILE.alamat}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-slate-500 font-semibold">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Telepon & WhatsApp</span>
            </div>
            <p className="font-bold text-slate-900 text-xs pt-1">
              {CHURCH_PROFILE.telepon} / {CHURCH_PROFILE.whatsapp}
            </p>
            <p className="text-[11px] text-slate-400">Senin - Sabtu: 08.00 - 16.00 WIB</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-slate-500 font-semibold">
              <Mail className="w-4 h-4 text-rose-600" />
              <span>Email Resmi</span>
            </div>
            <p className="font-bold text-slate-900 text-xs pt-1">
              {CHURCH_PROFILE.email}
            </p>
            <p className="text-[11px] text-slate-400">Korespondensi persuratan & sinode</p>
          </div>
        </div>
      </div>

    </div>
  );
};
