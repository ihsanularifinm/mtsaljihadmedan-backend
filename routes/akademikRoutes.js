const express = require('express');
const router = express.Router();
const { getAkademik, updateAkademik } = require('../controllers/akademikController');

router.route('/').get(getAkademik).put(updateAkademik);
/**
 * @swagger
 * tags:
 *   name: Akademik
 *   description: API untuk manajemen konten halaman Akademik
 */

/**
 * @swagger
 * /api/akademik:
 *   get:
 *     summary: Mengambil konten halaman Akademik
 *     tags: [Akademik]
 *     responses:
 *       200:
 *         description: Data akademik berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 kurikulum:
 *                   type: string
 *                 program_unggulan:
 *                   type: string
 *                 ekstrakurikuler:
 *                   type: string
 *       400:
 *         description: Data akademik belum dibuat.
 *   put:
 *     summary: Membuat atau mengupdate data konten halaman Akademik
 *     tags: [Akademik]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kurikulum:
 *                 type: string
 *               program_unggulan:
 *                 type: string
 *               ekstrakurikuler:
 *                 type: string
 *             example:
 *               kurikulum: Teks kurikulum baru...
 *               program_unggulan: "* Poin unggulan 1\n* Poin unggulan 2"
 *               ekstrakurikuler: OSIS, Pramuka, Futsal
 *     responses:
 *       200:
 *         description: Data akademik berhasil diupdate.
 *       400:
 *         description: Data yang dikirim tidak valid.
 */

module.exports = router;
