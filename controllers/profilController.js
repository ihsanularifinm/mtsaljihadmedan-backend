const Profil = require('../models/profilModel');

// @desc    Mengambil data profil (hanya ada satu)
// @route   GET /api/profil
const getProfil = async (req, res) => {
	try {
		// findOne() akan selalu mengambil satu dokumen pertama yang ia temukan
		const profil = await Profil.findOne();
		if (profil) {
			res.json(profil);
		} else {
			// Jika belum ada data sama sekali, kirim pesan
			res.status(404).json({ message: 'Data profil belum dibuat' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

// @desc    Membuat atau Mengupdate data profil
// @route   PUT /api/profil
const updateProfil = async (req, res) => {
	try {
		const { sejarah, visi, misi } = req.body;
		// findOneAndUpdate dengan opsi { new: true, upsert: true }
		// akan meng-update jika ada, atau membuat baru jika belum ada.
		const profil = await Profil.findOneAndUpdate({}, { sejarah, visi, misi }, { new: true, upsert: true, runValidators: true });
		res.json(profil);
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

module.exports = { getProfil, updateProfil };
