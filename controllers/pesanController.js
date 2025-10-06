const Pesan = require('../models/pesanModel');
const axios = require('axios');
const sendEmail = require('../utils/sendEmail');
const asyncHandler = require('express-async-handler');

const kirimPesan = asyncHandler(async (req, res) => {
	const { nama_lengkap, email, subjek, isi_pesan, recaptchaToken } = req.body;

	// --- Verifikasi reCAPTCHA ---
	const secretKey = process.env.RECAPTCHA_SECRET_KEY;
	const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
	const { data: recaptchaResult } = await axios.post(verificationURL);
	if (!recaptchaResult.success) {
		res.status(400);
		throw new Error('Verifikasi reCAPTCHA gagal. Coba lagi.');
	}

	const pesanBaru = new Pesan({ nama_lengkap, email, subjek, isi_pesan });
	await pesanBaru.save();

	// --- KIRIM EMAIL ---
	try {
		// Kirim Notifikasi ke Admin
		const emailAdminHtml = `<h1>Pesan Baru dari ${nama_lengkap}</h1>...`; // Konten email admin
		await sendEmail({
			to: process.env.EMAIL_ADMIN,
			subject: `Pesan Baru: ${subjek}`,
			html: emailAdminHtml,
		});
		// Kirim Konfirmasi ke Pengguna
		const emailPenggunaHtml = `<h1>Terima Kasih Telah Menghubungi Kami</h1>...`; // Konten email pengguna
		await sendEmail({
			to: email,
			subject: 'Konfirmasi Penerimaan Pesan',
			html: emailPenggunaHtml,
		});
	} catch (emailError) {
		console.error('Gagal mengirim email notifikasi kontak:', emailError);
	}

	res.status(201).json({ message: 'Pesan Anda berhasil terkirim! Terima kasih.' });
});

const getSemuaPesan = asyncHandler(async (req, res) => {
	const semuaPesan = await Pesan.find({}).sort({ tanggal_kirim: -1 });
	res.json(semuaPesan);
});

module.exports = { kirimPesan, getSemuaPesan };
