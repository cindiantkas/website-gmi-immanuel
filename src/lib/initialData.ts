import { 
  User, 
  ClassMeetingGroup, 
  JemaatItem, 
  KhotbahItem, 
  KegiatanItem, 
  PengumumanItem, 
  SuratItem, 
  WartaJemaatItem, 
  AuditLogItem,
  PermohonanSuratJemaat
} from './types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    username: 'admin',
    name: 'Administrator GMI',
    email: 'admin@gmi.org',
    role: 'admin',
    phone: '0812-7890-1234',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-sekretaris',
    username: 'sekretaris',
    name: 'Diak. Maria Christina',
    email: 'sekretaris@gmi.org',
    role: 'sekretaris',
    phone: '0813-6789-4321',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-pendeta',
    username: 'pendeta',
    name: 'Pdt. Johanes Supard, M.Th',
    email: 'pendeta@gmi.org',
    role: 'pendeta',
    phone: '0811-2345-6789',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-jemaat',
    username: 'jemaat',
    name: 'Kel. Bpk. Hendra Wijaya',
    email: 'jemaat@gmi.org',
    role: 'jemaat',
    phone: '0852-9876-5432',
    classMeeting: 'Andreas',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
  }
];

export const CLASS_MEETING_LIST: ClassMeetingGroup[] = [
  {
    name: 'Samaria',
    ketua: 'Bpk. Ir. Robert Simanjuntak',
    kontak: '0812-7100-1101',
    lokasiPersekutuan: 'Kediaman Bpk. Robert (Jl. Wolter Monginsidi No. 12)',
    jadwalRutin: 'Setiap Rabu ke-2 & ke-4, Pukul 19.00 WIB',
    deskripsi: 'Class Meeting wilayah Teluk Betung Utara & sekitarnya.'
  },
  {
    name: 'Andreas',
    ketua: 'Ibu Dra. Christine Natalia',
    kontak: '0813-7200-2202',
    lokasiPersekutuan: 'Kediaman Ibu Christine (Jl. Ikan Tenggiri No. 8)',
    jadwalRutin: 'Setiap Jumat ke-1 & ke-3, Pukul 19.30 WIB',
    deskripsi: 'Class Meeting wilayah Teluk Betung Selatan & Pesawahan.'
  },
  {
    name: 'Yakobus',
    ketua: 'Bpk. Paulus Sihombing, S.E.',
    kontak: '0812-7300-3303',
    lokasiPersekutuan: 'Kediaman Bpk. Paulus (Jl. Gatot Subroto No. 45)',
    jadwalRutin: 'Setiap Kamis ke-2 & ke-4, Pukul 19.00 WIB',
    deskripsi: 'Class Meeting wilayah Pahoman & Enggal.'
  },
  {
    name: 'Matius',
    ketua: 'Ibu dr. Debora Silalahi',
    kontak: '0811-7400-4404',
    lokasiPersekutuan: 'Kediaman Ibu dr. Debora (Jl. Kartini No. 22)',
    jadwalRutin: 'Setiap Selasa ke-1 & ke-3, Pukul 19.00 WIB',
    deskripsi: 'Class Meeting wilayah Tanjung Karang Pusat.'
  },
  {
    name: 'Lukas',
    ketua: 'Bpk. David Kurniawan',
    kontak: '0813-7500-5505',
    lokasiPersekutuan: 'Kediaman Bpk. David (Jl. Teuku Umar No. 88)',
    jadwalRutin: 'Setiap Jumat ke-2 & ke-4, Pukul 19.30 WIB',
    deskripsi: 'Class Meeting wilayah Kedaton & Labuhan Ratu.'
  },
  {
    name: 'Yohanes',
    ketua: 'Bpk. Stefanus Hutapea, S.T.',
    kontak: '0812-7600-6606',
    lokasiPersekutuan: 'Kediaman Bpk. Stefanus (Jl. ZA Pagar Alam No. 10)',
    jadwalRutin: 'Setiap Rabu ke-1 & ke-3, Pukul 19.00 WIB',
    deskripsi: 'Class Meeting wilayah Rajabasa & Kemiling.'
  },
  {
    name: 'Gilead',
    ketua: 'Ibu Ruth Sitorus, M.Pd.',
    kontak: '0813-7700-7707',
    lokasiPersekutuan: 'Kediaman Ibu Ruth (Jl. Antasari No. 34)',
    jadwalRutin: 'Setiap Kamis ke-1 & ke-3, Pukul 19.00 WIB',
    deskripsi: 'Class Meeting wilayah Sukabumi & Tanjung Senang.'
  },
  {
    name: 'Filipi',
    ketua: 'Bpk. Markus Tambunan',
    kontak: '0812-7800-8808',
    lokasiPersekutuan: 'Kediaman Bpk. Markus (Jl. Urip Sumoharjo No. 17)',
    jadwalRutin: 'Setiap Jumat ke-1 & ke-3, Pukul 19.00 WIB',
    deskripsi: 'Class Meeting wilayah Way Halim & Kedamaian.'
  },
  {
    name: 'Sinai',
    ketua: 'Bpk. Yulius Pranata',
    kontak: '0811-7900-9909',
    lokasiPersekutuan: 'Kediaman Bpk. Yulius (Jl. Soekarno Hatta No. 50)',
    jadwalRutin: 'Setiap Selasa ke-2 & ke-4, Pukul 19.30 WIB',
    deskripsi: 'Class Meeting wilayah Panjang & Bypass.'
  },
  {
    name: 'Bethel',
    ketua: 'Ibu Ester Nainggolan',
    kontak: '0813-7000-0010',
    lokasiPersekutuan: 'Kediaman Ibu Ester (Jl. Diponegoro No. 104)',
    jadwalRutin: 'Setiap Rabu ke-2 & ke-4, Pukul 19.00 WIB',
    deskripsi: 'Class Meeting wilayah Kupang Kota & Bumi Waras.'
  }
];

