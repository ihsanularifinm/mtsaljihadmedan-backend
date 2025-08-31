const mongoose = require('mongoose');

const akademikSchema = new mongoose.Schema({
	kurikulum: { type: String, required: true },
	program_unggulan: { type: String, required: true }, // Kita simpan sebagai satu blok teks
	ekstrakurikuler: { type: String, required: true }, // Kita simpan sebagai satu blok teks
});

const Akademik = mongoose.model('Akademik', akademikSchema);
module.exports = Akademik;
