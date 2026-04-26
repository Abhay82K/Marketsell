const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    farmerName: {
      type: String,
      required: [true, 'Farmer name is required'],
      trim: true,
      minlength: 2,
    },
    product: {
      type: String,
      required: [true, 'Product is required'],
      enum: ['Wheat', 'Rice', 'Maize', 'Tomato', 'Onion', 'Vegetables', 'Pulses'],
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
