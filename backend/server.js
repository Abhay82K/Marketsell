require('dotenv').config();

const express = require('express');
<<<<<<< HEAD
const path = require('path');
const dotenv = require('dotenv');

const productRoutes = require('./routes/productRoutes');
const priceRoutes = require('./routes/priceRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

dotenv.config();
=======
const cors = require('cors');
>>>>>>> 79569c8 (Resolved merge conflict and updated backend)

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Krishi Market backend running');
});

<<<<<<< HEAD
app.use('/api/products', productRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/weather', weatherRoutes);
=======
app.get('/api/weather', async (req, res) => {
  try {
    const lat = req.query.lat || 28.61;
    const lon = req.query.lon || 77.23;
>>>>>>> 79569c8 (Resolved merge conflict and updated backend)

    const apiKey = process.env.OPENWEATHER_API_KEY;

<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
=======
    if (!apiKey) {
      return res.status(500).json({
        message: 'OPENWEATHER_API_KEY missing in .env',
      });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        message: 'OpenWeather API error',
        error: data,
      });
    }

    res.json({
      source: 'OpenWeather Live API',
      isLive: true,
      location: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      condition: data.weather[0].description,
      windSpeed: data.wind.speed,
      lat,
      lon,
      fetchedAt: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Weather API failed',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
>>>>>>> 79569c8 (Resolved merge conflict and updated backend)
