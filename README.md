# Project Profile & Download Hub 🚀

> **Dark Terminal / Retro Pixel Modern Personal Developer Showcase & Download Center**  
> Dibuat dengan **HTML5 Semantik murni, CSS3 Modern, dan Vanilla JavaScript** tanpa ketergantungan framework atau server backend.

---

## 📌 Ringkasan Proyek

Website ini adalah website profil pengembang dan pusat unduhan berkas satu halaman (*one-page website*) yang dirancang khusus untuk membagikan file modifikasi sistem, tools, firmware, script otomasi, dan repositori proyek pribadi kepada komunitas atau pengunjung.

### Keunggulan Utama:
- **Tema Dark Terminal / Retro Pixel Modern**: Nuansa hitam arang terminal dengan aksen hijau neon (`#00ff66`), cyan elektrik (`#00f0ff`), status LED berkedip, dan elemen jendela retro.
- **Pemisahan Data & Tampilan (Zero HTML Editing)**: Semua daftar proyek dan file unduhan dikelola secara terpusat melalui file konfigurasi JavaScript `js/downloads.js`. Menambah file baru cukup menambahkan satu objek ke dalam array.
- **Pusat Unduhan Canggih (Download Center)**:
  - Pencarian instan (*live search*) berdasarkan nama, deskripsi, atau kategori.
  - Filter kategori fleksibel: `All`, `Android`, `Firmware`, `Modification`, `Tools`, `Scripts`, `Applications`, `Other Files`.
  - Pengurutan dinamis (*sorting*) berdasarkan Nama (A-Z, Z-A), Tanggal (Terbaru/Terlama), dan Ukuran File.
  - Tombol download langsung ke file lokal maupun tautan eksternal (GitHub Releases, Google Drive, Direct Link).
- **Logo Resmi**: Menggunakan file gambar asli `Gemini_Generated_Image_p4wulop4wulop4wu.jpg` sebagai logo utama di navbar, hero section, profil, dan favicon.
- **100% Offline & Ringan**: Dapat dijalankan langsung dari browser tanpa web server (buka `index.html`), serta kompatibel penuh dengan **GitHub Pages**, **Cloudflare Pages**, **Netlify**, atau hosting statis biasa.

---

## 📂 Struktur Direktori

```text
project-download-hub/
│
├── index.html                      # Halaman utama website (One-Page layout)
│
├── assets/
│   ├── images/
│   │   └── Gemini_Generated_Image_p4wulop4wulop4wu.jpg   # Logo utama website & favicon
│   └── icons/                      # Folder asset icon pendukung
│
├── css/
│   └── style.css                   # Desain visual Dark Terminal / Retro Modern & responsive
│
├── js/
│   ├── downloads.js                # Konfigurasi data profil, proyek, dan daftar file unduhan
│   └── main.js                     # Logika render dinamis, search, filter, sort, modal, dan UI
│
├── downloads/                      # Folder penyimpanan file lokal yang siap diunduh
│   ├── sample_automation_tool.sh   # Contoh file script siap unduh
│   └── sample_patch_config.txt     # Contoh file patch siap unduh
│
└── README.md                       # Panduan lengkap penggunaan dan deploy
```

---

## 🛠️ Cara Menambah File Unduhan Baru

Anda **tidak perlu mengubah file `index.html`** saat ingin menambah file baru! Cukup ikuti 2 langkah mudah berikut:

### Langkah 1: Siapkan File
Simpan file yang ingin dibagikan ke dalam folder `downloads/` (misalnya `tools-v1.zip`), atau siapkan tautan unduhan eksternal (seperti link GitHub Releases atau Google Drive).

### Langkah 2: Daftarkan ke `js/downloads.js`
Buka file `js/downloads.js`, temukan array `DOWNLOADS_DATA`, lalu tambahkan objek baru:

```javascript
{
  id: "dl-9",                                    // ID unik
  name: "Nama File atau Tool Anda",              // Judul file
  filename: "tools-v1.zip",                      // Nama file fisik
  fileType: "zip",                               // Ekstensi (zip, apk, sh, exe, dmg, dll)
  category: "tools",                             // Kategori (android, firmware, modification, tools, scripts, applications, other)
  categoryLabel: "Tools",                        // Label kategori tampilan
  version: "v1.0.0",                             // Versi file
  size: "4.2 MB",                                // Ukuran file yang ditampilkan
  sizeBytes: 4404019,                            // Ukuran file dalam bytes (untuk fitur sort)
  date: "2026-11-20",                            // Tanggal update (YYYY-MM-DD)
  description: "Deskripsi singkat tentang fungsi dan isi file ini.",
  downloadUrl: "./downloads/tools-v1.zip",        // Path lokal ATAU link direct URL eksternal
  sourceUrl: "https://github.com/username/repo", // Link repository atau dokumentasi
  badge: "New"                                   // Badge opsional (Hot, New, Stable, dll)
}
```

Website akan **otomatis menampilkan kartu unduhan baru** beserta fitur pencarian, filter, dan tombol unduh langsung!

---

## 👤 Cara Mengubah Profil & Identitas

Buka `js/downloads.js` dan sesuaikan bagian `PROFILE_CONFIG`:

```javascript
const PROFILE_CONFIG = {
  developerName: "SR-RG",
  alias: "SR-RG",
  badge: "SYSTEM ONLINE // v2.4.0",
  tagline: "SR-RG // Developer, System Modder, and Retro-Computing Enthusiast",
  shortBio: "Pusat resmi berbagi karya proyek, modifikasi sistem, tools otomasi, dan repository publik oleh SR-RG.",
  githubUrl: "https://github.com/SR-RG",
  email: "developer@example.com",
  skills: [
    "Android Custom ROM",
    "Kernel Tuning",
    "Bash Scripting",
    "Reverse Engineering"
  ]
};
```

---

## 🌐 Panduan Upload ke GitHub Pages (Gratis)

1. Buat repositori baru di akun GitHub Anda (misal: `project-download-hub` atau `username.github.io`).
2. Masuk ke folder `project-download-hub/` di komputer Anda.
3. Jalankan perintah git berikut:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Project Profile & Download Hub"
   git branch -M main
   git remote add origin https://github.com/SR-RG/<repo-name>.git
   git push -u origin main
   ```
4. Buka halaman repository di GitHub:
   - Klik menu **Settings** -> **Pages**.
   - Pada bagian **Build and deployment** -> **Branch**, pilih branch `main` dan folder `/ (root)`.
   - Klik **Save**.
5. Dalam 1-2 menit, website Anda sudah aktif dan online di URL:
   `https://SR-RG.github.io/<repo-name>/`!

---

## 💻 Panduan Menjalankan Secara Offline

Website ini tidak membutuhkan instalasi server Apache, Nginx, Node.js, atau database.
- Cukup klik dua kali (*double click*) file `index.html`.
- Website langsung terbuka dengan sempurna di browser apa pun (Chrome, Safari, Firefox, Edge).

---

## 📜 Lisensi & Catatan
- Bebas digunakan dan dimodifikasi untuk keperluan pribadi maupun publikasi open-source.
- Seluruh asset logo menggunakan file resmi yang disediakan: `Gemini_Generated_Image_p4wulop4wulop4wu.jpg`.

