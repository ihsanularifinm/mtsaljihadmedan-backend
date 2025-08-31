const mongoose = require('mongoose');

const pendaftarSchema = new mongoose.Schema({
	nama_lengkap: { type: String, required: true },
	nisn: { type: String, required: true, unique: true }, // NISN harus unik
	asal_sekolah: { type: String, required: true },
	nama_wali: { type: String, required: true },
	kontak_wali: { type: String, required: true }, // Bisa nomor HP atau email
	status: {
		type: String,
		required: true,
		enum: ['Baru', 'Diterima', 'Ditolak'], // Hanya boleh diisi salah satu dari 3 nilai ini
		default: 'Baru', // Nilai default saat data pertama kali masuk
	},
	tanggal_daftar: {
		type: Date,
		default: Date.now,
	},
});

const Pendaftar = mongoose.model('Pendaftar', pendaftarSchema);

module.exports = Pendaftar;
