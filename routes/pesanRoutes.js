const express = require('express');
const router = express.Router();
const { kirimPesan, getSemuaPesan } = require('../controllers/pesanController');

// Impor
const validate = require('../middleware/validationMiddleware');
const { kirimPesanSchema } = require('../validators/pesanValidator');

// Terapkan middleware
router.route('/').post(validate(kirimPesanSchema), kirimPesan).get(getSemuaPesan);
/**
 * @swagger
 * tags:
 *   name: Pesan
 *   description: API untuk manajemen pesan dari form kontak
 */

/**
 * @swagger
 * /api/pesan:
 *   get:
 *     summary: Mengambil semua pesan masuk (hanya untuk admin)
 *     tags: [Pesan]
 *     responses:
 *       200:
 *         description: Daftar pesan berhasil diambil.
 *   post:
 *     summary: Mengirim pesan baru dari form kontak publik
 *     tags: [Pesan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_lengkap
 *               - email
 *               - subjek
 *               - isi_pesan
 *               - recaptchaToken
 *             properties:
 *               nama_lengkap:
 *                 type: string
 *               email:
 *                 type: string
 *               subjek:
 *                 type: string
 *               isi_pesan:
 *                 type: string
 *               recaptchaToken:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pesan berhasil dikirim.
 *       400:
 *         description: Data yang dikirim tidak valid.
 */

module.exports = router;
