const express = require('express');
const router = express.Router();

const { getSemuaBerita, tambahBerita, getBeritaById, updateBerita, hapusBerita } = require('../controllers/beritaController');

// Rute untuk /api/berita
router.route('/').get(getSemuaBerita).post(tambahBerita);

// Rute untuk /api/berita/:id
router.route('/:id').get(getBeritaById).put(updateBerita).delete(hapusBerita);

module.exports = router;
