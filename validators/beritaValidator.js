const yup = require('yup');

const beritaSchema = yup.object({
	body: yup.object({
		judul: yup.string().required('Judul wajib diisi.'),
		isi: yup.string().required('Isi berita wajib diisi.'),
	}),
});

// Skema untuk update, di mana semua field opsional
const updateBeritaSchema = yup.object({
	body: yup.object({
		judul: yup.string(),
		isi: yup.string(),
	}),
});

module.exports = { beritaSchema, updateBeritaSchema };