export const INITIAL_KHOTBAH: KhotbahItem[] = [
  {
    id: 'khotbah-1',
    tanggal: 'Minggu, 4 Oktober 2026',
    tema: 'Keluarga Kristen sebagai Garam dan Terang Dunia',
    ayatAlkitab: 'Roma 12:18',
    pelayanFirman: 'Pdt. Andreas Sumarsono',
    keterangan: 'Ibadah Minggu Pembuka Bulan Keluarga',
    status: 'Dikonfirmasi'
  },
  {
    id: 'khotbah-2',
    tanggal: 'Minggu, 11 Oktober 2026',
    tema: 'Ekologi Gereja: Merawat Rumah Kita Bersama',
    ayatAlkitab: 'Matius 25:35–36 dan 2 Korintus 9:12',
    pelayanFirman: 'Pdt. Eirene Marheni Laluba',
    keterangan: 'Minggu Peduli Lingkungan Hidup',
    status: 'Dikonfirmasi'
  },
  {
    id: 'khotbah-3',
    tanggal: 'Minggu, 18 Oktober 2026',
    tema: 'Jangan Wariskan Lukamu',
    ayatAlkitab: 'Efesus 4:31–32',
    pelayanFirman: 'Pdt. Aprizen F. Marbun',
    keterangan: 'Minggu P3MI (Pemuda Remaja Methodist Indonesia)',
    status: 'Dikonfirmasi'
  },
  {
    id: 'khotbah-4',
    tanggal: 'Minggu, 25 Oktober 2026',
    tema: 'Hidup yang Berbuah Manis dan Menyukakan Tuhan',
    ayatAlkitab: 'Filipi 3:4b–14',
    pelayanFirman: 'Pdt. Johanes Supard',
    keterangan: 'Ibadah Minggu IV & Perjamuan Kudus',
    status: 'Dikonfirmasi'
  }
];

