const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// Impor semua file rute
const beritaRoutes = require('./routes/beritaRoutes');
const profilRoutes = require('./routes/profilRoutes');
const akademikRoutes = require('./routes/akademikRoutes');
const galeriRoutes = require('./routes/galeriRoutes');
const pendaftarRoutes = require('./routes/pendaftarRoutes');
const pesanRoutes = require('./routes/pesanRoutes');

// Hubungkan ke Database
connectDB();

const app = express();

// --- Middleware ---
app.use(cors()); // Mengizinkan akses dari frontend
app.use(express.json()); // Agar bisa membaca body JSON dari request

// Middleware untuk menyajikan file statis dari folder 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Rute Dasar ---
app.get('/', (req, res) => {
	res.send('API berjalan...');
});

// --- Rute API ---
app.use('/api/berita', beritaRoutes);
app.use('/api/profil', profilRoutes);
app.use('/api/galeri', galeriRoutes);
app.use('/api/galeri', galeriRoutes);
app.use('/api/akademik', akademikRoutes);
app.use('/api/pendaftar', pendaftarRoutes);
app.use('/api/pesan', pesanRoutes);

// --- Jalankan Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server berjalan di port ${PORT}`);
});
