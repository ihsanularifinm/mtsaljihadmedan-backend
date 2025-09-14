const Pesan = require('../models/pesanModel');
const axios = require('axios');

const kirimPesan = async (req, res) => {
	try {
		const { nama_lengkap, email, subjek, isi_pesan, recaptchaToken } = req.body;

		// --- VERIFIKASI RECAPTCHA DIMULAI ---
		if (!recaptchaToken) {
			return res.status(400).json({ message: 'Verifikasi reCAPTCHA diperlukan.' });
		}
		const secretKey = process.env.RECAPTCHA_SECRET_KEY;
		const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
		const { data } = await axios.post(verificationURL);
		if (!data.success) {
			return res.status(400).json({ message: 'Verifikasi reCAPTCHA gagal. Coba lagi.' });
		}
		// --- VERIFIKASI RECAPTCHA SELESAI ---

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
