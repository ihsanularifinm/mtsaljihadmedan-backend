# Backend API - Website MTs Al-Jihad Medan

Ini adalah backend API untuk website Sistem Informasi Sekolah MTs Al-Jihad Medan. Dibangun menggunakan **Node.js** dan **Express.js** untuk menyediakan data ke aplikasi frontend.

---

## 🛠️ Teknologi yang Digunakan

- **[Node.js](https://nodejs.org/)**: Lingkungan eksekusi JavaScript di server.
- **[Express.js](https://expressjs.com/)**: Framework web untuk membangun API.
- **[MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)**: Database NoSQL dan ODM (Object Data Modeling) untuk interaksi dengan database.
- **[JSON Web Token (JWT)](https://jwt.io/) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)**: Untuk otentikasi pengguna dan keamanan password.
- **[Cloudinary](https://cloudinary.com/) & [Multer](https://github.com/expressjs/multer)**: Untuk menangani proses upload file dan gambar ke cloud.
- **[Nodemailer](https://nodemailer.com/)**: Untuk fungsionalitas pengiriman email.
- **[Yup](https://github.com/jquense/yup)**: Untuk validasi skema data yang masuk ke API.
- **[Swagger (OpenAPI)](https://swagger.io/)**: Untuk dokumentasi API yang interaktif.
- **[express-async-handler](https://github.com/Abazhenov/express-async-handler)**: Untuk penanganan error pada middleware asynchronous yang lebih baik.

---

## ✨ Fitur API

- Endpoint **CRUD** (Create, Read, Update, Delete) untuk semua modul utama (Berita, Galeri, Agenda, dll).
- Endpoint **Read & Update** untuk halaman dinamis (Profil Sekolah, Informasi Akademik).
- Sistem **registrasi dan login** untuk admin dengan proteksi rute menggunakan JWT.
- Verifikasi **reCAPTCHA** sisi server untuk endpoint formulir publik.
- **Notifikasi email otomatis** untuk pendaftar baru dan pesan kontak yang masuk.
- **Dokumentasi API interaktif** yang di-generate otomatis dan dapat diakses via `/api-docs`.

---

## 🚀 Setup & Instalasi Lokal

Untuk menjalankan server API ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**

    ```bash
    git clone [URL_REPOSITORY_ANDA]
    cd [NAMA_FOLDER_PROYEK]
    ```

2.  **Instal dependencies:**

    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variables:**
    Buat file `.env` di direktori utama. Salin konten dari `.env.example` dan isi dengan semua kredensial yang dibutuhkan (koneksi database, kunci JWT, kredensial email, dll).

    ```bash
    cp .env.example .env
    ```

    _Setelah itu, buka file `.env` dan sesuaikan nilainya._

4.  **Jalankan server development:**

    ```bash
    npm run dev
    ```

5.  **Server siap digunakan:**
    Server API akan berjalan dan dapat diakses di [http://localhost:5000](http://localhost:5000).
