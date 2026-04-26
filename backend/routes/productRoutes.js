const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');

const router = express.Router();

router.post('/', addProduct);   // add product
router.get('/', getProducts);   // get all products

module.exports = router;