const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		nama: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true, // Setiap username harus unik
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // Otomatis menambahkan field createdAt dan updatedAt
	},
);

// Jalankan fungsi ini SEBELUM menyimpan data user ke database
userSchema.pre('save', async function (next) {
	// Jika password tidak diubah, jangan hash ulang
	if (!this.isModified('password')) {
		next();
	}
	// Generate "salt" untuk memperkuat hash
	const salt = await bcrypt.genSalt(10);
	// Hash password dengan salt
	this.password = await bcrypt.hash(this.password, salt);
});

// Tambahkan method untuk membandingkan password saat login
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
