const Profil = require('../models/profilModel');

const getProfil = async (req, res) => {
	try {
		const profil = await Profil.findOne();
		res.json(profil);
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

const updateProfil = async (req, res) => {
	try {
		const { sejarah_singkat, sejarah, visi, misi } = req.body;

		const profil = await Profil.findOneAndUpdate({}, { sejarah_singkat, sejarah, visi, misi }, { new: true, upsert: true, runValidators: true });
		res.json(profil);
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

module.exports = { getProfil, updateProfil };
