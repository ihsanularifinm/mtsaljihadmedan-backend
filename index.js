const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors'); // 1. Impor cors
const beritaRoutes = require('./routes/beritaRoutes');

connectDB();
const app = express();

// 2. Gunakan middleware cors agar frontend bisa mengakses API ini
app.use(cors());

const PORT = 5000;
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
	res.send('API berjalan...');
});

app.use('/api/berita', beritaRoutes);

app.listen(PORT, () => {
	console.log(`Server berjalan di port ${PORT}`);
});
