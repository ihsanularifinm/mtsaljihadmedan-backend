const Album = require('../models/albumModel');
const Foto = require('../models/fotoModel');
const fs = require('fs');
const path = require('path');

// --- FUNGSI UNTUK ALBUM ---
const getSemuaAlbum = async (req, res) => {
	try {
		const albums = await Album.find({}).sort({ tanggal_dibuat: -1 });
		res.json(albums);
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

const tambahAlbum = async (req, res) => {
	console.log('Mencoba menambah album baru...'); // Log untuk debug
	try {
		const { nama_album } = req.body;
		if (!nama_album) {
			return res.status(400).json({ message: 'Nama album tidak boleh kosong' });
		}
		const albumBaru = new Album({ nama_album });
		const albumTersimpan = await albumBaru.save();

		console.log('Album berhasil disimpan:', albumTersimpan); // Log untuk debug
		// Kirim balasan 201 Created dengan data album baru
		res.status(201).json(albumTersimpan);
	} catch (error) {
		console.error('Error saat menambah album:', error); // Log error
		res.status(500).json({ message: 'Server Error' });
	}
};

const getAlbumById = async (req, res) => {
	try {
		const album = await Album.findById(req.params.id);
		const fotos = await Foto.find({ id_album: req.params.id });
		if (album) {
			res.json({ album, fotos });
		} else {
			res.status(404).json({ message: 'Album tidak ditemukan' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

// --- FUNGSI UNTUK FOTO ---
const uploadFoto = async (req, res) => {
	try {
		const { id_album } = req.body;
		if (!req.files) {
			return res.status(400).json({ message: 'Tidak ada file yang diupload' });
		}
		// Buat array promise untuk menyimpan semua foto
		const promises = req.files.map((file) => {
			const fotoBaru = new Foto({
				id_album,
				nama_file: file.filename,
			});
			return fotoBaru.save();
		});
		await Promise.all(promises); // Tunggu semua foto selesai disimpan
		res.status(201).json({ message: 'Semua foto berhasil diupload' });
	} catch (error) {
		res.status(500).json({ message: 'Server Error saat upload' });
	}
};

const hapusFoto = async (req, res) => {
	try {
		const foto = await Foto.findById(req.params.id);
		if (foto) {
			// Hapus file fisik dari folder /uploads
			const filePath = path.join(__dirname, '..', 'uploads', foto.nama_file);
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
			}
			// Hapus record dari database
			await foto.deleteOne();
			res.json({ message: 'Foto berhasil dihapus' });
		} else {
			res.status(404).json({ message: 'Foto tidak ditemukan' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

module.exports = { getSemuaAlbum, tambahAlbum, getAlbumById, uploadFoto, hapusFoto };
