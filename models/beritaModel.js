const mongoose = require('mongoose');

const beritaSchema = new mongoose.Schema({
	judul: { type: String, required: true },
	isi: { type: String, required: true },
	gambar: { type: String, required: true },
	gambar_public_id: { type: String, required: true },
	tanggal_terbit: { type: Date, default: Date.now },
});

// Membuat model 'Berita' dari schema di atas
const Berita = mongoose.model('Berita', beritaSchema);

module.exports = Berita;
