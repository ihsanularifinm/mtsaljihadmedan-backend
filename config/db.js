const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const uri = 'mongodb+srv://sismtsaljihadmedan_admin:QMHZY6rAT1ZQWgug@cluster0.qd5kw9s.mongodb.net/db_mtsaljihad?retryWrites=true&w=majority&appName=Cluster0';

		const conn = await mongoose.connect(uri);

		console.log(`MongoDB Terhubung: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