export const INITIAL_JEMAAT: JemaatItem[] = [
  {
    id: 'jem-001',
    nomorAnggota: 'GMI-2026-001',
    namaLengkap: 'Hendra Wijaya',
    jenisKelamin: 'L',
    tempatLahir: 'Bandar Lampung',
    tanggalLahir: '1982-05-14',
    alamat: 'Jl. Ikan Tenggiri No. 15, Teluk Betung',
    noHp: '0852-9876-5432',
    classMeeting: 'Andreas',
    statusKeanggotaan: 'Jemaat Penuh',
    statusPernikahan: 'Menikah',
    golonganDarah: 'O',
    tanggalBaptis: '1998-04-12',
    tanggalSidi: '2000-06-25',
    namaKeluarga: 'Keluarga Hendra Wijaya',
    hubunganKeluarga: 'Kepala Keluarga',
    pekerjaan: 'Wiraswasta',
    createdAt: '2026-01-10'
  },
  {
    id: 'jem-002',
    nomorAnggota: 'GMI-2026-002',
    namaLengkap: 'Sylvia Anggraini',
    jenisKelamin: 'P',
    tempatLahir: 'Palembang',
    tanggalLahir: '1986-09-20',
    alamat: 'Jl. Ikan Tenggiri No. 15, Teluk Betung',
    noHp: '0852-9876-5433',
    classMeeting: 'Andreas',
    statusKeanggotaan: 'Jemaat Penuh',
    statusPernikahan: 'Menikah',
    golonganDarah: 'A',
    tanggalBaptis: '2002-03-30',
    tanggalSidi: '2004-10-15',
    namaKeluarga: 'Keluarga Hendra Wijaya',
    hubunganKeluarga: 'Istri',
    pekerjaan: 'Guru',
    createdAt: '2026-01-10'
  },
  {
    id: 'jem-003',
    nomorAnggota: 'GMI-2026-003',
    namaLengkap: 'Kevin Jonathan Wijaya',
    jenisKelamin: 'L',
    tempatLahir: 'Bandar Lampung',
    tanggalLahir: '2008-11-12',
    alamat: 'Jl. Ikan Tenggiri No. 15, Teluk Betung',
    noHp: '0852-9876-5434',
    classMeeting: 'Andreas',
    statusKeanggotaan: 'Pemuda/i',
    statusPernikahan: 'Belum Menikah',
    golonganDarah: 'O',
    tanggalBaptis: '2009-02-15',
    namaKeluarga: 'Keluarga Hendra Wijaya',
    hubunganKeluarga: 'Anak',
    pekerjaan: 'Pelajar',
    createdAt: '2026-01-10'
  },
  {
    id: 'jem-004',
    nomorAnggota: 'GMI-2026-004',
    namaLengkap: 'Ir. Robert Simanjuntak',
    jenisKelamin: 'L',
    tempatLahir: 'Medan',
    tanggalLahir: '1968-03-10',
    alamat: 'Jl. Wolter Monginsidi No. 12, Teluk Betung',
    noHp: '0812-7100-1101',
    classMeeting: 'Samaria',
    statusKeanggotaan: 'Jemaat Penuh',
    statusPernikahan: 'Menikah',
    golonganDarah: 'B',
    tanggalBaptis: '1980-05-18',
    tanggalSidi: '1985-08-20',
    namaKeluarga: 'Keluarga Robert Simanjuntak',
    hubunganKeluarga: 'Kepala Keluarga',
    pekerjaan: 'Konsultan Teknik',
    createdAt: '2026-01-12'
  },
  {
    id: 'jem-005',
    nomorAnggota: 'GMI-2026-005',
    namaLengkap: 'Dra. Christine Natalia',
    jenisKelamin: 'P',
    tempatLahir: 'Bandar Lampung',
    tanggalLahir: '1974-07-08',
    alamat: 'Jl. Ikan Tenggiri No. 8, Pesawahan',
    noHp: '0813-7200-2202',
    classMeeting: 'Andreas',
    statusKeanggotaan: 'Jemaat Penuh',
    statusPernikahan: 'Menikah',
    golonganDarah: 'AB',
    tanggalBaptis: '1988-12-25',
    tanggalSidi: '1992-06-14',
    namaKeluarga: 'Keluarga Stefanus',
    hubunganKeluarga: 'Istri',
    pekerjaan: 'Dosen',
    createdAt: '2026-01-15'
  },
  {
    id: 'jem-006',
    nomorAnggota: 'GMI-2026-006',
    namaLengkap: 'Paulus Sihombing, S.E.',
    jenisKelamin: 'L',
    tempatLahir: 'Tarutung',
    tanggalLahir: '1979-10-04',
    alamat: 'Jl. Gatot Subroto No. 45, Pahoman',
    noHp: '0812-7300-3303',
    classMeeting: 'Yakobus',
    statusKeanggotaan: 'Jemaat Penuh',
    statusPernikahan: 'Menikah',
    golonganDarah: 'O',
    tanggalBaptis: '1990-04-05',
    tanggalSidi: '1996-05-20',
    namaKeluarga: 'Keluarga Paulus Sihombing',
    hubunganKeluarga: 'Kepala Keluarga',
    pekerjaan: 'Bankir',
    createdAt: '2026-01-18'
  },
  {
    id: 'jem-007',
    nomorAnggota: 'GMI-2026-007',
    namaLengkap: 'dr. Debora Silalahi',
    jenisKelamin: 'P',
    tempatLahir: 'Bandar Lampung',
    tanggalLahir: '1985-02-19',
    alamat: 'Jl. Kartini No. 22, Tanjung Karang',
    noHp: '0811-7400-4404',
    classMeeting: 'Matius',
    statusKeanggotaan: 'Jemaat Penuh',
    statusPernikahan: 'Menikah',
    golonganDarah: 'A',
    tanggalBaptis: '1998-06-12',
    tanggalSidi: '2002-09-08',
    namaKeluarga: 'Keluarga dr. Debora',
    hubunganKeluarga: 'Istri',
    pekerjaan: 'Dokter Spesialis',
    createdAt: '2026-01-20'
  },
  {
    id: 'jem-008',
    nomorAnggota: 'GMI-2026-008',
    namaLengkap: 'David Kurniawan',
    jenisKelamin: 'L',
    tempatLahir: 'Kotabumi',
    tanggalLahir: '1980-12-01',
    alamat: 'Jl. Teuku Umar No. 88, Kedaton',
    noHp: '0813-7500-5505',
    classMeeting: 'Lukas',
    statusKeanggotaan: 'Jemaat Penuh',
    statusPernikahan: 'Menikah',
    golonganDarah: 'B',
    tanggalBaptis: '1995-04-16',
    tanggalSidi: '1999-11-21',
    namaKeluarga: 'Keluarga David Kurniawan',
    hubunganKeluarga: 'Kepala Keluarga',
    pekerjaan: 'Pengusaha',
    createdAt: '2026-02-02'
  },
  {
    id: 'jem-009',
    nomorAnggota: 'GMI-2026-009',
    namaLengkap: 'Opa Samuel Hutagalung',
    jenisKelamin: 'L',
    tempatLahir: 'Sibolga',
    tanggalLahir: '1952-08-15',
    alamat: 'Jl. ZA Pagar Alam No. 10, Rajabasa',
    noHp: '0812-7600-6609',
    classMeeting: 'Yohanes',
    statusKeanggotaan: 'Lansia (Usindah)',
    statusPernikahan: 'Menikah',
    golonganDarah: 'O',
    tanggalBaptis: '1965-03-20',
    tanggalSidi: '1970-07-12',
    namaKeluarga: 'Keluarga Samuel',
    hubunganKeluarga: 'Kepala Keluarga',
    pekerjaan: 'Pensiunan PNS',
    createdAt: '2026-02-10'
  },
  {
    id: 'jem-010',
    nomorAnggota: 'GMI-2026-010',
    namaLengkap: 'Clarissa Novita Sitorus',
    jenisKelamin: 'P',
    tempatLahir: 'Bandar Lampung',
    tanggalLahir: '2004-04-18',
    alamat: 'Jl. Antasari No. 34, Sukabumi',
    noHp: '0813-7700-7711',
    classMeeting: 'Gilead',
    statusKeanggotaan: 'Pemuda/i',
    statusPernikahan: 'Belum Menikah',
    golonganDarah: 'B',
    tanggalBaptis: '2005-01-09',
    tanggalSidi: '2021-08-22',
    namaKeluarga: 'Keluarga Sitorus',
    hubunganKeluarga: 'Anak',
    pekerjaan: 'Mahasiswi Unila',
    createdAt: '2026-02-15'
  },
  {
    id: 'jem-011',
    nomorAnggota: 'GMI-2026-011',
    namaLengkap: 'Daniel Pratama',
    jenisKelamin: 'L',
    tempatLahir: 'Metro',
    tanggalLahir: '2001-09-27',
    alamat: 'Jl. Urip Sumoharjo No. 17, Way Halim',
    noHp: '0812-7800-8812',
    classMeeting: 'Filipi',
    statusKeanggotaan: 'Katekisasi',
    statusPernikahan: 'Belum Menikah',
    golonganDarah: 'O',
    namaKeluarga: 'Keluarga Pratama',
    hubunganKeluarga: 'Anak',
    pekerjaan: 'Software Engineer',
    createdAt: '2026-03-01'
  },
  {
    id: 'jem-012',
    nomorAnggota: 'GMI-2026-012',
    namaLengkap: 'Yulius Pranata',
    jenisKelamin: 'L',
    tempatLahir: 'Bandar Lampung',
    tanggalLahir: '1976-11-30',
    alamat: 'Jl. Soekarno Hatta No. 50, Panjang',
    noHp: '0811-7900-9909',
    classMeeting: 'Sinai',
    statusKeanggotaan: 'Jemaat Penuh',
    statusPernikahan: 'Menikah',
    golonganDarah: 'A',
    tanggalBaptis: '1987-04-20',
    tanggalSidi: '1994-06-19',
    namaKeluarga: 'Keluarga Pranata',
    hubunganKeluarga: 'Kepala Keluarga',
    pekerjaan: 'Logistik Maritim',
    createdAt: '2026-03-10'
  },
  {
    id: 'jem-013',
    nomorAnggota: 'GMI-2026-013',
    namaLengkap: 'Oma Martha Tobing',
    jenisKelamin: 'P',
    tempatLahir: 'Balige',
    tanggalLahir: '1949-06-17',
    alamat: 'Jl. Diponegoro No. 104, Bumi Waras',
    noHp: '0813-7000-0015',
    classMeeting: 'Bethel',
    statusKeanggotaan: 'Lansia (Usindah)',
    statusPernikahan: 'Duda/Janda',
    golonganDarah: 'AB',
    tanggalBaptis: '1960-12-25',
    tanggalSidi: '1967-08-15',
    namaKeluarga: 'Keluarga Tobing',
    hubunganKeluarga: 'Kepala Keluarga',
    pekerjaan: 'Pensiunan',
    createdAt: '2026-03-12'
  }
];

