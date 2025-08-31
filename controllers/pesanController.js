const Pesan = require('../models/pesanModel');

// @desc    Menyimpan pesan baru dari form kontak
// @route   POST /api/pesan
const kirimPesan = async (req, res) => {
	try {
		const { nama_lengkap, email, subjek, isi_pesan } = req.body;

		if (!nama_lengkap || !email || !subjek || !isi_pesan) {
			return res.status(400).json({ message: 'Harap isi semua kolom.' });
		}

		const pesanBaru = new Pesan({ nama_lengkap, email, subjek, isi_pesan });
		await pesanBaru.save();
		res.status(201).json({ message: 'Pesan Anda berhasil terkirim! Terima kasih.' });
	} catch (error) {
		res.status(500).json({ message: 'Terjadi kesalahan pada server' });
	}
};

// @desc    Mengambil semua pesan (untuk admin)
// @route   GET /api/pesan
const getSemuaPesan = async (req, res) => {
	try {
		const semuaPesan = await Pesan.find({}).sort({ tanggal_kirim: -1 });
		res.json(semuaPesan);
	} catch (error) {
		res.status(500).json({ message: 'Terjadi kesalahan pada server' });
	}
};

module.exports = { kirimPesan, getSemuaPesan };
