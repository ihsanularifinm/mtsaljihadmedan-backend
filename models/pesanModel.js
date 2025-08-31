const mongoose = require('mongoose');

const pesanSchema = new mongoose.Schema({
	nama_lengkap: { type: String, required: true },
	email: { type: String, required: true },
	subjek: { type: String, required: true },
	isi_pesan: { type: String, required: true },
	status: {
		type: String,
		enum: ['Baru', 'Sudah Dibaca'],
		default: 'Baru',
	},
	tanggal_kirim: {
		type: Date,
		default: Date.now,
	},
});

const Pesan = mongoose.model('Pesan', pesanSchema);

module.exports = Pesan;
