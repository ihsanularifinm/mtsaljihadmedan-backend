const express = require('express');
const router = express.Router();
const { kirimPesan, getSemuaPesan } = require('../controllers/pesanController');

router.route('/').post(kirimPesan).get(getSemuaPesan);

module.exports = router;
