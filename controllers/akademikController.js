const Akademik = require('../models/akademikModel');

// Mengambil data akademik
const getAkademik = async (req, res) => {
	try {
		const akademik = await Akademik.findOne();
		res.json(akademik || { kurikulum: '', program_unggulan: '', ekstrakurikuler: '' });
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

// Membuat atau Mengupdate data akademik
const updateAkademik = async (req, res) => {
	try {
		const { kurikulum, program_unggulan, ekstrakurikuler } = req.body;
		const akademik = await Akademik.findOneAndUpdate({}, { kurikulum, program_unggulan, ekstrakurikuler }, { new: true, upsert: true, runValidators: true });
		res.json(akademik);
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

module.exports = { getAkademik, updateAkademik };
