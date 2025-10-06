const Profil = require('../models/profilModel');
const asyncHandler = require('express-async-handler');

const getProfil = asyncHandler(async (req, res) => {
	const profil = await Profil.findOne();
	if (profil) {
		res.json(profil);
	} else {
		res.status(404);
		throw new Error('Data profil belum dibuat');
	}
});

const updateProfil = asyncHandler(async (req, res) => {
	const { sejarah_singkat, sejarah, visi, misi } = req.body;
	const profil = await Profil.findOneAndUpdate({}, { sejarah_singkat, sejarah, visi, misi }, { new: true, upsert: true, runValidators: true });
	res.json(profil);
});

module.exports = { getProfil, updateProfil };
