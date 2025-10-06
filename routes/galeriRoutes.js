const express = require('express');
const router = express.Router();
const multer = require('multer');

// Impor storage dari file konfigurasi cloudinary kita
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const { getSemuaAlbum, tambahAlbum, getAlbumById, uploadFoto, hapusFoto } = require('../controllers/galeriController');

// Rute untuk Album (tidak berubah)
router.route('/album').get(getSemuaAlbum).post(tambahAlbum);
/**
 * @swagger
 * tags:
 *   name: Galeri
 *   description: API untuk manajemen album dan foto galeri
 */

/**
 * @swagger
 * /api/galeri/album:
 *   get:
 *     summary: Mengambil daftar semua album
 *     tags: [Galeri]
 *     responses:
 *       200:
 *         description: Daftar album berhasil diambil.
 *   post:
 *     summary: Menambah album baru
 *     tags: [Galeri]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - nama_album
 *             properties:
 *               nama_album:
 *                 type: string
 *             example:
 *               nama_album: Album Sejarah
 *     responses:
 *       201:
 *         description: Album berhasil dibuat.
 */

router.route('/album/:id').get(getAlbumById);
/**
 * @swagger
 * /api/galeri/album/{id}:
 *   get:
 *     summary: Mengambil detail satu album beserta foto-fotonya
 *     tags: [Galeri]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID unik dari album
 *     responses:
 *       200:
 *         description: Data album dan foto berhasil diambil.
 *       404:
 *         description: Album tidak ditemukan.
 */

// Rute untuk Foto
// Middleware 'upload' sekarang sudah dikonfigurasi untuk Cloudinary
router.route('/foto').post(upload.array('foto', 10), uploadFoto);
/**
 * @swagger
 * /api/galeri/foto:
 *   post:
 *     summary: Mengupload satu atau lebih foto ke dalam album
 *     tags: [Galeri]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id_album
 *               - foto
 *             properties:
 *               id_album:
 *                 type: string
 *                 description: ID dari album tujuan
 *               foto:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Foto berhasil diupload.
 */

router.route('/foto/:id').delete(hapusFoto);
/**
 * @swagger
 * /api/galeri/foto/{id}:
 *   delete:
 *     summary: Menghapus satu foto berdasarkan ID-nya
 *     tags: [Galeri]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID unik dari foto
 *     responses:
 *       200:
 *         description: Foto berhasil dihapus.
 *       404:
 *         description: Foto tidak ditemukan.
 */

module.exports = router;
