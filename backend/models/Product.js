const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    farmerName: {
      type: String,
      required: [true, 'Farmer name is required'],
      trim: true,
      minlength: 2,
    },
    seedType: {
      type: String,
      required: [true, 'Seed type is required'],
      enum: ['Wheat Seed', 'Rice Seed', 'Tomato Seed', 'Onion Seed'],
    },
    variety: {
      type: String,
      required: [true, 'Variety is required'],
      enum: ['Hybrid', 'Organic', 'Local'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: 1,
    },
    expectedPrice: {
      type: Number,
      required: [true, 'Expected price is required'],
      min: 1,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
