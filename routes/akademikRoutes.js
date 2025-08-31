const express = require('express');
const router = express.Router();
const { getAkademik, updateAkademik } = require('../controllers/akademikController');

router.route('/').get(getAkademik).put(updateAkademik);

module.exports = router;