export const INITIAL_KEGIATAN: KegiatanItem[] = [
  {
    id: 'keg-01',
    namaKegiatan: 'Ibadah Minggu I & Perjamuan Kudus',
    kategori: 'Ibadah Minggu',
    tanggal: '2026-10-25',
    waktu: '06:30 WIB & 09:00 WIB',
    lokasi: 'Gedung Gereja GMI Immanuel Bandar Lampung',
    penanggungJawab: 'Pdt. Johanes Supard & Majelis Jemaat',
    deskripsi: 'Ibadah Minggu dengan tema "Hidup yang Berbuah Manis dan Menyukakan Tuhan". Disediakan pelayanan Perjamuan Kudus untuk seluruh jemaat sidi.',
    status: 'Akan Datang'
  },
  {
    id: 'keg-02',
    namaKegiatan: 'Persekutuan Doa Pagi Sepekan',
    kategori: 'Persekutuan Doa Pagi',
    tanggal: '2026-10-28',
    waktu: '05:30 - 06:30 WIB',
    lokasi: 'Ruang Doa Lantai 2 GMI Immanuel',
    penanggungJawab: 'Diak. Maria Christina & Tim Doa',
    deskripsi: 'Doa syafaat bersama untuk pemulihan jemaat yang sakit, bangsa dan negara, serta pelayanan gereja ke depan.',
    status: 'Akan Datang'
  },
  {
    id: 'keg-03',
    namaKegiatan: 'Ibadah Persekutuan Usia Indah (Usindah)',
    kategori: 'Ibadah Usindah',
    tanggal: '2026-10-29',
    waktu: '10:00 - 12:00 WIB',
    lokasi: 'Aula Serbaguna GMI Immanuel',
    penanggungJawab: 'Pdt. Andreas Sumarsono & Sie Usindah',
    deskripsi: 'Kebaktian khusus kaum lansia yang dirangkai dengan pemeriksaan kesehatan gratis (tensi darah & cek gula darah).',
    status: 'Akan Datang'
  },
  {
    id: 'keg-04',
    namaKegiatan: 'Ibadah Pemuda P3MI Youth Explosion',
    kategori: 'Ibadah P3MI',
    tanggal: '2026-10-31',
    waktu: '19:00 - 21:00 WIB',
    lokasi: 'Gedung Gereja Utama GMI Immanuel',
    penanggungJawab: 'Ketua P3MI Kevin Jonathan & Tim Musik',
    deskripsi: 'Ibadah pemuda bulanan penuh puji-pujian kontemporer, persekutuan akrab, dan sharing firman yang relevan bagi generasi muda.',
    status: 'Akan Datang'
  },
  {
    id: 'keg-05',
    namaKegiatan: 'Kegiatan Pembinaan Karakter Remaja PRMI',
    kategori: 'Kegiatan PRMI',
    tanggal: '2026-11-07',
    waktu: '16:00 - 18:00 WIB',
    lokasi: 'Ruang Pemuda Lantai 3',
    penanggungJawab: 'Pembina PRMI Clarissa Sitorus',
    deskripsi: 'Workshop interaktif remaja gereja: Bijak bermedia sosial dan menjadi saksi Kristus di lingkungan sekolah.',
    status: 'Akan Datang'
  },
  {
    id: 'keg-06',
    namaKegiatan: 'Rapat Kerja Panitia Perayaan Natal 2026',
    kategori: 'Perayaan Natal',
    tanggal: '2026-11-08',
    waktu: '11:30 WIB (Bada Ibadah II)',
    lokasi: 'Ruang Rapat Konsistori GMI Immanuel',
    penanggungJawab: 'Ketua Panitia Natal Bpk. Paulus Sihombing',
    deskripsi: 'Koordinasi pemantapan tema, anggaran operasional, gladi liturgi, dan pembagian paket kasih Natal bagi masyarakat sekitar.',
    status: 'Akan Datang'
  }
];

