# Product Requirements Document (PRD)
## Birthday Surprise Website — "Lilies for Ley"

**Versi:** 1.0  
**Tanggal:** 6 Juni 2026  
**Author:** Daffa  
**Status:** Draft

---

## 1. Overview

### 1.1 Ringkasan Produk
Website satu halaman (single-page) berbasis HTML/CSS/JS yang berfungsi sebagai hadiah digital ulang tahun yang personal, interaktif, dan memorable untuk pacar pembuat website. Website ini tidak memerlukan framework berat — cukup vanilla JS — dan dapat di-deploy gratis via **Vercel** atau **GitHub Pages**.

### 1.2 Tujuan
- Memberikan pengalaman ulang tahun yang emosional dan tak terlupakan secara digital.
- Menampilkan momen bersama melalui galeri foto interaktif.
- Mengajak penerima untuk berinteraksi aktif (meniup lilin, membuat wish).
- Menyampaikan pesan cinta secara personal dari pembuat.

### 1.3 Target Pengguna
| Peran | Deskripsi |
|---|---|
| **Penerima (End User)** | Pacar pembuat website — pengguna tunggal yang membuka link dan berinteraksi |
| **Pembuat (Admin)** | Daffa — mengisi konten (foto, lagu, pesan, nama) via kode sebelum deploy |

---

## 2. Design & Tema

