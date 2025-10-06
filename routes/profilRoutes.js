const express = require('express');
const router = express.Router();
const { getProfil, updateProfil } = require('../controllers/profilController');

router.route('/').get(getProfil).put(updateProfil);
/**
 * @swagger
 * tags:
 *   name: Profil
 *   description: API untuk manajemen konten halaman Profil
 */

/**
 * @swagger
 * /api/profil:
 *   get:
 *     summary: Mengambil data konten halaman Profil
 *     tags: [Profil]
 *     responses:
 *       200:
 *         description: Data profil berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sejarah_singkat:
 *                   type: string
 *                 sejarah:
 *                   type: string
 *                 visi:
 *                   type: string
 *                 misi:
 *                   type: string
 *       400:
 *         description: Data profil belum dibuat.
 *   put:
 *     summary: Membuat atau mengupdate data konten halaman Profil
 *     tags: [Profil]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sejarah_singkat:
 *                 type: string
 *               sejarah:
 *                 type: string
 *               visi:
 *                 type: string
 *               misi:
 *                 type: string
 *             example:
 *               sejarah_singkat: Teks ringkasan sejarah...
 *               sejarah: Teks sejarah lengkap sekolah...
 *               visi: Teks visi sekolah...
 *               misi: Teks misi sekolah...
 *     responses:
 *       200:
 *         description: Data profil berhasil diupdate.
 *       400:
 *         description: Data yang dikirim tidak valid.
 */

module.exports = router;
