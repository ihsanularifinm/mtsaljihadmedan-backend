const mongoose = require('mongoose');

const beritaSchema = new mongoose.Schema({
	judul: {
		type: String,
		required: true, // Wajib diisi
	},
	isi: {
		type: String,
		required: true,
	},
	gambar: {
		type: String,
		required: true,
	},
	tanggal_terbit: {
		type: Date,
		default: Date.now, // Otomatis diisi dengan tanggal saat ini
	},
});

// Membuat model 'Berita' dari schema di atas
const Berita = mongoose.model('Berita', beritaSchema);

module.exports = Berita;