### 2.1 Visual Identity
| Elemen | Spesifikasi |
|---|---|
| **Tema** | Bunga & romantis — dominasi bunga lily pink |
| **Palet Warna** | Pink (#FFB6C1, #FF69B4, #FFC0CB), Putih (#FFFFFF), Gold aksesori (#FFD700) |
| **Font** | Serif elegan untuk judul (misal: *Playfair Display*), Sans-serif lembut untuk body (misal: *Lato*) |
| **Dekorasi** | Petals/bunga yang melayang di background (CSS animation), efek glitter/sparkle halus |
| **Layout** | Single-page, scroll vertikal, full-width per section |

### 2.2 Musik
- Website akan memainkan **1 file lagu** (MP3) secara otomatis saat halaman dibuka (dengan fallback tombol play karena kebijakan browser).
- Lagu dimasukkan sendiri oleh pembuat (lihat Panduan Pengisian Konten di Bagian 7).

---

## 3. Fitur & Spesifikasi Fungsional

### 3.1 Hero Section
**Deskripsi:** Layar pertama yang muncul saat website dibuka.

**Elemen:**
- Nama penerima (contoh: "Happy 19th Birthday, Ley 🌸")
- Animasi petals bunga lily pink berjatuhan di background
- Musik mulai diputar otomatis / tombol play jika browser memblokir autoplay
- Tombol scroll-down / CTA ke section berikutnya

**Acceptance Criteria:**
- [ ] Nama penerima tampil jelas dan readable
- [ ] Animasi petals berjalan mulus (tidak lag)
- [ ] Musik terputar dalam 2 detik setelah halaman load

---

### 3.2 Galeri Foto Interaktif
**Deskripsi:** Menampilkan 4 foto kenangan bersama dengan efek interaktif.

**Spesifikasi:**
- Menampilkan tepat **4 foto** dalam layout grid atau carousel
- Setiap foto memiliki efek **hover** (zoom halus / glow pink)
- Saat foto diklik → muncul **lightbox** (foto membesar, background gelap transparan)
- Bisa navigasi antar foto di dalam lightbox (prev/next)
- Setiap foto dapat diberi **caption opsional**

**Acceptance Criteria:**
- [ ] 4 foto tampil dengan proporsi konsisten
- [ ] Efek hover berjalan di desktop dan mobile (touch)
- [ ] Lightbox dapat ditutup dengan klik di luar foto atau tombol ✕

---

### 3.3 Fitur "Make a Wish" 🕯️
**Deskripsi:** Form interaktif agar penerima bisa menuliskan harapan/keinginannya.

**Spesifikasi:**

**UI:**
- Section dengan judul bertema (contoh: "What's Your Wish, Ley?")
- Text area dengan placeholder romantis
- Tombol kirim bergaya bunga/pink

**Alur Interaksi:**
1. Penerima mengetik harapannya di text area
2. Klik tombol kirim
3. Harapan dikirim **secara bersamaan** ke dua tujuan:
   - 📧 **Email pembuat** via layanan **Formspree** (gratis, tanpa backend)
   - 💾 **File lokal `wishes.json`** di server (via endpoint kecil Node.js/Express yang berjalan saat development atau di Vercel Serverless Function saat production)
4. Setelah **kedua proses berhasil** → muncul animasi **bunga lily pink bermekaran** di seluruh layar
5. Muncul teks besar: **"I HOPE YOUR WISH COME TRUE"** dengan efek fade-in elegan

**Spesifikasi Teknis:**

*Pengiriman Email (Formspree):*
- Gunakan `fetch()` ke endpoint Formspree
- Method: `POST`
- Field yang dikirim: `wish` (isi harapan), `timestamp` (waktu pengiriman)
- Response sukses → lanjut ke proses simpan lokal

*Penyimpanan File Lokal (`wishes.json`):*
- Harapan disimpan di file `data/wishes.json` dalam struktur array JSON
- Setiap entry berisi: `{ "wish": "...", "timestamp": "...", "id": "..." }`
- Implementasi via **Vercel Serverless Function** (`/api/save-wish.js`) yang menerima `POST` dari frontend dan menulis ke file
- Jika file belum ada → dibuat otomatis
- Jika file sudah ada → entry baru di-append ke array yang ada

> ⚠️ **Catatan penting:** GitHub Pages tidak mendukung serverless function. Gunakan **Vercel** untuk deploy agar fitur simpan file lokal berfungsi.

*Penanganan Error:*
- Jika email gagal → tampil pesan error, jangan lanjut ke simpan file
- Jika simpan file gagal (tapi email sukses) → tetap tampil animasi, tapi log error di console
- Pesan error yang ramah: "Oops, coba lagi ya 🌸"

**Format `wishes.json`:**
```json
[
  {
    "id": "wish_1717632000000",
    "wish": "Isi harapan di sini...",
    "timestamp": "2026-06-06T10:00:00.000Z"
  }
]
```

**Acceptance Criteria:**
- [ ] Email masuk ke inbox pembuat setelah form dikirim
- [ ] Harapan tersimpan di `data/wishes.json` setelah form dikirim
- [ ] Animasi bunga muncul HANYA setelah pengiriman email berhasil
- [ ] Teks "I HOPE YOUR WISH COME TRUE" tampil dengan efek yang elegan
- [ ] Form tidak bisa dikirim kosong (validasi minimal)
- [ ] File `wishes.json` dapat dibaca pembuat untuk melihat semua harapan yang masuk

---

### 3.4 Fitur "Blow the Candle" 🎂
**Deskripsi:** Animasi kue ulang tahun interaktif sebagai highlight emosional website.

**Spesifikasi:**

**Tampilan Awal:**
- Ilustrasi kue ulang tahun (SVG atau CSS art) dengan **lilin berbentuk angka "19"** di atasnya
- Api lilin beranimasi (flicker/bergoyang menggunakan CSS keyframes)
- Ada petunjuk interaksi: "Tap to blow the candles! 🌬️"

**Alur Interaksi:**
1. Penerima mengklik/tap kue atau lilin
2. Api lilin **padam** secara animasi (fade out + efek asap kecil)
3. Setelah lilin padam → muncul animasi **bunga lily pink berterbangan** ke seluruh layar
4. Muncul teks: **"Lilies for Ley"** (font elegan, warna pink/gold) dengan efek fade-in dan sparkle

**Spesifikasi Teknis:**
- Kue dan lilin dibuat dengan **CSS/SVG** (tidak perlu gambar eksternal)
- Angka "19" pada lilin: 2 elemen lilin terpisah membentuk angka 1 dan 9
- Animasi api: CSS `@keyframes` dengan efek flicker
- Transisi padam: opacity fade + scale
- Bunga lily: CSS particles atau DOM elements yang di-spawn saat trigger

**Acceptance Criteria:**
- [ ] Api lilin tampil beranimasi (bergoyang) sebelum diklik
- [ ] Animasi padam terasa mulus dan dramatis
- [ ] Teks "Lilies for Ley" tampil jelas setelah animasi
- [ ] Dapat diinteraksi via touch (mobile-friendly)

---

### 3.5 Pesan dari Pembuat 💌
**Deskripsi:** Section personal berisi pesan cinta/ucapan dari pembuat ke penerima, tersembunyi di balik amplop surat yang harus dibuka terlebih dahulu.

**Tampilan Awal (Sebelum Diklik):**
- Muncul ilustrasi **amplop surat** bergaya romantis (SVG/CSS art) di tengah section
- Amplop berwarna pink dengan detail dekorasi bunga lily
- Ada petunjuk interaksi: *"Tap to open your letter 💌"*
- Amplop sedikit bergoyang (CSS animation) untuk menarik perhatian

**Alur Interaksi:**
1. Penerima mengklik/tap gambar amplop
2. Animasi **amplop terbuka** — tutup amplop terangkat ke atas (CSS flip/unfold)
3. Kertas surat **meluncur keluar** dari dalam amplop ke atas
4. Surat terbuka penuh → tampil isi pesan dengan efek **typewriter** (teks muncul satu per satu)
5. Nama pengirim muncul di akhir dengan efek fade-in

**Tampilan Surat (Setelah Dibuka):**
- Background surat: warna parchment / pink muda (#FFF0F5)
- Border elegan dengan dekorasi bunga di sudut-sudut surat
- Font serif untuk isi pesan (Playfair Display)
- Nama pengirim di bawah: *"— Daffa 🌸"*
- Tombol kecil untuk menutup/menyembunyikan surat kembali (opsional)

**Spesifikasi Teknis:**
- Amplop dibuat dengan **CSS/SVG** (tanpa gambar eksternal)
- Animasi buka amplop: CSS `@keyframes` dengan transform `rotateX` untuk efek lipatan
- Animasi surat keluar: `translateY` dari dalam amplop ke atas
- Efek typewriter: JavaScript `setInterval` yang menampilkan karakter satu per satu
- Typewriter baru berjalan **setelah animasi surat selesai terbuka**

**Acceptance Criteria:**
- [ ] Amplop tampil di tengah section dengan animasi goyang halus
- [ ] Animasi buka amplop terasa mulus dan dramatis saat diklik
- [ ] Surat muncul keluar dari amplop setelah animasi buka selesai
- [ ] Efek typewriter berjalan setelah surat terbuka penuh
- [ ] Pesan dan nama pengirim terbaca jelas di semua ukuran layar
- [ ] Dapat diinteraksi via touch (mobile-friendly)

---

## 4. Alur Pengguna (User Flow)

```
Buka URL
    ↓
[HERO] Nama + musik + animasi petals
    ↓ scroll
[GALERI] 4 foto interaktif
    ↓ scroll
[MAKE A WISH] Tulis harapan → kirim → animasi bunga + teks
    ↓ scroll
[BLOW THE CANDLE] Klik lilin 19 → padam → "Lilies for Ley"
    ↓ scroll
[PESAN] Lihat amplop → klik → animasi buka → surat keluar → typewriter pesan
    ↓
[FOOTER] Ucapan singkat penutup
```

---

## 5. Spesifikasi Teknis

### 5.1 Tech Stack
| Layer | Teknologi |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Animasi** | CSS Keyframes, Web Animations API |
| **Email (Make a Wish)** | Formspree (gratis, tanpa server) |
| **Simpan File (Make a Wish)** | Vercel Serverless Function (`/api/save-wish.js`) |
| **Penyimpanan Wish** | `data/wishes.json` (file lokal di server) |
| **Font** | Google Fonts (Playfair Display + Lato) |
| **Deploy** | **Vercel** (wajib untuk serverless function) |
| **File audio** | MP3 (disimpan lokal di folder `/assets/music/`) |
| **Foto** | JPG/PNG (disimpan lokal di folder `/assets/photos/`) |

### 5.2 Struktur File
```
birthday-website/
├── index.html              ← File utama
├── style.css               ← Semua styling & animasi
├── script.js               ← Semua interaksi & logika
├── api/
│   └── save-wish.js        ← Vercel Serverless Function (simpan wish ke file)
├── data/
│   └── wishes.json         ← File penyimpanan harapan (dibuat otomatis)
└── assets/
    ├── music/
    │   └── song.mp3        ← ⬅ GANTI dengan lagumu
    └── photos/
        ├── photo1.jpg      ← ⬅ GANTI dengan fotomu
        ├── photo2.jpg
        ├── photo3.jpg
        └── photo4.jpg
```

### 5.3 Browser Support
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari, Android Chrome
- Responsive: Mobile-first (breakpoint 768px)

---

## 6. Non-Functional Requirements

| Aspek | Target |
|---|---|
| **Performance** | First load < 3 detik (foto dioptimasi, max 500KB/foto) |
| **Responsif** | Tampil baik di HP dan laptop |
| **Aksesibilitas** | Tombol memiliki label jelas, kontras warna cukup |
| **Keamanan** | Tidak menyimpan data sensitif di client-side |
| **Offline** | Tidak diperlukan |

---

## 7. Panduan Pengisian Konten (Untuk Pembuat)

Semua konten yang perlu diisi ada di bagian atas `script.js` dalam sebuah objek konfigurasi. Cukup edit bagian ini, tidak perlu menyentuh kode lainnya.

### 7.1 Konfigurasi di `script.js`

```javascript
// ============================================================
// ✏️  PANDUAN PENGISIAN KONTEN — Edit bagian ini saja!
// ============================================================

const CONFIG = {

  // 1. NAMA PENERIMA
  //    Ganti "Ley" dengan nama pacarmu
  recipientName: "Ley",

  // 2. NAMA PEMBUAT (untuk tanda tangan di pesan)
  senderName: "Daffa",

  // 3. UMUR (untuk lilin di kue)
  age: 19,

  // 4. FOTO
  //    - Letakkan 4 foto di folder /assets/photos/
  //    - Nama file bebas, sesuaikan di sini
  //    - Caption bisa diisi atau dikosongkan ("")
  photos: [
    { src: "assets/photos/photo1.jpg", caption: "Tulis caption foto 1" },
    { src: "assets/photos/photo2.jpg", caption: "Tulis caption foto 2" },
    { src: "assets/photos/photo3.jpg", caption: "Tulis caption foto 3" },
    { src: "assets/photos/photo4.jpg", caption: "Tulis caption foto 4" },
  ],

  // 5. PESAN DARI KAMU
  //    Tulis pesanmu di sini. Gunakan \n untuk baris baru.
  message: `Tulis pesanmu di sini...
  
Ini baris kedua pesanmu.

Ini baris ketiga.`,

  // 6. FORMSPREE ENDPOINT (untuk fitur Make a Wish)
  //    Langkah:
  //    a) Daftar gratis di https://formspree.io
  //    b) Buat form baru → dapatkan URL endpoint
  //    c) Paste URL-nya di sini (format: https://formspree.io/f/xxxxxxxx)
  formspreeEndpoint: "https://formspree.io/f/GANTI_DENGAN_ID_KAMU",

};

// ============================================================
// ⛔  JANGAN EDIT DI BAWAH BARIS INI KECUALI KAMU TAHU JS
// ============================================================
```

### 7.2 Cara Memasukkan Lagu

1. Siapkan file lagu format **MP3**
2. Rename file menjadi `song.mp3`
3. Letakkan di folder `assets/music/`
4. Tidak perlu mengubah kode apapun — sudah otomatis terhubung

### 7.3 Cara Memasukkan Foto

1. Siapkan 4 foto format **JPG atau PNG**
2. Ukuran yang disarankan: **max 500KB per foto** (kompres di [squoosh.app](https://squoosh.app) jika perlu)
3. Letakkan di folder `assets/photos/`
4. Sesuaikan nama file di bagian `photos` dalam CONFIG di atas

### 7.4 Setup Make a Wish (Email + File Lokal)

**Langkah 1 — Setup Formspree (Email):**
1. Buka [formspree.io](https://formspree.io) → daftar gratis
2. Klik **"+ New Form"**
3. Masukkan email kamu sebagai tujuan pengiriman
4. Salin **endpoint URL** (contoh: `https://formspree.io/f/xpwzabcd`)
5. Paste ke field `formspreeEndpoint` di CONFIG

**Langkah 2 — Cara Membaca File `wishes.json`:**
1. Setelah ada wish yang masuk, buka file `data/wishes.json` di folder proyek
2. File berisi semua harapan dalam format JSON yang mudah dibaca
3. Atau akses langsung di Vercel Dashboard → Functions → lihat log

> ⚠️ **Penting:** Deploy ke **Vercel** (bukan GitHub Pages) agar fitur simpan file lokal berfungsi. GitHub Pages hanya mendukung static files.

---

## 8. Milestone & Urutan Pengerjaan

| Fase | Pekerjaan | Estimasi |
|---|---|---|
| **1** | Setup struktur file + hero section + musik | 1–2 jam |
| **2** | Galeri foto + lightbox | 1 jam |
| **3** | Fitur Make a Wish + Formspree (email) + Serverless Function (simpan file) | 2–3 jam |
| **4** | Fitur Blow the Candle + animasi | 2–3 jam |
| **5** | Section pesan + efek typewriter | 1 jam |
| **6** | Polish: responsif, animasi bunga, testing | 1–2 jam |
| **7** | Deploy ke Vercel (wajib untuk serverless function) | 30 menit |

---

## 9. Out of Scope (Tidak Dikerjakan di Versi 1.0)

- Login / autentikasi
- Database / backend server
- Lebih dari 1 penerima
- Edit konten tanpa menyentuh kode
- Video atau GIF sebagai background

---

## 10. Referensi & Inspirasi

- Deploy gratis: [vercel.com](https://vercel.com) *(wajib untuk serverless function)*
- Optimasi foto: [squoosh.app](https://squoosh.app)
- Form gratis: [formspree.io](https://formspree.io)
- Font: [fonts.google.com](https://fonts.google.com) → Playfair Display, Lato
- Animasi bunga referensi: CSS particles / `anime.js`
- Vercel Serverless Functions docs: [vercel.com/docs/functions](https://vercel.com/docs/functions)

---

*PRD ini dibuat sebagai panduan pengembangan website birthday "Lilies for Ley". Semua keputusan teknis dapat disesuaikan selama memenuhi acceptance criteria di atas.*
