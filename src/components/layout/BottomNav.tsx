'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpenText, 
  Sparkles, 
  Network, 
  Send
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, suratList } = useApp();
  const role = currentUser?.role || 'jemaat';

  const waitingApprovalCount = suratList.filter((s) => s.status === 'Menunggu Pemeriksaan').length;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 flex items-center justify-around lg:hidden no-print shadow-lg">
      
      {/* 1. Dashboard */}
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center py-1 px-2 rounded-xl transition ${
          activeTab === 'dashboard' ? 'text-blue-900 font-bold' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-blue-800' : 'text-slate-500'}`} />
        <span className="text-[10px] mt-0.5">Beranda</span>
      </button>

      {/* 2. Persuratan / Pengajuan */}
      {role === 'jemaat' ? (
        <button
          onClick={() => setActiveTab('permohonan-jemaat')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition ${
            activeTab === 'permohonan-jemaat' ? 'text-blue-900 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Send className={`w-5 h-5 ${activeTab === 'permohonan-jemaat' ? 'text-blue-800' : 'text-slate-500'}`} />
          <span className="text-[10px] mt-0.5">Ajukan</span>
        </button>
      ) : (
        <button
          onClick={() => setActiveTab('persuratan')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition relative ${
            activeTab === 'persuratan' ? 'text-blue-900 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className={`w-5 h-5 ${activeTab === 'persuratan' ? 'text-blue-800' : 'text-slate-500'}`} />
          <span className="text-[10px] mt-0.5">Surat</span>
          {role === 'pendeta' && waitingApprovalCount > 0 && (
            <span className="absolute top-0 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
          )}
        </button>
      )}

      {/* 3. Warta Jemaat */}
      <button
        onClick={() => setActiveTab('warta-jemaat')}
        className={`flex flex-col items-center py-1 px-2 rounded-xl transition ${
          activeTab === 'warta-jemaat' ? 'text-blue-900 font-bold' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <BookOpenText className={`w-5 h-5 ${activeTab === 'warta-jemaat' ? 'text-amber-600' : 'text-slate-500'}`} />
        <span className="text-[10px] mt-0.5">Warta</span>
      </button>

      {/* 4. Agenda Kegiatan */}
      <button
        onClick={() => setActiveTab('kegiatan-mendatang')}
        className={`flex flex-col items-center py-1 px-2 rounded-xl transition ${
          activeTab === 'kegiatan-mendatang' ? 'text-blue-900 font-bold' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <Sparkles className={`w-5 h-5 ${activeTab === 'kegiatan-mendatang' ? 'text-blue-800' : 'text-slate-500'}`} />
        <span className="text-[10px] mt-0.5">Agenda</span>
      </button>

      {/* 5. Class Meeting */}
      <button
        onClick={() => setActiveTab('class-meeting')}
        className={`flex flex-col items-center py-1 px-2 rounded-xl transition ${
          activeTab === 'class-meeting' ? 'text-blue-900 font-bold' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <Network className={`w-5 h-5 ${activeTab === 'class-meeting' ? 'text-blue-800' : 'text-slate-500'}`} />
        <span className="text-[10px] mt-0.5">Class</span>
      </button>

    </div>
  );
};
