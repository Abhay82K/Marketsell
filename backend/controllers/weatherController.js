const DEFAULT_COORDS = {
  lat: 28.6139,
  lon: 77.209,
};

const parseCoord = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getWeather = async (req, res) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'OPENWEATHER_API_KEY is missing.',
      });
    }

    const lat = parseCoord(req.query.lat, DEFAULT_COORDS.lat);
    const lon = parseCoord(req.query.lon, DEFAULT_COORDS.lon);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const payload = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: payload.message || 'Failed to fetch weather.',
      });
    }

    return res.status(200).json({
      source: 'OpenWeather Live API',
      isLive: true,
      location: `${payload.name || 'Unknown'}, ${payload.sys?.country || ''}`.trim(),
      temperature: payload.main?.temp,
      humidity: payload.main?.humidity,
      condition: payload.weather?.[0]?.main || 'N/A',
      windSpeed: payload.wind?.speed,
      lat: payload.coord?.lat ?? lat,
      lon: payload.coord?.lon ?? lon,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch weather data.',
      error: error.message,
    });
  }
};

module.exports = { getWeather };
