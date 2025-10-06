const Album = require('../models/albumModel');
const Foto = require('../models/fotoModel');
const { cloudinary } = require('../config/cloudinary');
const asyncHandler = require('express-async-handler');

// --- ALBUM ---
const getSemuaAlbum = asyncHandler(async (req, res) => {
	const albums = await Album.find({}).sort({ tanggal_dibuat: -1 });
	res.json(albums);
});

const tambahAlbum = asyncHandler(async (req, res) => {
	const { nama_album } = req.body;
	if (!nama_album) {
		res.status(400);
		throw new Error('Nama album tidak boleh kosong');
	}
	const albumBaru = new Album({ nama_album });
	const albumTersimpan = await albumBaru.save();
	res.status(201).json(albumTersimpan);
});

const getAlbumById = asyncHandler(async (req, res) => {
	const album = await Album.findById(req.params.id);
	const fotos = await Foto.find({ id_album: req.params.id });
	if (album) {
		res.json({ album, fotos });
	} else {
		res.status(404);
		throw new Error('Album tidak ditemukan');
	}
});

// --- FOTO ---
const uploadFoto = asyncHandler(async (req, res) => {
	const { id_album } = req.body;
	if (!req.files || req.files.length === 0) {
		res.status(400);
		throw new Error('Tidak ada file yang diupload');
	}
	const promises = req.files.map((file) => {
		const fotoBaru = new Foto({
			id_album,
			nama_file: file.path,
			keterangan: file.filename,
		});
		return fotoBaru.save();
	});
	await Promise.all(promises);
	res.status(201).json({ message: 'Semua foto berhasil diupload' });
});

const hapusFoto = asyncHandler(async (req, res) => {
	const foto = await Foto.findById(req.params.id);
	if (foto) {
		await cloudinary.uploader.destroy(foto.keterangan);
		await foto.deleteOne();
		res.json({ message: 'Foto berhasil dihapus' });
	} else {
		res.status(404);
		throw new Error('Foto tidak ditemukan');
	}
});

module.exports = { getSemuaAlbum, tambahAlbum, getAlbumById, uploadFoto, hapusFoto };
