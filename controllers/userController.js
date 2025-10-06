const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');

// @desc    Mendaftarkan user admin baru
// @route   POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
	const { nama, username, password } = req.body;
	const userExists = await User.findOne({ username });

	if (userExists) {
		res.status(400);
		throw new Error('Username sudah digunakan');
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
		res.status(400);
		throw new Error('Data user tidak valid');
	}
});

// @desc    Login & mendapatkan token
// @route   POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
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
		res.status(401);
		throw new Error('Username atau password salah');
	}
});

module.exports = { registerUser, loginUser };
