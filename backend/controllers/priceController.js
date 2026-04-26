const basePrices = {
  'Wheat Seed': 2400,
  'Rice Seed': 3200,
  'Tomato Hybrid Seed': 1500,
  'Onion Seed': 1800,
};

const priceCache = {
  previous: { ...basePrices },
};

const varyPrice = (current) => {
  const fluctuationPercent = (Math.random() * 2 - 1) * 0.025;
  return Math.max(200, Math.round(current * (1 + fluctuationPercent)));
};

const getPrices = async (_req, res) => {
  try {
    const nextPrices = Object.entries(priceCache.previous).map(([seed, currentPrice]) => ({
      seed,
      price: varyPrice(currentPrice),
    }));

    priceCache.previous = nextPrices.reduce((acc, item) => {
      acc[item.seed] = item.price;
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      source: 'Dynamic demo market price data',
      isLive: false,
      prices: nextPrices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch market prices.',
      error: error.message,
    });
  }
};

module.exports = { getPrices };