const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Mendaftarkan user admin baru
// @route   POST /api/users/register
const registerUser = async (req, res) => {
	try {
		const { nama, username, password } = req.body;
		const userExists = await User.findOne({ username });

		if (userExists) {
			return res.status(400).json({ message: 'Username sudah digunakan' });
		}

		const user = await User.create({
			nama,
			username,
			password, // Password akan di-hash otomatis oleh model
		});

		if (user) {
			res.status(201).json({
				_id: user._id,
				nama: user.nama,
				username: user.username,
				token: generateToken(user._id),
			});
		} else {
			res.status(400).json({ message: 'Data user tidak valid' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

// @desc    Login & mendapatkan token
// @route   POST /api/users/login
const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		// Cek apakah user ada DAN password cocok (menggunakan method dari model)
		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				nama: user.nama,
				username: user.username,
				token: generateToken(user._id),
			});
		} else {
			res.status(401).json({ message: 'Username atau password salah' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

module.exports = { registerUser, loginUser };
