const Berita = require('../models/beritaModel');

// @desc    Mengambil semua berita dari database
// @route   GET /api/berita
const getSemuaBerita = async (req, res) => {
	try {
		// Cek apakah ada query 'limit' di URL
		const limit = parseInt(req.query.limit) || 0;

		// Buat query dasar
		let query = Berita.find({}).sort({ tanggal_terbit: -1 });

		// Jika ada limit, tambahkan ke query
		if (limit > 0) {
			query = query.limit(limit);
		}

		const semuaBerita = await query.exec(); // Jalankan query
		res.json(semuaBerita);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Terjadi kesalahan pada server' });
	}
};

// @desc    Menambah berita baru ke database
// @route   POST /api/berita
const tambahBerita = async (req, res) => {
	console.log('Mencoba menambah berita baru...');
	try {
		const { judul, isi, gambar } = req.body;
		if (!judul || !isi || !gambar) {
			return res.status(400).json({ message: 'Harap isi semua kolom' });
		}
		const beritaBaru = new Berita({ judul, isi, gambar });
		const beritaTersimpan = await beritaBaru.save();
		console.log('Berhasil menyimpan berita baru.');
		res.status(201).json(beritaTersimpan);
	} catch (error) {
		console.error('ERROR saat tambahBerita:', error);
		res.status(500).json({ message: 'Terjadi kesalahan pada server' });
	}
};

// @desc    Mengambil satu berita berdasarkan ID
// @route   GET /api/berita/:id
const getBeritaById = async (req, res) => {
	console.log(`Mencoba mengambil berita dengan ID: ${req.params.id}`);
	try {
		const berita = await Berita.findById(req.params.id);
		if (berita) {
			console.log('Berhasil menemukan berita by ID.');
			res.json(berita);
		} else {
			console.log('Berita dengan ID tersebut tidak ditemukan.');
			res.status(404).json({ message: 'Berita tidak ditemukan' });
		}
	} catch (error) {
		console.error('ERROR saat getBeritaById:', error);
		res.status(500).json({ message: 'Terjadi kesalahan pada server' });
	}
};

// @desc    Mengupdate berita berdasarkan ID
// @route   PUT /api/berita/:id
const updateBerita = async (req, res) => {
	console.log(`Mencoba update berita dengan ID: ${req.params.id}`);
	try {
		const { judul, isi, gambar } = req.body;
		const berita = await Berita.findById(req.params.id);

		if (berita) {
			berita.judul = judul || berita.judul;
			berita.isi = isi || berita.isi;
			berita.gambar = gambar || berita.gambar;
			const beritaUpdated = await berita.save();
			console.log('Berhasil update berita.');
			res.json(beritaUpdated);
		} else {
			console.log('Gagal update, berita tidak ditemukan.');
			res.status(404).json({ message: 'Berita tidak ditemukan' });
		}
	} catch (error) {
		console.error('ERROR saat updateBerita:', error);
		res.status(500).json({ message: 'Terjadi kesalahan pada server' });
	}
};

// @desc    Menghapus berita berdasarkan ID
// @route   DELETE /api/berita/:id
const hapusBerita = async (req, res) => {
	console.log(`Mencoba hapus berita dengan ID: ${req.params.id}`);
	try {
		const berita = await Berita.findById(req.params.id);
		if (berita) {
			await berita.deleteOne();
			console.log('Berhasil hapus berita.');
			res.json({ message: 'Berita berhasil dihapus' });
		} else {
			console.log('Gagal hapus, berita tidak ditemukan.');
			res.status(404).json({ message: 'Berita tidak ditemukan' });
		}
	} catch (error) {
		console.error('ERROR saat hapusBerita:', error);
		res.status(500).json({ message: 'Terjadi kesalahan pada server' });
	}
};

// Ekspor semua fungsi
module.exports = {
	getSemuaBerita,
	tambahBerita,
	getBeritaById,
	updateBerita,
	hapusBerita,
};
