const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
	res.send('Halo, ini adalah server API MTs Al-Jihad!');
});

app.listen(PORT, () => {
	console.log(`Server berjalan di port ${PORT}`);
});
