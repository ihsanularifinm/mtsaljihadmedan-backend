const mongoose = require('mongoose');
const fotoSchema = new mongoose.Schema({
	id_album: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Album', // Referensi ke model Album
	},
	nama_file: { type: String, required: true },
	keterangan: { type: String },
});
const Foto = mongoose.model('Foto', fotoSchema);
module.exports = Foto;
