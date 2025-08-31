const express = require('express');
const connectDB = require('./config/db'); // Ini sudah benar
const beritaRoutes = require('./routes/beritaRoutes');

// Hubungkan ke Database
connectDB();

const app = express();
const PORT = 5000;

// Middleware untuk menerima body request dalam format JSON
app.use(express.json());

app.get('/', (req, res) => {
	res.send('API berjalan...');
});

// Gunakan rute berita
app.use('/api/berita', beritaRoutes);

app.listen(PORT, () => {
	console.log(`Server berjalan di port ${PORT}`);
});
