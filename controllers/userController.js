const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
	try {
		const { nama, username, password } = req.body;
		const userExists = await User.findOne({ username });

		if (userExists) {
			return res.status(400).json({ message: 'Username sudah digunakan' });
		}
		const user = await User.create({ nama, username, password });

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
		console.error('ERROR saat registerUser:', error);
		res.status(500).json({ message: 'Server Error' });
	}
};

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

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
		console.error('!!! TERJADI ERROR FATAL SAAT LOGIN:', error);
		res.status(500).json({ message: 'Server Error' });
	}
};

module.exports = { registerUser, loginUser };
