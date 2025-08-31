const express = require('express');
const path = require('path'); // Diperlukan untuk menyajikan gambar
const connectDB = require('./config/db');
const cors = require('cors');
const galeriRoutes = require('./routes/galeriRoutes');
require('dotenv').config();

// Impor semua file rute
const beritaRoutes = require('./routes/beritaRoutes');
const profilRoutes = require('./routes/profilRoutes');

// Hubungkan ke Database
connectDB();

const app = express();

// --- Middleware ---
app.use(cors()); // Mengizinkan akses dari frontend
app.use(express.json()); // Agar bisa membaca body JSON dari request

// Middleware untuk menyajikan file statis dari folder 'uploads'
// Ini adalah baris yang hilang di instruksi saya sebelumnya
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Rute Dasar ---
app.get('/', (req, res) => {
	res.send('API berjalan...');
});

// --- Rute API ---
app.use('/api/berita', beritaRoutes);
app.use('/api/profil', profilRoutes);

// --- Jalankan Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server berjalan di port ${PORT}`);
});

app.use('/api/profil', profilRoutes);
app.use('/api/galeri', galeriRoutes); // Daftarkan rute galeri