export const INITIAL_PENGUMUMAN: PengumumanItem[] = [
  {
    id: 'peng-01',
    judul: 'Tema Khotbah & Pelayan Firman Bulan Oktober 2026',
    kategori: 'Tema & Jadwal Khotbah',
    isi: `Jadwal Khotbah Bulan Oktober 2026 di GMI Immanuel Bandar Lampung:
1. Minggu, 4 Oktober 2026: “Keluarga Kristen sebagai Garam dan Terang Dunia” (Roma 12:18) - Pdt. Andreas Sumarsono
2. Minggu, 11 Oktober 2026: “Ekologi Gereja: Merawat Rumah Kita Bersama” (Matius 25:35–36 dan 2 Korintus 9:12) - Pdt. Eirene Marheni Laluba
3. Minggu, 18 Oktober 2026: “Jangan Wariskan Lukamu” (Efesus 4:31–32) - Pdt. Aprizen F. Marbun [Minggu P3MI]
4. Minggu, 25 Oktober 2026: “Hidup yang Berbuah Manis dan Menyukakan Tuhan” (Filipi 3:4b–14) - Pdt. Johanes Supard

Mari persiapkan hati dan Alkitab saudara dalam setiap persekutuan kudus.`,
    tanggalPublikasi: '2026-10-01',
    penulis: 'Sekretariat GMI',
    status: 'Dipublikasikan'
  },
  {
    id: 'peng-02',
    judul: 'Pendaftaran Kelas Katekisasi & Calon Baptisan Dewasa Angkatan II 2026',
    kategori: 'Informasi Pelayanan',
    isi: 'Diumumkan kepada jemaat dan simpatisan yang rindu menerima Baptisan Kudus atau Pengakuan Percaya (Sidi), pendaftaran Kelas Katekisasi angkatan II dibuka hingga 15 November 2026 melalui Sekretariat atau aplikasi GMI Digital ini.',
    tanggalPublikasi: '2026-10-15',
    penulis: 'Diak. Maria Christina',
    status: 'Dipublikasikan'
  },
  {
    id: 'peng-03',
    judul: 'Ucapan Selamat Hari Ulang Tahun Jemaat Pekan Ini (20 - 26 Oktober)',
    kategori: 'Ucapan Ulang Tahun',
    isi: 'Majelis Jemaat dan seluruh jemaat GMI Immanuel Bandar Lampung mengucapkan Selamat Ulang Tahun kepada: 1. Ibu Sylvia Anggraini (CM Andreas) 2. Bpk. David Kurniawan (CM Lukas) 3. Sdri. Clarissa Novita (CM Gilead). Kiranya panjang umur, hikmat ilahi, dan berkat berkelimpahan selalu menyertai saudara.',
    tanggalPublikasi: '2026-10-20',
    penulis: 'Komisi Warta Jemaat',
    status: 'Dipublikasikan'
  },
  {
    id: 'peng-04',
    judul: 'Berita Duka Cita: Telah Berpulang ke Rumah Bapa di Surga',
    kategori: 'Berita Duka Cita',
    isi: 'Telah dipanggil Bapa di surga, Ibu Elizabeth Situmeang (usia 78 tahun, anggota Class Meeting Samaria) pada hari Selasa, 20 Oktober 2026. Ibadah penghiburan telah dilaksanakan dan pemakaman berlangsung di TPU Kebun Jahe. Kiranya Roh Kudus memberi kekuatan bagi keluarga yang ditinggalkan.',
    tanggalPublikasi: '2026-10-21',
    penulis: 'Majelis Jemaat GMI',
    status: 'Dipublikasikan'
  },
  {
    id: 'peng-05',
    judul: 'Persiapan Proposal Natal & Anggaran Panitia 2026',
    kategori: 'Info Penting',
    isi: 'Draft rincian anggaran kegiatan bakti sosial natal dan operasional panggung ibadah malam natal telah disiapkan oleh panitia.',
    tanggalPublikasi: '2026-10-22',
    penulis: 'Bpk. Paulus Sihombing',
    status: 'Draf'
  }
];

