const basePrices = {
  Wheat: 2420,
  Rice: 3180,
  Maize: 2210,
  Tomato: 1950,
  Onion: 2680,
};

const priceCache = {
  data: null,
  lastUpdated: null,
};

const varyPrice = (current) => {
  // Small random walk for realistic market-like fluctuations.
  const fluctuationPercent = (Math.random() * 2 - 1) * 0.02; // +/-2%
  return Math.max(500, Math.round(current * (1 + fluctuationPercent)));
};

const generatePrices = () => {
  const previous = priceCache.data || basePrices;
  const generated = {};

  Object.entries(previous).forEach(([crop, value]) => {
    generated[crop] = varyPrice(value);
  });

  return generated;
};

const getPrices = async (_req, res) => {
  try {
    priceCache.data = generatePrices();
    priceCache.lastUpdated = new Date();

    const trendMap = {};
    Object.entries(priceCache.data).forEach(([crop, value]) => {
      const previousValue = (priceCache.previousData && priceCache.previousData[crop]) || basePrices[crop];
      trendMap[crop] = value >= previousValue ? 'up' : 'down';
    });

    priceCache.previousData = { ...priceCache.data };

    return res.status(200).json({
      data: Object.entries(priceCache.data).map(([crop, price]) => ({
        crop,
        price,
        trend: trendMap[crop],
      })),
      lastUpdated: priceCache.lastUpdated,
      source: 'Simulated live market feed',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch market prices.',
      error: error.message,
    });
  }
};

module.exports = { getPrices };
