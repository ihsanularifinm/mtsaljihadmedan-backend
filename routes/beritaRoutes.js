const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const { getSemuaBerita, tambahBerita, getBeritaById, updateBerita, hapusBerita } = require('../controllers/beritaController');
const validate = require('../middleware/validationMiddleware');
const { beritaSchema, updateBeritaSchema } = require('../validators/beritaValidator');

// Rute untuk /api/berita
router.route('/').get(getSemuaBerita).post(upload.single('gambar'), validate(beritaSchema), tambahBerita);
/**
 * @swagger
 * tags:
 *   name: Berita
 *   description: API untuk manajemen berita sekolah
 */

/**
 * @swagger
 * /api/berita:
 *   get:
 *     summary: Mengambil daftar semua berita
 *     tags: [Berita]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Batasi jumlah berita yang ditampilkan (opsional)
 *         examples:
 *           zero:
 *             value: 0
 *             summary: 0; artinya ambil semua berita
 *           max:
 *             value: 50
 *             summary: 50; artinya ambil 50 berita
 *     responses:
 *       200:
 *         description: Daftar semua berita berhasil diambil.
 *   post:
 *     summary: Menambah berita baru
 *     tags: [Berita]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - judul
 *               - isi
 *               - gambar
 *             properties:
 *               judul:
 *                 type: string
 *                 example: Berita Terbaru
 *               isi:
 *                 type: string
 *                 example: Ini adalah isi berita terbaru.
 *               gambar:
 *                 type: string
 *                 format: binary
 *           encoding:
 *             gambar:
 *               contentType: image/png, image/jpeg
 *     responses:
 *       201:
 *         description: Berita berhasil dibuat.
 *       400:
 *         description: Data yang dikirim tidak valid.
 */

// Rute untuk /api/berita/:id
router.route('/:id').get(getBeritaById).put(upload.single('gambar'), validate(updateBeritaSchema), updateBerita).delete(hapusBerita);
/**
 * @swagger
 * /api/berita/{id}:
 *   get:
 *     summary: Mengambil satu berita berdasarkan ID
 *     tags: [Berita]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unik dari berita
 *     responses:
 *       200:
 *         description: Data berita berhasil diambil.
 *       404:
 *         description: Berita tidak ditemukan.
 *   put:
 *     summary: Mengupdate berita berdasarkan ID
 *     tags: [Berita]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID unik dari berita
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               judul:
 *                 type: string
 *                 example: Update Berita Terbaru
 *               isi:
 *                 type: string
 *                 example: Ini adalah isi berita terbaru yang sudah diupdate.
 *               gambar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Berita berhasil diupdate.
 *       400:
 *         description: Berita tidak ditemukan.
 *   delete:
 *     summary: Menghapus satu berita berdasarkan ID
 *     tags: [Berita]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unik dari berita
 *     responses:
 *       200:
 *         description: Berita berhasil dihapus.
 *       404:
 *         description: Berita tidak ditemukan.
 */

module.exports = router;
