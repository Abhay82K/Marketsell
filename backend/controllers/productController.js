const Product = require('../models/Product');

const addProduct = async (req, res) => {
  try {
    const { farmerName, seedType, variety, quantity, expectedPrice } = req.body;

    const productEntry = await Product.create({
      farmerName,
      seedType,
      variety,
      quantity,
      expectedPrice,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
    });

    return res.status(201).json({
      message: 'Seed listing submitted successfully.',
      data: productEntry,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Unable to submit seed listing.',
      error: error.message,
    });
  }
};

const getProducts = async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to fetch products.',
      error: error.message,
    });
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.status(200).json({
      message: `Product ${status.toLowerCase()} successfully.`,
      data: updated,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Unable to update product status.',
      error: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  updateProductStatus,
};
