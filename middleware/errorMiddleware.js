// Middleware untuk menangani rute yang tidak ditemukan (404)
const notFound = (req, res, next) => {
	const error = new Error(`Tidak Ditemukan - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// Middleware untuk menangani semua error lainnya
const errorHandler = (err, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let message = err.message;

	// Khusus untuk error Mongoose (misal: ID tidak valid)
	if (err.name === 'CastError' && err.kind === 'ObjectId') {
		statusCode = 404;
		message = 'Resource tidak ditemukan';
	}

	res.status(statusCode).json({
		message: message,
		// Tampilkan stack trace hanya jika kita tidak di mode produksi
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

module.exports = { notFound, errorHandler };
