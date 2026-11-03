'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ToastContainer } from '@/components/common/ToastContainer';
import { BottomNav } from '@/components/layout/BottomNav';
import { LoginView } from '@/components/auth/LoginView';

// Views
import { DashboardView } from '@/components/dashboard/DashboardView';
import { PersuratanView } from '@/components/persuratan/PersuratanView';
import { ArsipSuratView } from '@/components/persuratan/ArsipSuratView';
import { PermohonanSuratView } from '@/components/jemaat/PermohonanSuratView';
import { DataJemaatView } from '@/components/jemaat/DataJemaatView';
import { ClassMeetingView } from '@/components/classmeeting/ClassMeetingView';
import { JadwalIbadahView } from '@/components/jadwal/JadwalIbadahView';
import { KegiatanMendatangView } from '@/components/jadwal/KegiatanMendatangView';
import { PengumumanView } from '@/components/pengumuman/PengumumanView';
import { WartaJemaatView } from '@/components/warta/WartaJemaatView';
import { MediaSosialView } from '@/components/media/MediaSosialView';
import { LaporanView } from '@/components/laporan/LaporanView';
import { ManajemenPenggunaView } from '@/components/users/ManajemenPenggunaView';
import { PengaturanView } from '@/components/settings/PengaturanView';

const MainAppContent: React.FC = () => {
  const { isLoggedIn, activeTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If user is not logged in, show Login view
  if (!isLoggedIn) {
    return (
      <>
        <LoginView />
        <ToastContainer />
      </>
    );
  }

  // Render tab content based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'persuratan':
        return <PersuratanView />;
      case 'arsip-surat':
        return <ArsipSuratView />;
      case 'permohonan-jemaat':
        return <PermohonanSuratView />;
      case 'data-jemaat':
        return <DataJemaatView />;
      case 'class-meeting':
        return <ClassMeetingView />;
      case 'jadwal-ibadah':
        return <JadwalIbadahView />;
      case 'kegiatan-mendatang':
        return <KegiatanMendatangView />;
      case 'pengumuman':
        return <PengumumanView />;
      case 'warta-jemaat':
        return <WartaJemaatView />;
      case 'media-sosial':
        return <MediaSosialView />;
      case 'laporan':
        return <LaporanView />;
      case 'manajemen-pengguna':
        return <ManajemenPenggunaView />;
      case 'pengaturan':
        return <PengaturanView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Sidebar for Desktop & Mobile drawer */}
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen flex-1">
        {/* Top Header */}
        <Header onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderTabContent()}
        </main>

        {/* Global Footer */}
        <footer className="py-4 px-6 pb-20 lg:pb-6 border-t border-slate-200 text-center text-xs text-slate-500 bg-white no-print">
          GMI Digital © 2026 — Sistem Informasi Manajemen Gereja Methodist Indonesia Jemaat Immanuel Bandar Lampung
        </footer>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Toast feedback notifications */}
      <ToastContainer />
    </div>
  );
};

export default function Home() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
