const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const productRoutes = require('./routes/productRoutes');
const priceRoutes = require('./routes/priceRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Krishi Market API is running.' });
});

app.use('/api/products', productRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/weather', weatherRoutes);

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
