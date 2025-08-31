const mongoose = require('mongoose');
const albumSchema = new mongoose.Schema({
	nama_album: { type: String, required: true },
	tanggal_dibuat: { type: Date, default: Date.now },
});
const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
