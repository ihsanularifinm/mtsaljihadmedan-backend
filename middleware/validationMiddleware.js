const validate = (schema) => async (req, res, next) => {
	try {
		await schema.validate(
			{
				body: req.body,
				query: req.query,
				params: req.params,
			},
			{ abortEarly: false }, // Kumpulkan semua error, jangan berhenti di error pertama
		);
		return next();
	} catch (err) {
		// Jika validasi gagal, kirim balasan error yang jelas
		return res.status(400).json({ type: err.name, errors: err.errors });
	}
};

module.exports = validate;
