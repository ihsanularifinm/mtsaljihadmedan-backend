# Backend API - Website MTs Al-Jihad Medan

Ini adalah backend API untuk website Sistem Informasi Sekolah MTs Al-Jihad Medan. Dibangun menggunakan MERN Stack (MongoDB, Express.js, React, Node.js).

## Teknologi yang Digunakan

- **Node.js**: Lingkungan eksekusi JavaScript di server.
- **Express.js**: Framework web untuk membangun API.
- **MongoDB**: Database NoSQL untuk menyimpan data.
- **Mongoose**: ODM untuk mempermudah interaksi dengan MongoDB.
- **JSON Web Token (JWT)**: Untuk otentikasi dan keamanan rute.
- **bcryptjs**: Untuk enkripsi (hashing) password.
- **Multer**: Untuk menangani upload file.
- **Axios**: Untuk melakukan permintaan HTTP ke server eksternal (verifikasi reCAPTCHA).
- **dotenv**: Untuk mengelola environment variables.

## Fitur API

- CRUD (Create, Read, Update, Delete) untuk modul Berita.
- CRUD untuk modul Galeri (Album & Foto).
- Read & Update untuk halaman dinamis (Profil, Akademik).
- Menerima dan menampilkan data Pendaftar PPDB dengan verifikasi reCAPTCHA.
- Menerima dan menampilkan Pesan Kontak dengan verifikasi reCAPTCHA.
- Sistem registrasi dan login untuk admin menggunakan JWT.

## Setup & Instalasi Lokal

1.  Clone repository ini.
2.  Jalankan `npm install` untuk menginstal semua dependencies.
3.  Buat file `.env` di direktori utama, salin konten dari `.env.example` dan isi dengan kredensial Anda (termasuk `RECAPTCHA_SECRET_KEY`).
4.  Jalankan server development dengan `npm run dev`.
5.  Server akan berjalan di `http://localhost:5000`.