export const INITIAL_SURAT: SuratItem[] = [
  {
    id: 'surat-001',
    nomorSurat: '018/GMI-IBL/SKJ/X/2026',
    jenisSurat: 'Surat Keterangan Jemaat',
    tanggalSurat: '2026-10-22',
    perihal: 'Surat Keterangan Keanggotaan Jemaat',
    status: 'Disetujui',
    dibuatOleh: 'Diak. Maria Christina',
    createdAt: '2026-10-22T08:30:00Z',
    updatedAt: '2026-10-22T14:15:00Z',
    namaJemaat: 'Hendra Wijaya',
    nomorAnggota: 'GMI-2026-001',
    classMeeting: 'Andreas',
    tempatLahir: 'Bandar Lampung',
    tanggalLahir: '1982-05-14',
    alamat: 'Jl. Ikan Tenggiri No. 15, Teluk Betung, Bandar Lampung',
    noHp: '0852-9876-5432',
    keperluan: 'Kelengkapan berkas administrasi dan mutasi dinas keluarga ke Jakarta',
    tujuanSurat: 'Pimpinan Perusahaan / Instansi Terkait',
    disetujuiOleh: 'Pdt. Johanes Supard, M.Th',
    tanggalDisetujui: '2026-10-22',
    catatanPendeta: 'Surat telah diverifikasi sesuai data buku induk jemaat GMI Immanuel.',
    riwayatStatus: [
      { status: 'Draf', waktu: '2026-10-22 08:30 WIB', oleh: 'Diak. Maria Christina', catatan: 'Draft surat dibuat dari template' },
      { status: 'Menunggu Pemeriksaan', waktu: '2026-10-22 09:10 WIB', oleh: 'Diak. Maria Christina', catatan: 'Diajukan ke Pendeta untuk pemeriksaan' },
      { status: 'Disetujui', waktu: '2026-10-22 14:15 WIB', oleh: 'Pdt. Johanes Supard, M.Th', catatan: 'Disetujui dan siap diterbitkan/dicetak' }
    ]
  },
  {
    id: 'surat-002',
    nomorSurat: '019/GMI-IBL/SB/X/2026',
    jenisSurat: 'Surat Baptisan',
    tanggalSurat: '2026-10-23',
    perihal: 'Kutipan Surat Baptisan Kudus',
    status: 'Menunggu Pemeriksaan',
    dibuatOleh: 'Diak. Maria Christina',
    createdAt: '2026-10-23T10:00:00Z',
    updatedAt: '2026-10-23T10:15:00Z',
    namaJemaat: 'Kevin Jonathan Wijaya',
    nomorAnggota: 'GMI-2026-003',
    classMeeting: 'Andreas',
    tempatLahir: 'Bandar Lampung',
    tanggalLahir: '2008-11-12',
    alamat: 'Jl. Ikan Tenggiri No. 15, Teluk Betung',
    tanggalBaptis: '2009-02-15',
    namaPendetaBaptis: 'Pdt. Andreas Sumarsono',
    nomorStbBaptis: 'BPT-2009-042',
    tujuanSurat: 'Majelis Jemaat GMI / Pihak Terkait',
    keperluan: 'Pendaftaran lanjutan kelas Sidi dan pendidikan tinggi',
    riwayatStatus: [
      { status: 'Draf', waktu: '2026-10-23 10:00 WIB', oleh: 'Diak. Maria Christina' },
      { status: 'Menunggu Pemeriksaan', waktu: '2026-10-23 10:15 WIB', oleh: 'Diak. Maria Christina', catatan: 'Mohon persetujuan dari Bapak Pendeta' }
    ]
  },
  {
    id: 'surat-003',
    nomorSurat: '020/GMI-IBL/SKP/X/2026',
    jenisSurat: 'Surat Keterangan Pernikahan',
    tanggalSurat: '2026-10-23',
    perihal: 'Surat Keterangan Status Pernikahan Gerejawi',
    status: 'Perlu Revisi',
    dibuatOleh: 'Diak. Maria Christina',
    createdAt: '2026-10-23T11:00:00Z',
    updatedAt: '2026-10-23T13:40:00Z',
    namaJemaat: 'Clarissa Novita Sitorus',
    nomorAnggota: 'GMI-2026-010',
    classMeeting: 'Gilead',
    tempatLahir: 'Bandar Lampung',
    tanggalLahir: '2004-04-18',
    alamat: 'Jl. Antasari No. 34, Sukabumi, Bandar Lampung',
    namaPasangan: 'Samuel Bagas Hutagaol',
    tanggalPernikahan: '2026-12-12',
    gerejaTujuan: 'GKI Menteng Jakarta',
    tujuanSurat: 'Majelis Jemaat GKI Menteng Jakarta',
    keperluan: 'Pelaksanaan Pemberkatan Nikah Kudus di gereja calon mempelai pria',
    catatanRevisi: 'Harap lampirkan fotokopi surat sidi kedua mempelai dan koreksi ejaan nama marga calon mempelai pria.',
    riwayatStatus: [
      { status: 'Draf', waktu: '2026-10-23 11:00 WIB', oleh: 'Diak. Maria Christina' },
      { status: 'Menunggu Pemeriksaan', waktu: '2026-10-23 11:20 WIB', oleh: 'Diak. Maria Christina' },
      { status: 'Perlu Revisi', waktu: '2026-10-23 13:40 WIB', oleh: 'Pdt. Johanes Supard, M.Th', catatan: 'Harap lampirkan fotokopi surat sidi kedua mempelai dan koreksi ejaan nama marga calon mempelai pria.' }
    ]
  },
  {
    id: 'surat-004',
    nomorSurat: '021/GMI-IBL/STP/X/2026',
    jenisSurat: 'Surat Tugas Pelayanan',
    tanggalSurat: '2026-10-21',
    perihal: 'Surat Tugas Pelayanan Pujian dan Musik Natal Distrik',
    status: 'Selesai / Diarsipkan',
    dibuatOleh: 'Diak. Maria Christina',
    createdAt: '2026-10-21T09:00:00Z',
    updatedAt: '2026-10-21T16:00:00Z',
    namaJemaat: 'Daniel Pratama',
    nomorAnggota: 'GMI-2026-011',
    classMeeting: 'Filipi',
    namaKegiatan: 'Konser Pujian Pra-Natal Distrik 1 Wilayah I',
    tanggalKegiatan: '2026-11-20',
    waktuKegiatan: '17:00 WIB',
    tempatKegiatan: 'Gereja Methodist Indonesia Pematang Siantar / Wilayah I',
    peranPelayanan: 'Pemusik Keyboard & Sound Engineer Delegasi Jemaat Immanuel',
    tujuanSurat: 'Panitia Natal Distrik 1 Wilayah I',
    disetujuiOleh: 'Pdt. Johanes Supard, M.Th',
    tanggalDisetujui: '2026-10-21',
    riwayatStatus: [
      { status: 'Draf', waktu: '2026-10-21 09:00 WIB', oleh: 'Diak. Maria Christina' },
      { status: 'Menunggu Pemeriksaan', waktu: '2026-10-21 11:00 WIB', oleh: 'Diak. Maria Christina' },
      { status: 'Disetujui', waktu: '2026-10-21 14:00 WIB', oleh: 'Pdt. Johanes Supard, M.Th' },
      { status: 'Selesai / Diarsipkan', waktu: '2026-10-21 16:00 WIB', oleh: 'Diak. Maria Christina', catatan: 'Surat fisik telah diserahkan dan diarsipkan' }
    ]
  }
];

