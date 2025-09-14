const Pendaftar = require('../models/pendaftarModel');
const axios = require('axios');

const tambahPendaftar = async (req, res) => {
	try {
		const { nama_lengkap, nisn, asal_sekolah, nama_wali, kontak_wali, recaptchaToken } = req.body;

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

		// Validasi input dasar
		if (!nama_lengkap || !nisn || !asal_sekolah || !nama_wali || !kontak_wali) {
			return res.status(400).json({ message: 'Harap isi semua kolom yang wajib diisi.' });
		}

		// Cek apakah NISN sudah terdaftar
		const pendaftarExists = await Pendaftar.findOne({ nisn });
		if (pendaftarExists) {
			return res.status(400).json({ message: 'NISN sudah terdaftar.' });
		}

		// Buat pendaftar baru
		const pendaftarBaru = new Pendaftar({
			nama_lengkap,
			nisn,
			asal_sekolah,
			nama_wali,
			kontak_wali,
		});

		const pendaftarTersimpan = await pendaftarBaru.save();
		res.status(201).json({ message: 'Pendaftaran berhasil!', data: pendaftarTersimpan });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Terjadi kesalahan pada server' });
	}
};

// @desc    Mengambil semua data pendaftar (untuk admin)
// @route   GET /api/pendaftar
const getSemuaPendaftar = async (req, res) => {
	try {
		const semuaPendaftar = await Pendaftar.find({}).sort({ tanggal_daftar: -1 });
		res.json(semuaPendaftar);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Terjadi kesalahan pada server' });
	}
};

module.exports = {
	tambahPendaftar,
	getSemuaPendaftar,
};
