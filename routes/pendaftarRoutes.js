const express = require('express');
const router = express.Router();
const { tambahPendaftar, getSemuaPendaftar } = require('../controllers/pendaftarController');

// Impor
const validate = require('../middleware/validationMiddleware');
const { tambahPendaftarSchema } = require('../validators/pendaftarValidator');

// Terapkan middleware validasi sebelum controller
router.route('/').post(validate(tambahPendaftarSchema), tambahPendaftar).get(getSemuaPendaftar);
/**
 * @swagger
 * tags:
 *   name: Pendaftar
 *   description: API untuk manajemen pendaftar PPDB
 */

/**
 * @swagger
 * /api/pendaftar:
 *   get:
 *     summary: Mengambil semua data pendaftar (hanya untuk admin)
 *     tags: [Pendaftar]
 *     responses:
 *       200:
 *         description: Daftar pendaftar berhasil diambil.
 *   post:
 *     summary: Mendaftarkan siswa baru melalui form publik
 *     tags: [Pendaftar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_lengkap
 *               - nisn
 *               - asal_sekolah
 *               - nama_wali
 *               - kontak_wali
 *               - recaptchaToken
 *             properties:
 *               nama_lengkap:
 *                 type: string
 *               nisn:
 *                 type: string
 *               asal_sekolah:
 *                 type: string
 *               nama_wali:
 *                 type: string
 *               kontak_wali:
 *                 type: string
 *               recaptchaToken:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pendaftaran berhasil.
 *       400:
 *         description: Data tidak valid atau NISN sudah terdaftar.
 */

module.exports = router;
