export type UserRole = 'admin' | 'sekretaris' | 'pendeta' | 'jemaat';

export type ClassMeetingName = 
  | 'Samaria'
  | 'Andreas'
  | 'Yakobus'
  | 'Matius'
  | 'Lukas'
  | 'Yohanes'
  | 'Gilead'
  | 'Filipi'
  | 'Sinai'
  | 'Bethel';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email: string;
  avatarUrl?: string;
  phone?: string;
  classMeeting?: ClassMeetingName;
}

export type SuratType = 
  | 'Surat Keterangan Jemaat'
  | 'Surat Baptisan'
  | 'Surat Rekomendasi'
  | 'Surat Undangan Kegiatan'
  | 'Surat Tugas Pelayanan'
  | 'Surat Keterangan Pernikahan';

export type SuratStatus = 
  | 'Draf'
  | 'Menunggu Pemeriksaan'
  | 'Perlu Revisi'
  | 'Disetujui'
  | 'Ditolak'
  | 'Selesai / Diarsipkan';

export interface SuratItem {
  id: string;
  nomorSurat: string;
  jenisSurat: SuratType;
  tanggalSurat: string; // YYYY-MM-DD
  perihal: string;
  lampiran?: string;
  status: SuratStatus;
  
  // Pembuat & Pengaju
  dibuatOleh: string;
  createdAt: string;
  updatedAt: string;
  
  // Data pihak bersangkutan
  namaJemaat: string;
  nomorAnggota?: string;
  classMeeting?: ClassMeetingName;
  tempatLahir?: string;
  tanggalLahir?: string;
  alamat?: string;
  noHp?: string;
  
  // Data khusus sesuai jenis surat
  keperluan?: string; // untuk Keterangan Jemaat / Rekomendasi
  tanggalBaptis?: string; // untuk Baptisan
  namaPendetaBaptis?: string;
  nomorStbBaptis?: string;
  
  namaPasangan?: string; // untuk Pernikahan
  tanggalPernikahan?: string;
  gerejaTujuan?: string; // untuk Rekomendasi / Pernikahan
  
  namaKegiatan?: string; // untuk Undangan / Tugas
  tanggalKegiatan?: string;
  waktuKegiatan?: string;
  tempatKegiatan?: string;
  peranPelayanan?: string; // untuk Tugas Pelayanan
  
  tujuanSurat: string; // Yth. ...
  isiSuratKhusus?: string; // Custom paragraph if needed
  
  // Alur Persetujuan & Revisi
  catatanPendeta?: string;
  catatanRevisi?: string;
  tanggalDisetujui?: string;
  disetujuiOleh?: string;
  riwayatStatus: {
    status: SuratStatus;
    waktu: string;
    oleh: string;
    catatan?: string;
  }[];
}

export type KeanggotaanStatus = 'Jemaat Penuh' | 'Katekisasi' | 'Pemuda/i' | 'Lansia (Usindah)' | 'Simpatisan';

export interface JemaatItem {
  id: string;
  nomorAnggota: string;
  namaLengkap: string;
  jenisKelamin: 'L' | 'P';
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  noHp: string;
  classMeeting: ClassMeetingName;
  statusKeanggotaan: KeanggotaanStatus;
  statusPernikahan: 'Belum Menikah' | 'Menikah' | 'Duda/Janda';
  golonganDarah?: 'A' | 'B' | 'AB' | 'O' | '-';
  tanggalBaptis?: string;
  tanggalSidi?: string;
  namaKeluarga?: string;
  hubunganKeluarga?: 'Kepala Keluarga' | 'Istri' | 'Anak' | 'Famili Lain';
  pekerjaan?: string;
  createdAt: string;
}

export interface ClassMeetingGroup {
  name: ClassMeetingName;
  ketua: string;
  kontak: string;
  lokasiPersekutuan: string;
  jadwalRutin: string;
  deskripsi: string;
}

export type KegiatanStatus = 'Akan Datang' | 'Berlangsung' | 'Selesai';

export interface KegiatanItem {
  id: string;
  namaKegiatan: string;
  kategori: 'Ibadah Minggu' | 'Persekutuan Doa Pagi' | 'Ibadah Usindah' | 'Ibadah P3MI' | 'Kegiatan PRMI' | 'Perayaan Natal' | 'Rapat & Pelayanan' | 'Lainnya';
  tanggal: string; // YYYY-MM-DD
  waktu: string; // misal "09:00 WIB"
  lokasi: string;
  penanggungJawab: string;
  deskripsi: string;
  posterUrl?: string;
  status: KegiatanStatus;
}

export interface KhotbahItem {
  id: string;
  tanggal: string; // Format: Minggu, DD MMMM YYYY
  tema: string;
  ayatAlkitab: string;
  pelayanFirman: string;
  keterangan?: string;
  status: 'Draf' | 'Dikonfirmasi';
}

export interface PengumumanItem {
  id: string;
  judul: string;
  kategori: 'Berita Duka Cita' | 'Ucapan Ulang Tahun' | 'Pengumuman Umum' | 'Dokumentasi Kegiatan' | 'Informasi Pelayanan' | 'Tema & Jadwal Khotbah' | 'Info Penting';
  isi: string;
  tanggalPublikasi: string;
  penulis: string;
  status: 'Draf' | 'Dipublikasikan';
  gambarUrl?: string;
}

export interface WartaJemaatItem {
  id: string;
  nomorEdisi: string;
  tanggalMinggu: string;
  temaMinggu: string;
  pelayanFirman: string;
  liturgiRingkas: string[];
  petugasPelayanan: {
    peran: string;
    nama: string;
  }[];
  ucapanUlangTahun: {
    nama: string;
    tanggal: string;
    classMeeting: ClassMeetingName;
  }[];
  beritaDuka?: string;
  laporanKeuangan?: {
    persembahanKolekte: string;
    persembahanPersepuluhan: string;
    persembahanSyukur: string;
    totalMingguLalu: string;
  };
  pengumumanSepekan: string[];
  status: 'Draf' | 'Dipublikasikan';
}

export interface AuditLogItem {
  id: string;
  waktu: string;
  aktor: string;
  peran: UserRole;
  tindakan: string;
  kategori: 'Persuratan' | 'Jemaat' | 'Kegiatan' | 'Pengumuman' | 'Sistem' | 'Autentikasi';
  detail: string;
}

export interface PermohonanSuratJemaat {
  id: string;
  namaJemaat: string;
  noHp: string;
  classMeeting: ClassMeetingName;
  jenisSurat: SuratType;
  keperluan: string;
  tanggalDiajukan: string;
  status: 'Menunggu Review' | 'Diproses Sekretaris' | 'Selesai';
}
