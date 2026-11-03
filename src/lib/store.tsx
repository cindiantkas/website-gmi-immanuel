'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  ClassMeetingName, 
  SuratItem, 
  SuratStatus, 
  SuratType,
  JemaatItem, 
  KegiatanItem, 
  KhotbahItem, 
  PengumumanItem, 
  WartaJemaatItem, 
  AuditLogItem,
  PermohonanSuratJemaat
} from './types';
import { 
  INITIAL_USERS, 
  CLASS_MEETING_LIST, 
  INITIAL_KHOTBAH, 
  INITIAL_JEMAAT, 
  INITIAL_KEGIATAN, 
  INITIAL_PENGUMUMAN, 
  INITIAL_SURAT, 
  INITIAL_WARTA, 
  INITIAL_AUDIT_LOGS,
  INITIAL_PERMOHONAN,
  CHURCH_PROFILE
} from './initialData';

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface AppContextType {
  currentUser: User | null;
  activeRole: UserRole;
  isLoggedIn: boolean;
  selectedCM: ClassMeetingName | null;
  login: (username: string, pass: string, cmChoice?: ClassMeetingName) => boolean;
  loginAsRole: (role: UserRole, cm?: ClassMeetingName) => void;
  logout: () => void;
  
  // Data State
  suratList: SuratItem[];
  jemaatList: JemaatItem[];
  kegiatanList: KegiatanItem[];
  khotbahList: KhotbahItem[];
  pengumumanList: PengumumanItem[];
  wartaJemaat: WartaJemaatItem;
  auditLogs: AuditLogItem[];
  permohonanList: PermohonanSuratJemaat[];
  
  // Surat Actions
  generateNomorSurat: (jenis: SuratType) => string;
  createSurat: (data: Omit<SuratItem, 'id' | 'createdAt' | 'updatedAt' | 'riwayatStatus'>) => SuratItem;
  updateSurat: (id: string, data: Partial<SuratItem>) => void;
  ajukanSurat: (id: string, catatan?: string) => void;
  setujuiSurat: (id: string, catatan?: string) => void;
  revisiSurat: (id: string, catatan: string) => void;
  tolakSurat: (id: string, alasan: string) => void;
  arsipkanSurat: (id: string) => void;
  deleteSurat: (id: string) => void;
  
  // Jemaat Actions
  addJemaat: (data: Omit<JemaatItem, 'id' | 'createdAt'>) => void;
  updateJemaat: (id: string, data: Partial<JemaatItem>) => void;
  deleteJemaat: (id: string) => void;
  
  // Kegiatan Actions
  addKegiatan: (data: Omit<KegiatanItem, 'id'>) => void;
  updateKegiatan: (id: string, data: Partial<KegiatanItem>) => void;
  deleteKegiatan: (id: string) => void;
  
  // Khotbah Actions
  addKhotbah: (data: Omit<KhotbahItem, 'id'>) => void;
  updateKhotbah: (id: string, data: Partial<KhotbahItem>) => void;
  deleteKhotbah: (id: string) => void;
  
  // Pengumuman Actions
  addPengumuman: (data: Omit<PengumumanItem, 'id'>) => void;
  updatePengumuman: (id: string, data: Partial<PengumumanItem>) => void;
  deletePengumuman: (id: string) => void;
  
  // Warta Actions
  updateWarta: (data: Partial<WartaJemaatItem>) => void;
  
  // Permohonan Jemaat
  ajukanPermohonanJemaat: (data: Omit<PermohonanSuratJemaat, 'id' | 'tanggalDiajukan' | 'status'>) => void;
  prosesPermohonanKeSurat: (permohonanId: string) => SuratItem | null;
  
  // Toasts
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;

  // Active Tab navigation state
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ROMAN_MONTHS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const SURAT_CODE_MAP: Record<SuratType, string> = {
  'Surat Keterangan Jemaat': 'SKJ',
  'Surat Baptisan': 'SB',
  'Surat Rekomendasi': 'SR',
  'Surat Undangan Kegiatan': 'SUK',
  'Surat Tugas Pelayanan': 'STP',
  'Surat Keterangan Pernikahan': 'SKP'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedCM, setSelectedCM] = useState<ClassMeetingName | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Stored state with local storage fallback
  const [suratList, setSuratList] = useState<SuratItem[]>(INITIAL_SURAT);
  const [jemaatList, setJemaatList] = useState<JemaatItem[]>(INITIAL_JEMAAT);
  const [kegiatanList, setKegiatanList] = useState<KegiatanItem[]>(INITIAL_KEGIATAN);
  const [khotbahList, setKhotbahList] = useState<KhotbahItem[]>(INITIAL_KHOTBAH);
  const [pengumumanList, setPengumumanList] = useState<PengumumanItem[]>(INITIAL_PENGUMUMAN);
  const [wartaJemaat, setWartaJemaat] = useState<WartaJemaatItem>(INITIAL_WARTA);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [permohonanList, setPermohonanList] = useState<PermohonanSuratJemaat[]>(INITIAL_PERMOHONAN);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('gmi_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else {
        // Default: logged in as Admin for instant testability
        setCurrentUser(INITIAL_USERS[0]);
      }
      
      const savedSurat = localStorage.getItem('gmi_surat');
      if (savedSurat) setSuratList(JSON.parse(savedSurat));

      const savedJemaat = localStorage.getItem('gmi_jemaat');
      if (savedJemaat) setJemaatList(JSON.parse(savedJemaat));

      const savedKegiatan = localStorage.getItem('gmi_kegiatan');
      if (savedKegiatan) setKegiatanList(JSON.parse(savedKegiatan));

      const savedKhotbah = localStorage.getItem('gmi_khotbah');
      if (savedKhotbah) setKhotbahList(JSON.parse(savedKhotbah));

      const savedPengumuman = localStorage.getItem('gmi_pengumuman');
      if (savedPengumuman) setPengumumanList(JSON.parse(savedPengumuman));

      const savedWarta = localStorage.getItem('gmi_warta');
      if (savedWarta) setWartaJemaat(JSON.parse(savedWarta));

      const savedLogs = localStorage.getItem('gmi_logs');
      if (savedLogs) setAuditLogs(JSON.parse(savedLogs));

      const savedPermohonan = localStorage.getItem('gmi_permohonan');
      if (savedPermohonan) setPermohonanList(JSON.parse(savedPermohonan));
    } catch (e) {
      console.error('Error loading state from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (currentUser) {
        localStorage.setItem('gmi_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('gmi_user');
      }
      localStorage.setItem('gmi_surat', JSON.stringify(suratList));
      localStorage.setItem('gmi_jemaat', JSON.stringify(jemaatList));
      localStorage.setItem('gmi_kegiatan', JSON.stringify(kegiatanList));
      localStorage.setItem('gmi_khotbah', JSON.stringify(khotbahList));
      localStorage.setItem('gmi_pengumuman', JSON.stringify(pengumumanList));
      localStorage.setItem('gmi_warta', JSON.stringify(wartaJemaat));
      localStorage.setItem('gmi_logs', JSON.stringify(auditLogs));
      localStorage.setItem('gmi_permohonan', JSON.stringify(permohonanList));
    } catch (e) {
      console.error('Error saving state to localStorage', e);
    }
  }, [currentUser, suratList, jemaatList, kegiatanList, khotbahList, pengumumanList, wartaJemaat, auditLogs, permohonanList, isLoaded]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add audit log helper
  const logAction = (tindakan: string, kategori: AuditLogItem['kategori'], detail: string) => {
    const now = new Date();
    const waktuStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      waktu: waktuStr,
      aktor: currentUser?.name || 'Sistem',
      peran: currentUser?.role || 'admin',
      tindakan,
      kategori,
      detail
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Authentication
  const login = (username: string, pass: string, cmChoice?: ClassMeetingName): boolean => {
    // Standard role check with password 'GMIimmanuel'
    const cleanUser = username.trim().toLowerCase();
    const userMatch = INITIAL_USERS.find(
      (u) => u.username.toLowerCase() === cleanUser || u.email.toLowerCase() === cleanUser
    );

    if (userMatch) {
      if (pass === 'GMIImmanuel' || pass === 'GMIimmanuel') {
        const loggedUser: User = { ...userMatch };
        if (cmChoice && loggedUser.role === 'jemaat') {
          loggedUser.classMeeting = cmChoice;
          setSelectedCM(cmChoice);
        }
        setCurrentUser(loggedUser);
        logAction('Login Berhasil', 'Autentikasi', `${loggedUser.name} (${loggedUser.role}) berhasil masuk ke sistem`);
        showToast(`Selamat datang, ${loggedUser.name}!`, 'success');
        return true;
      } else {
        showToast('Kata sandi salah. Silakan periksa kembali.', 'error');
        return false;
      }
    }

    // Jemaat fast entry by selecting CM
    if (cmChoice) {
      const jemaatUser: User = {
        id: `jemaat-${cmChoice.toLowerCase()}`,
        username: `jemaat_${cmChoice.toLowerCase()}`,
        name: `Jemaat Class Meeting ${cmChoice}`,
        role: 'jemaat',
        email: `jemaat.${cmChoice.toLowerCase()}@gmi.org`,
        classMeeting: cmChoice,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
      };
      setCurrentUser(jemaatUser);
      setSelectedCM(cmChoice);
      logAction('Login Jemaat', 'Autentikasi', `Jemaat CM ${cmChoice} masuk ke sistem`);
      showToast(`Selamat datang Jemaat Class Meeting ${cmChoice}!`, 'success');
      return true;
    }

    showToast('Nama pengguna tidak ditemukan atau Class Meeting belum dipilih.', 'error');
    return false;
  };

  const loginAsRole = (role: UserRole, cm: ClassMeetingName = 'Andreas') => {
    const template = INITIAL_USERS.find((u) => u.role === role);
    if (template) {
      const user = { ...template };
      if (role === 'jemaat') {
        user.classMeeting = cm;
        setSelectedCM(cm);
      }
      setCurrentUser(user);
      logAction('Ganti Peran Cepat', 'Autentikasi', `Beralih ke peran ${role}`);
      showToast(`Beralih peran ke: ${user.name} (${role.toUpperCase()})`, 'info');
    }
  };

  const logout = () => {
    if (currentUser) {
      logAction('Logout', 'Autentikasi', `${currentUser.name} telah keluar dari sistem`);
    }
    setCurrentUser(null);
    setSelectedCM(null);
    showToast('Anda telah keluar dari sistem GMI Digital.', 'info');
  };

  // Surat Number Generator: e.g. "022/GMI-IBL/SKJ/X/2026"
  const generateNomorSurat = (jenis: SuratType): string => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const romanMonth = ROMAN_MONTHS[now.getMonth()] || 'X';
    const code = SURAT_CODE_MAP[jenis] || 'SK';

    // Find highest current sequence number in the current year
    let maxSeq = 21;
    suratList.forEach((s) => {
      const parts = s.nomorSurat.split('/');
      if (parts.length >= 5) {
        const num = parseInt(parts[0], 10);
        if (!isNaN(num) && num > maxSeq) {
          maxSeq = num;
        }
      }
    });

    const nextSeq = String(maxSeq + 1).padStart(3, '0');
    return `${nextSeq}/GMI-IBL/${code}/${romanMonth}/${currentYear}`;
  };

  // Surat Operations
  const createSurat = (data: Omit<SuratItem, 'id' | 'createdAt' | 'updatedAt' | 'riwayatStatus'>): SuratItem => {
    const now = new Date();
    const waktuStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    
    const newSurat: SuratItem = {
      ...data,
      id: `surat-${Date.now()}`,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      riwayatStatus: [
        {
          status: data.status,
          waktu: waktuStr,
          oleh: currentUser?.name || 'Sekretaris',
          catatan: 'Surat baru dibuat dari sistem'
        }
      ]
    };

    setSuratList((prev) => [newSurat, ...prev]);
    logAction('Pembuatan Surat Baru', 'Persuratan', `Surat ${newSurat.jenisSurat} No. ${newSurat.nomorSurat} dibuat untuk ${newSurat.namaJemaat}`);
    showToast(`Surat No. ${newSurat.nomorSurat} berhasil dibuat!`, 'success');
    return newSurat;
  };

  const updateSurat = (id: string, data: Partial<SuratItem>) => {
    const now = new Date();
    setSuratList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data, updatedAt: now.toISOString() } : s))
    );
    logAction('Perubahan Surat', 'Persuratan', `Data surat ID ${id} diperbarui`);
    showToast('Data surat berhasil diperbarui.', 'success');
  };

  const ajukanSurat = (id: string, catatan: string = 'Diajukan untuk pemeriksaan Pendeta') => {
    const now = new Date();
    const waktuStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    
    setSuratList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: 'Menunggu Pemeriksaan',
            updatedAt: now.toISOString(),
            riwayatStatus: [
              ...s.riwayatStatus,
              {
                status: 'Menunggu Pemeriksaan',
                waktu: waktuStr,
                oleh: currentUser?.name || 'Sekretaris Gereja',
                catatan
              }
            ]
          };
        }
        return s;
      })
    );
    logAction('Pengajuan Surat', 'Persuratan', `Surat diajukan ke Pendeta untuk pemeriksaan`);
    showToast('Surat telah dikirim ke Pendeta untuk pemeriksaan.', 'info');
  };

  const setujuiSurat = (id: string, catatan: string = 'Surat telah diverifikasi dan disetujui.') => {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const waktuStr = `${todayStr} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    setSuratList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: 'Disetujui',
            disetujuiOleh: currentUser?.name || 'Pdt. Johanes Supard, M.Th',
            tanggalDisetujui: todayStr,
            catatanPendeta: catatan,
            updatedAt: now.toISOString(),
            riwayatStatus: [
              ...s.riwayatStatus,
              {
                status: 'Disetujui',
                waktu: waktuStr,
                oleh: currentUser?.name || 'Pendeta Jemaat',
                catatan
              }
            ]
          };
        }
        return s;
      })
    );
    logAction('Persetujuan Surat', 'Persuratan', `Pendeta menyetujui surat ID ${id}`);
    showToast('Surat berhasil disetujui dan siap dicetak/diunduh.', 'success');
  };

  const revisiSurat = (id: string, catatan: string) => {
    const now = new Date();
    const waktuStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    setSuratList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: 'Perlu Revisi',
            catatanRevisi: catatan,
            updatedAt: now.toISOString(),
            riwayatStatus: [
              ...s.riwayatStatus,
              {
                status: 'Perlu Revisi',
                waktu: waktuStr,
                oleh: currentUser?.name || 'Pendeta Jemaat',
                catatan
              }
            ]
          };
        }
        return s;
      })
    );
    logAction('Permintaan Revisi Surat', 'Persuratan', `Pendeta meminta revisi surat: ${catatan}`);
    showToast('Catatan revisi telah dikirimkan ke Sekretaris.', 'warning');
  };

  const tolakSurat = (id: string, alasan: string) => {
    const now = new Date();
    const waktuStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    setSuratList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: 'Ditolak',
            catatanPendeta: `Ditolak: ${alasan}`,
            updatedAt: now.toISOString(),
            riwayatStatus: [
              ...s.riwayatStatus,
              {
                status: 'Ditolak',
                waktu: waktuStr,
                oleh: currentUser?.name || 'Pendeta Jemaat',
                catatan: alasan
              }
            ]
          };
        }
        return s;
      })
    );
    logAction('Penolakan Surat', 'Persuratan', `Pendeta menolak surat ID ${id}. Alasan: ${alasan}`);
    showToast('Surat telah ditolak.', 'error');
  };

  const arsipkanSurat = (id: string) => {
    const now = new Date();
    const waktuStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    setSuratList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: 'Selesai / Diarsipkan',
            updatedAt: now.toISOString(),
            riwayatStatus: [
              ...s.riwayatStatus,
              {
                status: 'Selesai / Diarsipkan',
                waktu: waktuStr,
                oleh: currentUser?.name || 'Sekretaris Gereja',
                catatan: 'Dokumen surat telah diarsipkan resmi'
              }
            ]
          };
        }
        return s;
      })
    );
    logAction('Pengarsipan Surat', 'Persuratan', `Surat ID ${id} dipindahkan ke arsip digital`);
    showToast('Surat telah berhasil diarsipkan.', 'success');
  };

  const deleteSurat = (id: string) => {
    setSuratList((prev) => prev.filter((s) => s.id !== id));
    logAction('Hapus Surat', 'Persuratan', `Surat ID ${id} dihapus`);
    showToast('Surat telah dihapus dari sistem.', 'info');
  };

  // Jemaat Operations
  const addJemaat = (data: Omit<JemaatItem, 'id' | 'createdAt'>) => {
    // Check duplicates
    const dup = jemaatList.find(
      (j) => j.nomorAnggota.toLowerCase() === data.nomorAnggota.toLowerCase() ||
             j.namaLengkap.toLowerCase() === data.namaLengkap.toLowerCase()
    );
    if (dup) {
      showToast('Peringatan: Jemaat dengan nama atau nomor anggota serupa sudah terdaftar!', 'warning');
    }

    const newJemaat: JemaatItem = {
      ...data,
      id: `jem-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setJemaatList((prev) => [newJemaat, ...prev]);
    logAction('Pendaftaran Jemaat Baru', 'Jemaat', `Menambahkan jemaat ${newJemaat.namaLengkap} (${newJemaat.classMeeting})`);
    showToast(`Data jemaat ${newJemaat.namaLengkap} berhasil disimpan!`, 'success');
  };

  const updateJemaat = (id: string, data: Partial<JemaatItem>) => {
    setJemaatList((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...data } : j))
    );
    logAction('Pembaruan Data Jemaat', 'Jemaat', `Memperbarui data jemaat ID ${id}`);
    showToast('Data jemaat berhasil diperbarui.', 'success');
  };

  const deleteJemaat = (id: string) => {
    setJemaatList((prev) => prev.filter((j) => j.id !== id));
    logAction('Penghapusan Jemaat', 'Jemaat', `Menghapus data jemaat ID ${id}`);
    showToast('Data jemaat telah dihapus.', 'info');
  };

  // Kegiatan Operations
  const addKegiatan = (data: Omit<KegiatanItem, 'id'>) => {
    const newKegiatan: KegiatanItem = {
      ...data,
      id: `keg-${Date.now()}`
    };
    setKegiatanList((prev) => [newKegiatan, ...prev]);
    logAction('Tambah Kegiatan', 'Kegiatan', `Menambahkan kegiatan ${newKegiatan.namaKegiatan}`);
    showToast('Kegiatan baru berhasil ditambahkan.', 'success');
  };

  const updateKegiatan = (id: string, data: Partial<KegiatanItem>) => {
    setKegiatanList((prev) =>
      prev.map((k) => (k.id === id ? { ...k, ...data } : k))
    );
    logAction('Update Kegiatan', 'Kegiatan', `Memperbarui kegiatan ID ${id}`);
    showToast('Data kegiatan berhasil diperbarui.', 'success');
  };

  const deleteKegiatan = (id: string) => {
    setKegiatanList((prev) => prev.filter((k) => k.id !== id));
    logAction('Hapus Kegiatan', 'Kegiatan', `Menghapus kegiatan ID ${id}`);
    showToast('Kegiatan berhasil dihapus.', 'info');
  };

  // Khotbah Operations
  const addKhotbah = (data: Omit<KhotbahItem, 'id'>) => {
    const newKhotbah: KhotbahItem = {
      ...data,
      id: `khotbah-${Date.now()}`
    };
    setKhotbahList((prev) => [...prev, newKhotbah]);
    logAction('Tambah Tema Khotbah', 'Kegiatan', `Menambahkan tema khotbah: "${newKhotbah.tema}"`);
    showToast('Jadwal tema khotbah berhasil ditambahkan.', 'success');
  };

  const updateKhotbah = (id: string, data: Partial<KhotbahItem>) => {
    setKhotbahList((prev) =>
      prev.map((k) => (k.id === id ? { ...k, ...data } : k))
    );
    logAction('Update Khotbah', 'Kegiatan', `Memperbarui tema khotbah ID ${id}`);
    showToast('Jadwal tema khotbah berhasil diperbarui.', 'success');
  };

  const deleteKhotbah = (id: string) => {
    setKhotbahList((prev) => prev.filter((k) => k.id !== id));
    logAction('Hapus Khotbah', 'Kegiatan', `Menghapus tema khotbah ID ${id}`);
    showToast('Jadwal tema khotbah berhasil dihapus.', 'info');
  };

  // Pengumuman Operations
  const addPengumuman = (data: Omit<PengumumanItem, 'id'>) => {
    const newPengumuman: PengumumanItem = {
      ...data,
      id: `peng-${Date.now()}`
    };
    setPengumumanList((prev) => [newPengumuman, ...prev]);
    logAction('Tambah Pengumuman', 'Pengumuman', `Membuat pengumuman: ${newPengumuman.judul}`);
    showToast('Pengumuman gereja berhasil dibuat.', 'success');
  };

  const updatePengumuman = (id: string, data: Partial<PengumumanItem>) => {
    setPengumumanList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
    logAction('Update Pengumuman', 'Pengumuman', `Memperbarui pengumuman ID ${id}`);
    showToast('Pengumuman berhasil diperbarui.', 'success');
  };

  const deletePengumuman = (id: string) => {
    setPengumumanList((prev) => prev.filter((p) => p.id !== id));
    logAction('Hapus Pengumuman', 'Pengumuman', `Menghapus pengumuman ID ${id}`);
    showToast('Pengumuman berhasil dihapus.', 'info');
  };

  // Warta Operations
  const updateWarta = (data: Partial<WartaJemaatItem>) => {
    setWartaJemaat((prev) => ({ ...prev, ...data }));
    logAction('Update Warta Jemaat', 'Pengumuman', `Memperbarui Warta Jemaat Edisi ${wartaJemaat.nomorEdisi}`);
    showToast('Warta Jemaat berhasil diperbarui.', 'success');
  };

  // Permohonan Jemaat
  const ajukanPermohonanJemaat = (data: Omit<PermohonanSuratJemaat, 'id' | 'tanggalDiajukan' | 'status'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newPerm: PermohonanSuratJemaat = {
      ...data,
      id: `perm-${Date.now()}`,
      tanggalDiajukan: now,
      status: 'Menunggu Review'
    };
    setPermohonanList((prev) => [newPerm, ...prev]);
    logAction('Permohonan Surat Jemaat', 'Persuratan', `Jemaat ${newPerm.namaJemaat} mengajukan ${newPerm.jenisSurat}`);
    showToast('Permohonan surat berhasil dikirim ke Sekretariat Gereja!', 'success');
  };

  const prosesPermohonanKeSurat = (permohonanId: string): SuratItem | null => {
    const perm = permohonanList.find((p) => p.id === permohonanId);
    if (!perm) return null;

    // Generate new letter draft pre-filled
    const newNomor = generateNomorSurat(perm.jenisSurat);
    const today = new Date().toISOString().split('T')[0];
    
    // Check if jemaat details exists
    const jemaatMatch = jemaatList.find((j) => j.namaLengkap.toLowerCase() === perm.namaJemaat.toLowerCase());

    const draftData: Omit<SuratItem, 'id' | 'createdAt' | 'updatedAt' | 'riwayatStatus'> = {
      nomorSurat: newNomor,
      jenisSurat: perm.jenisSurat,
      tanggalSurat: today,
      perihal: `Surat Resmi ${perm.jenisSurat}`,
      status: 'Draf',
      dibuatOleh: currentUser?.name || 'Sekretaris Gereja',
      namaJemaat: perm.namaJemaat,
      nomorAnggota: jemaatMatch?.nomorAnggota || 'GMI-2026-XXX',
      classMeeting: perm.classMeeting,
      alamat: jemaatMatch?.alamat || 'Bandar Lampung',
      noHp: perm.noHp,
      keperluan: perm.keperluan,
      tujuanSurat: 'Pihak yang Berkepentingan'
    };

    const created = createSurat(draftData);

    // Update status permohonan
    setPermohonanList((prev) =>
      prev.map((p) => (p.id === permohonanId ? { ...p, status: 'Diproses Sekretaris' } : p))
    );

    showToast(`Draf surat resmi berhasil dibuat dari permohonan ${perm.namaJemaat}`, 'success');
    return created;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeRole: currentUser?.role || 'jemaat',
        isLoggedIn: !!currentUser,
        selectedCM,
        login,
        loginAsRole,
        logout,
        suratList,
        jemaatList,
        kegiatanList,
        khotbahList,
        pengumumanList,
        wartaJemaat,
        auditLogs,
        permohonanList,
        generateNomorSurat,
        createSurat,
        updateSurat,
        ajukanSurat,
        setujuiSurat,
        revisiSurat,
        tolakSurat,
        arsipkanSurat,
        deleteSurat,
        addJemaat,
        updateJemaat,
        deleteJemaat,
        addKegiatan,
        updateKegiatan,
        deleteKegiatan,
        addKhotbah,
        updateKhotbah,
        deleteKhotbah,
        addPengumuman,
        updatePengumuman,
        deletePengumuman,
        updateWarta,
        ajukanPermohonanJemaat,
        prosesPermohonanKeSurat,
        toasts,
        showToast,
        removeToast,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