export const INITIAL_WARTA: WartaJemaatItem = {
  id: 'warta-2026-43',
  nomorEdisi: 'No. 43/WJ-GMI/X/2026',
  tanggalMinggu: 'Minggu, 25 Oktober 2026',
  temaMinggu: 'Hidup yang Berbuah Manis dan Menyukakan Tuhan (Filipi 3:4b–14)',
  pelayanFirman: 'Pdt. Johanes Supard, M.Th',
  liturgiRingkas: [
    '1. Saat Teduh & Panggilan Beribadah (Votum & Salam)',
    '2. Nyanyian Bersama: NR No. 3 "Hormat Bagi Bapa serta Anak dan Rohulkudus"',
    '3. Doa Pengakuan Dosa & Berita Pengampunan',
    '4. Petunjuk Hidup Baru & Pengakuan Iman Rasuli',
    '5. Pembacaan Alkitab & Khotbah: Filipi 3:4b-14',
    '6. Persembahan Syukur & Doa Syafaat',
    '7. Pelayanan Sakramen Perjamuan Kudus',
    '8. Pengutusan & Berkat'
  ],
  petugasPelayanan: [
    { peran: 'Liturgis / Majelis Pendamping', nama: 'Bpk. Paulus Sihombing, S.E.' },
    { peran: 'Pemusik / Keyboardist', nama: 'Sdr. Daniel Pratama' },
    { peran: 'Song Leader', nama: 'Sdri. Clarissa Novita & Ibu Christine' },
    { peran: 'Kolektan', nama: 'Majelis Class Meeting Andreas & Samaria' },
    { peran: 'Multimedia & Sound', nama: 'Tim Multimedia P3MI' },
    { peran: 'Penyambut Jemaat (Usher)', nama: 'Ibu Ruth Sitorus & Bpk. Markus' }
  ],
  ucapanUlangTahun: [
    { nama: 'Ibu Sylvia Anggraini', tanggal: '20 Oktober', classMeeting: 'Andreas' },
    { nama: 'Bpk. David Kurniawan', tanggal: '22 Oktober', classMeeting: 'Lukas' },
    { nama: 'Sdri. Clarissa Novita Sitorus', tanggal: '24 Oktober', classMeeting: 'Gilead' },
    { nama: 'Kevin Jonathan Wijaya', tanggal: '26 Oktober', classMeeting: 'Andreas' }
  ],
  beritaDuka: 'Majelis Jemaat menyampaikan rasa duka cita mendalam atas berpulangnya Ibu Elizabeth Situmeang (CM Samaria) ke pangkuan Bapa di surga pada Selasa, 20 Oktober 2026. Tuhan menguatkan keluarga yang berduka.',
  laporanKeuangan: {
    persembahanKolekte: 'Rp 4.850.000',
    persembahanPersepuluhan: 'Rp 8.400.000',
    persembahanSyukur: 'Rp 2.150.000',
    totalMingguLalu: 'Rp 15.400.000'
  },
  pengumumanSepekan: [
    'Ibadah Usindah (Usia Indah) dilaksanakan Kamis, 29 Oktober 2026 Pukul 10.00 WIB di Aula Serbaguna beserta cek tensi gratis.',
    'Ibadah P3MI Youth Explosion Sabtu, 31 Oktober 2026 Pukul 19.00 WIB. Mengundang segenap pemuda dan remaja.',
    'Pendaftaran Baptisan Dewasa dan Sidi dibuka hingga 15 November 2026 melalui Sekretariat atau aplikasi GMI Digital.'
  ],
  status: 'Dipublikasikan'
};

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-001',
    waktu: '2026-10-23 13:40 WIB',
    aktor: 'Pdt. Johanes Supard, M.Th',
    peran: 'pendeta',
    tindakan: 'Meminta Revisi Surat',
    kategori: 'Persuratan',
    detail: 'Meminta revisi pada Surat Keterangan Pernikahan No. 020/GMI-IBL/SKP/X/2026 atas nama Clarissa Novita'
  },
  {
    id: 'log-002',
    waktu: '2026-10-23 10:15 WIB',
    aktor: 'Diak. Maria Christina',
    peran: 'sekretaris',
    tindakan: 'Mengajukan Pemeriksaan Surat',
    kategori: 'Persuratan',
    detail: 'Mengajukan Surat Baptisan No. 019/GMI-IBL/SB/X/2026 atas nama Kevin Jonathan Wijaya'
  },
  {
    id: 'log-003',
    waktu: '2026-10-22 14:15 WIB',
    aktor: 'Pdt. Johanes Supard, M.Th',
    peran: 'pendeta',
    tindakan: 'Menyetujui Surat',
    kategori: 'Persuratan',
    detail: 'Menyetujui Surat Keterangan Jemaat No. 018/GMI-IBL/SKJ/X/2026 atas nama Hendra Wijaya'
  },
  {
    id: 'log-004',
    waktu: '2026-10-22 09:00 WIB',
    aktor: 'Administrator GMI',
    peran: 'admin',
    tindakan: 'Memperbarui Jadwal Khotbah',
    kategori: 'Kegiatan',
    detail: 'Mengonfirmasi jadwal dan tema khotbah bulan Oktober 2026'
  },
  {
    id: 'log-005',
    waktu: '2026-10-20 08:30 WIB',
    aktor: 'Administrator GMI',
    peran: 'admin',
    tindakan: 'Pembaruan Data Jemaat',
    kategori: 'Jemaat',
    detail: 'Menambahkan data keanggotaan jemaat baru pada Class Meeting Filipi'
  }
];

