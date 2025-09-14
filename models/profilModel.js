const mongoose = require('mongoose');

const profilSchema = new mongoose.Schema({
	sejarah_singkat: { type: String, required: true },
	sejarah: { type: String, required: true },
	visi: { type: String, required: true },
	misi: { type: String, required: true },
});

const Profil = mongoose.model('Profil', profilSchema);
module.exports = Profil;
