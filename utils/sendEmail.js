const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (options) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: `MTs Al-Jihad Medan <${process.env.EMAIL_USER}>`,
		to: options.to,
		subject: options.subject,
		html: options.html,
	};

	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
