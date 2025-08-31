const mongoose = require('mongoose');
require('dotenv').config(); // Memuat variabel dari file .env

const connectDB = async () => {
	try {
		// Ambil URI dari variabel lingkungan, bukan ditulis langsung
		const uri = process.env.MONGO_URI;

		const conn = await mongoose.connect(uri);
		console.log(`MongoDB Terhubung: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
