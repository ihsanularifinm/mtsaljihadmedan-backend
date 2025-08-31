const express = require('express');
const router = express.Router();
const { tambahPendaftar, getSemuaPendaftar } = require('../controllers/pendaftarController');

// Rute POST untuk publik, GET untuk admin
router.route('/').post(tambahPendaftar).get(getSemuaPendaftar);

module.exports = router;
