const jwt = require('jsonwebtoken');

const generateToken = (id) => {
	// Membuat token yang berisi ID user dan berlaku selama 30 hari
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

module.exports = generateToken;
