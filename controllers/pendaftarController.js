const Pendaftar = require('../models/pendaftarModel');
const axios = require('axios');
const sendEmail = require('../utils/sendEmail');
const asyncHandler = require('express-async-handler');

const tambahPendaftar = asyncHandler(async (req, res) => {
	const { nama_lengkap, nisn, asal_sekolah, nama_wali, kontak_wali, recaptchaToken } = req.body;

	// --- Verifikasi reCAPTCHA ---
	const secretKey = process.env.RECAPTCHA_SECRET_KEY;
	const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
	const { data: recaptchaResult } = await axios.post(verificationURL);
	if (!recaptchaResult.success) {
		res.status(400);
		throw new Error('Verifikasi reCAPTCHA gagal. Coba lagi.');
	}

	const pendaftarExists = await Pendaftar.findOne({ nisn });
	if (pendaftarExists) {
		res.status(400);
		throw new Error('NISN sudah terdaftar.');
	}

	const pendaftarBaru = new Pendaftar({ nama_lengkap, nisn, asal_sekolah, nama_wali, kontak_wali });
	const pendaftarTersimpan = await pendaftarBaru.save();

	// --- KIRIM EMAIL NOTIFIKASI KE ADMIN ---
	// Kita tetap bungkus ini dengan try...catch terpisah karena kegagalan email
	// tidak boleh menghentikan respons sukses ke pengguna.
	try {
		const emailHtml = `<h1>Pendaftar Baru: ${pendaftarTersimpan.nama_lengkap}</h1>...`; // Konten email
		await sendEmail({
			to: process.env.EMAIL_ADMIN,
			subject: 'Notifikasi: Pendaftar Baru - MTs Al-Jihad Medan',
			html: emailHtml,
		});
	} catch (emailError) {
		console.error('Gagal mengirim email notifikasi pendaftaran:', emailError);
	}

	res.status(201).json({ message: 'Pendaftaran berhasil! Terima kasih.', data: pendaftarTersimpan });
});

const getSemuaPendaftar = asyncHandler(async (req, res) => {
	const semuaPendaftar = await Pendaftar.find({}).sort({ tanggal_daftar: -1 });
	res.json(semuaPendaftar);
});

module.exports = {
	tambahPendaftar,
	getSemuaPendaftar,
};
