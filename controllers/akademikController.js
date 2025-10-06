const Akademik = require('../models/akademikModel');
const asyncHandler = require('express-async-handler');

// Mengambil data akademik
const getAkademik = asyncHandler(async (req, res) => {
	const akademik = await Akademik.findOne();
	if (akademik) {
		res.json(akademik);
	} else {
		res.status(404);
		throw new Error('Data akademik belum dibuat');
	}
});

// Membuat atau Mengupdate data akademik
const updateAkademik = asyncHandler(async (req, res) => {
	const { kurikulum, program_unggulan, ekstrakurikuler } = req.body;
	const akademik = await Akademik.findOneAndUpdate({}, { kurikulum, program_unggulan, ekstrakurikuler }, { new: true, upsert: true, runValidators: true });
	res.json(akademik);
});

module.exports = { getAkademik, updateAkademik };
