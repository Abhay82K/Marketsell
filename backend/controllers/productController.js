const products = [];

const validateProduct = ({ farmerName, product, quantity, expectedPrice }) => {
  if (!farmerName || typeof farmerName !== 'string' || farmerName.trim().length < 2) {
    return 'Valid farmerName is required.';
  }
  if (!product || typeof product !== 'string' || product.trim().length < 2) {
    return 'Valid product is required.';
  }

  const qty = Number(quantity);
  const price = Number(expectedPrice);

  if (!Number.isFinite(qty) || qty <= 0) return 'quantity must be a positive number.';
  if (!Number.isFinite(price) || price <= 0) return 'expectedPrice must be a positive number.';

  return null;
};

const addProduct = async (req, res) => {
  try {
    const { farmerName, product, quantity, expectedPrice } = req.body;
    const validationError = validateProduct({ farmerName, product, quantity, expectedPrice });

    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const entry = {
      id: `${Date.now()}-${Math.round(Math.random() * 1e6)}`,
      farmerName: farmerName.trim(),
      product: product.trim(),
      quantity: Number(quantity),
      expectedPrice: Number(expectedPrice),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    products.push(entry);

    return res.status(201).json({
      success: true,
      message: 'Product submitted successfully.',
      data: entry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to submit product.',
      error: error.message,
    });
  }
};

const getProducts = async (_req, res) => {
  try {
    const sorted = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.status(200).json({ success: true, data: sorted });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch products.',
      error: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
};
