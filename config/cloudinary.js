const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Konfigurasi Cloudinary dengan kredensial dari .env
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfigurasi storage engine untuk multer
const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'mts-aljihad-medan', // Nama folder di Cloudinary
		allowedFormats: ['jpeg', 'png', 'jpg'],
	},
});

module.exports = {
	cloudinary,
	storage,
};