export const INITIAL_PERMOHONAN: PermohonanSuratJemaat[] = [
  {
    id: 'perm-01',
    namaJemaat: 'Hendra Wijaya',
    noHp: '0852-9876-5432',
    classMeeting: 'Andreas',
    jenisSurat: 'Surat Keterangan Jemaat',
    keperluan: 'Untuk mutasi dinas dan pendaftaran sekolah anak',
    tanggalDiajukan: '2026-10-21',
    status: 'Selesai'
  },
  {
    id: 'perm-02',
    namaJemaat: 'Clarissa Novita Sitorus',
    noHp: '0813-7700-7711',
    classMeeting: 'Gilead',
    jenisSurat: 'Surat Keterangan Pernikahan',
    keperluan: 'Pemberkatan pernikahan di gereja lain',
    tanggalDiajukan: '2026-10-23',
    status: 'Diproses Sekretaris'
  }
];

export const CHURCH_PROFILE = {
  nama: 'GEREJA METHODIST INDONESIA (GMI)',
  jemaat: 'JEMAAT IMMANUEL BANDAR LAMPUNG',
  wilayah: 'Distrik 1 Wilayah I',
  alamat: 'Jl. Ikan Hiu No. 3, Teluk Betung, Bandar Lampung, Lampung 35221',
  telepon: '(0721) 481234',
  whatsapp: '0812-7890-1234',
  email: 'gmi.immanuel.bdl@gmail.com',
  instagram: '@gmi.immanuel.bdl',
  instagramUrl: 'https://www.instagram.com/gmi.immanuel.bdl/',
  youtubeNama: 'GMI IMMANUEL BANDAR LAMPUNG',
  youtubeUrl: 'https://www.youtube.com/@gmiimmanuelbandarlampung',
  rekeningBank: [
    { bank: 'BCA', noRek: '023-456-7890', an: 'GMI Immanuel Bandar Lampung' },
    { bank: 'Mandiri', noRek: '114-00-1234567-8', an: 'GMI Immanuel Bdl' }
  ]
};
