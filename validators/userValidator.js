const yup = require('yup');

const registerSchema = yup.object({
	body: yup.object({
		nama: yup.string().required('Nama wajib diisi.'),
		username: yup.string().required('Username wajib diisi.'),
		password: yup.string().min(8, 'Password minimal 8 karakter.').required('Password wajib diisi.'),
	}),
});

// Kita juga bisa buat skema untuk login di sini
const loginSchema = yup.object({
	body: yup.object({
		username: yup.string().required('Username wajib diisi.'),
		password: yup.string().required('Password wajib diisi.'),
	}),
});

module.exports = { registerSchema, loginSchema };
