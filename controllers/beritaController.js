const Berita = require('../models/beritaModel');
const { cloudinary } = require('../config/cloudinary');
const asyncHandler = require('express-async-handler');

// Mengambil semua berita
const getSemuaBerita = asyncHandler(async (req, res) => {
	const limit = parseInt(req.query.limit) || 0;
	let query = Berita.find({}).sort({ tanggal_terbit: -1 });
	if (limit > 0) {
		query = query.limit(limit);
	}
	const semuaBerita = await query.exec();
	res.json(semuaBerita);
});

// Menambah berita baru
const tambahBerita = asyncHandler(async (req, res) => {
	const { judul, isi } = req.body;
	const gambar = req.file ? req.file.path : null;
	const gambar_public_id = req.file ? req.file.filename : null;

	if (!judul || !isi || !gambar) {
		res.status(400);
		throw new Error('Judul, isi, dan gambar wajib diisi');
	}

	const beritaBaru = new Berita({ judul, isi, gambar, gambar_public_id });
	const beritaTersimpan = await beritaBaru.save();
	res.status(201).json(beritaTersimpan);
});

// Mengambil satu berita berdasarkan ID
const getBeritaById = asyncHandler(async (req, res) => {
	const berita = await Berita.findById(req.params.id);
	if (berita) {
		res.json(berita);
	} else {
		res.status(404);
		throw new Error('Berita tidak ditemukan');
	}
});

// Mengupdate berita
const updateBerita = asyncHandler(async (req, res) => {
	const { judul, isi } = req.body;
	const berita = await Berita.findById(req.params.id);

	if (berita) {
		berita.judul = judul || berita.judul;
		berita.isi = isi || berita.isi;
		if (req.file) {
			if (berita.gambar_public_id) {
				await cloudinary.uploader.destroy(berita.gambar_public_id);
			}
			berita.gambar = req.file.path;
			berita.gambar_public_id = req.file.filename;
		}
		const beritaUpdated = await berita.save();
		res.json(beritaUpdated);
	} else {
		res.status(404);
		throw new Error('Berita tidak ditemukan');
	}
});

// Menghapus berita
const hapusBerita = asyncHandler(async (req, res) => {
	const berita = await Berita.findById(req.params.id);
	if (berita) {
		if (berita.gambar_public_id) {
			await cloudinary.uploader.destroy(berita.gambar_public_id);
		}
		await berita.deleteOne();
		res.json({ message: 'Berita berhasil dihapus' });
	} else {
		res.status(404);
		throw new Error('Berita tidak ditemukan');
	}
});

module.exports = { getSemuaBerita, tambahBerita, getBeritaById, updateBerita, hapusBerita };
