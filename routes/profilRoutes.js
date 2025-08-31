const express = require('express');
const router = express.Router();
const { getProfil, updateProfil } = require('../controllers/profilController');

router.route('/').get(getProfil).put(updateProfil);

module.exports = router;
