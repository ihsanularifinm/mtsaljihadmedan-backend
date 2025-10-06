const yup = require('yup');

const kirimPesanSchema = yup.object({
	body: yup.object({
		nama_lengkap: yup.string().required('Nama lengkap wajib diisi.'),
		email: yup
			.string()
			.email('Format email tidak valid.')
			.matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Alamat email harus memiliki domain yang valid (contoh: email@domain.com)')
			.required('Email wajib diisi.'),
		subjek: yup.string().required('Subjek wajib diisi.'),
		isi_pesan: yup.string().required('Isi pesan wajib diisi.'),
		recaptchaToken: yup.string().required('Token reCAPTCHA wajib ada.'),
	}),
});

module.exports = { kirimPesanSchema };
