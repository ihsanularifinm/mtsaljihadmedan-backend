const yup = require('yup');

const tambahPendaftarSchema = yup.object({
	body: yup.object({
		nama_lengkap: yup.string().required('Nama lengkap wajib diisi.'),
		nisn: yup.string().required('NISN wajib diisi.'),
		asal_sekolah: yup.string().required('Asal sekolah wajib diisi.'),
		nama_wali: yup.string().required('Nama wali wajib diisi.'),
		kontak_wali: yup.string().required('Kontak wali wajib diisi.'),
		recaptchaToken: yup.string().required('Token reCAPTCHA wajib ada.'),
	}),
});

module.exports = { tambahPendaftarSchema };
