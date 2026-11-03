# GMI Digital — Sistem Informasi Manajemen Gereja
**Gereja Methodist Indonesia (GMI) Jemaat Immanuel Bandar Lampung**
*Distrik 1 Wilayah I*

---

## 📖 Deskripsi Aplikasi
**GMI Digital** adalah Sistem Informasi Manajemen Gereja berbasis web yang dirancang khusus untuk memodernisasi dan mengintegrasikan administrasi, persuratan otomatis, basis data jemaat, jadwal peribadahan, pengumuman, dan publikasi Warta Jemaat mingguan di **GMI Immanuel Bandar Lampung**.

Sistem ini didesain responsif untuk laptop, tablet, dan smartphone, serta mendukung 4 peran pengguna dengan tingkat kewenangan yang aman:
1. **Admin**: Pengelolaan menyeluruh terhadap seluruh sistem, data jemaat, Class Meeting, jadwal, pengumuman, akun pengguna, dan konfigurasi aplikasi.
2. **Sekretaris Gereja**: Pembuatan surat resmi otomatis dari template, generator nomor surat anti-duplikat, pengajuan surat ke Pendeta, serta pencetakan/pengunduhan PDF.
3. **Pendeta**: Memeriksa surat yang menunggu pengesahan, menyetujui, meminta catatan revisi, atau menolak surat, serta memantau jadwal pelayanan dan khotbah.
4. **Jemaat**: Akses cepat dengan memilih Class Meeting (CM) tanpa kata sandi yang rumit, melihat jadwal ibadah, tema khotbah, warta jemaat mingguan, dan mengajukan permohonan surat secara online.

---

## 🎨 Identitas & Desain
- **Warna Utama**: Deep Navy (`#0B2545`, `#133E87`), Bersih (`#F8FAFC`, `#FFFFFF`), Aksen Emas Elegan (`#D97706`, `#F59E0B`), dan Merah Aksen Methodist (`#DC2626`).
- **Logo Resmi**: Lambang Salib dan Api Roh Kudus khas Gereja Methodist Indonesia dengan tipografi *GMI IMMANUEL BANDAR LAMPUNG*.
- **Kop Surat Resmi**: Terintegrasi pada seluruh dokumen cetak A4 sesuai tata persuratan baku gerejawi.

---

## 🔑 Akun & Akses Pengguna
Akun pengurus yang tersedia:
- **Admin**: Username: `admin`
- **Sekretaris**: Username: `sekretaris`
- **Pendeta**: Username: `pendeta`
- **Jemaat**: Cukup pilih nama **Class Meeting (CM)** pada form masuk jemaat (misal: *Andreas, Samaria, Matius, dsb.*) dan langsung dapat mengakses sistem.

> *Tersedia pula menu tombol peralihan cepat (1-Click Role Switcher) di bagian pojok kanan atas layar untuk mempermudah simulasi peran.*

---

## 📋 Fitur Utama Sistem

### 1. 10 Kelompok Class Meeting (CM)
Pengelompokan jemaat berbasis kelas sel Methodist:
1. **Samaria**
2. **Andreas**
3. **Yakobus**
4. **Matius**
5. **Lukas**
6. **Yohanes**
7. **Gilead**
8. **Filipi**
9. **Sinai**
10. **Bethel**

### 2. Manajemen Persuratan Otomatis (6 Jenis Surat)
- Surat Keterangan Jemaat (SKJ)
- Surat Baptisan (SB)
- Surat Rekomendasi (SR)
- Surat Undangan Kegiatan (SUK)
- Surat Tugas Pelayanan (STP)
- Surat Keterangan Pernikahan (SKP)
- **Format Nomor Surat Otomatis**: `[No]/GMI-IBL/[KODE]/[BULAN_ROMAWI]/[TAHUN]` (contoh: `022/GMI-IBL/SKJ/X/2026`)
- **Alur Persetujuan**: `Draf` &rarr; `Menunggu Pemeriksaan` &rarr; `Perlu Revisi` (dengan catatan) / `Disetujui` &rarr; `Selesai / Diarsipkan`
- **Cetak & Unduh PDF**: Cetak langsung berstandar A4 fisik dengan tanda tangan dan stempel digital terverifikasi.

### 3. Data Jemaat Terpadu
- Nomor Anggota unik (`GMI-2026-xxx`)
- Filter berdasarkan Class Meeting dan Status Keanggotaan
- Pencarian cepat & modal kartu induk jemaat
- Fitur Ekspor Data ke file CSV

### 4. Tema Khotbah & Jadwal Ibadah
Menampilkan tema khotbah resmi bulan Oktober 2026:
- **Minggu, 4 Okt 2026**: “Keluarga Kristen sebagai Garam dan Terang Dunia” (Roma 12:18) — Pdt. Andreas Sumarsono
- **Minggu, 11 Okt 2026**: “Ekologi Gereja: Merawat Rumah Kita Bersama” (Mat 25:35–36, 2 Kor 9:12) — Pdt. Eirene Marheni Laluba
- **Minggu, 18 Okt 2026**: “Jangan Wariskan Lukamu” (Efesus 4:31–32) — Pdt. Aprizen F. Marbun (Minggu P3MI)
- **Minggu, 25 Okt 2026**: “Hidup yang Berbuah Manis dan Menyukakan Tuhan” (Filipi 3:4b–14) — Pdt. Johanes Supard

### 5. Warta Jemaat Digital
- Tata ibadah dan liturgi
- Petugas pelayanan (Liturgis, Pemusik, Song Leader, Kolektan, Multimedia, Usher)
- Ucapan ulang tahun jemaat mingguan (berdasarkan CM)
- Laporan persembahan & kolekte
- Warta duka cita & pengumuman sepekan
- Cetak / simpan sebagai PDF

### 6. Media Sosial Resmi
- **Instagram**: `@gmi.immanuel.bdl` &rarr; [https://www.instagram.com/gmi.immanuel.bdl/](https://www.instagram.com/gmi.immanuel.bdl/)
- **YouTube**: `GMI IMMANUEL BANDAR LAMPUNG` (Live Streaming Ibadah)

### 7. Laporan, Arsip & Audit Log
- Statistik distribusi surat dan anggota per Class Meeting
- Pencatatan aktivitas (*Audit Trail*) setiap kali surat dibuat, disetujui, direvisi, atau dihapus.

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Pastikan Node.js terinstal** (v18+ direkomendasikan):
   ```bash
   node -v
   npm -v
   ```

2. **Jalankan Aplikasi Development**:
   ```bash
   npm run dev
   ```

3. **Buka di Browser**:
   Kunjungi [http://localhost:3000](http://localhost:3000)

4. **Build untuk Produksi**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🗄️ Skema Database Supabase / PostgreSQL
Skrip SQL lengkap untuk pembuatan tabel, relasi, dan *Row Level Security (RLS)* dapat dilihat langsung di menu **Pengaturan & SQL** dalam aplikasi, atau dijalankan langsung di SQL Editor Supabase.

---
© 2026 Gereja Methodist Indonesia (GMI) Immanuel Bandar Lampung.
