const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
	definition: {
		openapi: '3.0.4',
		info: {
			title: 'API MTs Al-Jihad Medan',
			version: '1.0.0',
			description: 'Dokumentasi API untuk Sistem Informasi Sekolah MTs Al-Jihad Medan',
		},
		servers: [
			{
				url: 'http://localhost:5000',
				description: 'Server Development',
			},
			{
				url: 'https://mtsaljihadmedan.sch.id',
				description: 'Server Produksi',
			},
		],
	},
	// Path ke file-file yang berisi dokumentasi API (yaitu file routes kita)
	apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
