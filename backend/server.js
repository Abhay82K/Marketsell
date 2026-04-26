require('dotenv').config();

const express = require('express');
const cors = require('cors');

const weatherRoutes = require('./routes/weatherRoutes');
const productRoutes = require('./routes/productRoutes');
const priceRoutes = require('./routes/priceRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Krishi Market backend running');
});

app.use('/api/weather', weatherRoutes);
app.use('/api/products', productRoutes);
app.use('/api/prices', priceRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});