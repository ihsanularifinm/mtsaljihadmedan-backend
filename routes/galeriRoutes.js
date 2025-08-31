const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getSemuaAlbum, tambahAlbum, getAlbumById, uploadFoto, hapusFoto } = require('../controllers/galeriController');

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/'); // Folder penyimpanan file
	},
	filename: function (req, file, cb) {
		// Membuat nama file unik: timestamp + nama asli
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({ storage: storage });

// Rute untuk Album
router.route('/album').get(getSemuaAlbum).post(tambahAlbum);
router.route('/album/:id').get(getAlbumById);

// Rute untuk Foto
// Gunakan middleware 'upload.array()' untuk multiple file upload
router.route('/foto').post(upload.array('foto', 10), uploadFoto);
router.route('/foto/:id').delete(hapusFoto);

module.exports = router;
