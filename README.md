# PUSAT INFORMASI GRUP WHATSAPP 🎓📱

Website modern, profesional, responsif, dan elegan yang berfungsi sebagai direktori resmi kumpulan tautan grup WhatsApp mahasiswa. Pengguna dapat mencari, menyaring, dan bergabung langsung ke grup WhatsApp sesuai dengan Program Studi, UT Daerah, Angkatan, maupun Bimbingan Artikel Ilmiah.

---

## 🌟 Fitur Utama

### 1. Landing Page & Hero Modern
- Desain minimalis dan bersih dengan sentuhan warna hijau khas WhatsApp (`#25D366`), putih, dan aksen abu-abu elegan.
- Headline inspiratif: *"Temukan Grup WhatsApp Sesuai Program Studimu"*.
- Call-to-action interaktif dengan tombol *"Lihat Daftar Grup"* dan ilustrasi mockup komunitas mahasiswa.
- Quick counter: jumlah grup aktif, wilayah daerah, dan mahasiswa terhubung.

### 2. Direktori Grup Lengkap (82+ Grup Resmi)
- **Program Studi (26 Grup)**: Manajemen, PGSD, Ilmu Komunikasi, Ilmu Hukum, Sistem Informasi, Administrasi Publik/Bisnis, Akuntansi, Sains Data, dll.
- **UT Daerah (37 Grup)**: Jakarta, Bandung, Surabaya, Malang, Jogja, Medan, Makassar, Papua, hingga UT Luar Negeri.
- **Umum & CAMABA (4 Grup)**: CAMABA UT 2027, Universitas Terbuka, Komunikasi Mahasiswa All Prodi.
- **Angkatan (8 Grup)**: 2023 Ganjil/Genap hingga 2026 Ganjil/Genap.
- **Artikel Ilmiah / ARIL (7 Grup)**: ARIL Bisnis, Manajemen, Akuntansi, Hukum, Ilkom, PGSD, dan Umum.

### 3. Pencarian & Filter Instan (Real-Time)
- Pencarian instan berdasarkan nama prodi, nama grup, atau kata kunci (tanpa reload halaman).
- Tab kategori: *Semua, Program Studi, UT Daerah, Umum & CAMABA, Angkatan, Artikel Ilmiah*.
- Filter multi-dimensi: Fakultas/Afiliasi regional dan Jenjang Pendidikan (S1, Diploma, Semua Jenjang).
- Pengurutan: *Nama (A-Z, Z-A)*, *Anggota Terbanyak (Populer)*, dan *Terbaru*.
- Indikator counter: *"Menampilkan X dari Y grup"*.

### 4. Kartu & Modal Detail Grup
- Kartu informatif dengan badge kategori, estimasi anggota, dan badge "Baru".
- Tombol **"Salin Link"** dengan animasi dan notifikasi toast.
- Tombol utama **"Gabung Grup WhatsApp"** dengan ikon WhatsApp yang langsung mengarahkan ke link undangan resmi WhatsApp.
- Modal detail menyajikan:
  - Deskripsi lengkap
  - Informasi & Tujuan Grup
  - Aturan dan tata tertib komunitas
  - Salin tautan dan tombol bergabung

### 5. Dashboard Administrator Terproteksi
- Dilindungi kata sandi akses (default demo: `admin123`).
- Manajemen CRUD Grup lengkap:
  - Tambah grup baru dengan formulir modal terintegrasi.
  - Ubah informasi nama, prodi, fakultas, jenjang, deskripsi, tujuan, dan aturan.
  - Hapus grup dengan konfirmasi keamanan.
  - Toggle switch untuk mengaktifkan / menonaktifkan grup seketika.
  - Atur urutan prioritas tampilan.
- **Validasi Tautan WhatsApp**: Memastikan setiap input link berformat valid (`https://chat.whatsapp.com/...`).
- Tombol **Reset Data Bawaan** untuk memulihkan seluruh grup awal jika diperlukan.

### 6. Dukungan Database Supabase & LocalStorage
- **Zero-Config Out-of-the-Box**: Menggunakan LocalStorage persisten yang telah terisi seluruh 82+ grup.
- **Supabase Ready**: Tersedia skrip SQL dan konfigurasi `@supabase/supabase-js`.
- Tab khusus di Dashboard Admin untuk melihat status koneksi dan menyalin skrip SQL Supabase.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Effects**: Canvas Confetti & CSS Transitions
- **Database**: [Supabase](https://supabase.com/) & Browser LocalStorage Fallback

---

## 🚀 Panduan Menjalankan Proyek

### 1. Prasyarat
- Node.js versi 18+ atau 20+
- npm atau pnpm

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Akses di browser: `http://localhost:5173`

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil build siap disebarkan di folder `dist/`.

---

## 🔑 Kredensial Administrator Demo
- **URL**: Klik tombol **Admin Login** di pojok kanan atas navbar
- **Password**: `admin123` *(atau `adminut2027`)*

---

## 🗄️ Menghubungkan ke Supabase (Opsional)
1. Buat project di [Supabase](https://supabase.com/).
2. Buka menu **SQL Editor**, salin isi dari file `src/data/schema.sql`, lalu jalankan.
3. Buat file `.env` di folder utama:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Jalankan ulang dev server (`npm run dev`). Sistem akan otomatis beralih ke Supabase PostgreSQL!

