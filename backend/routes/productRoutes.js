const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  addProduct,
  getProducts,
  updateProductStatus,
} = require('../controllers/productController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '../../backend/uploads')),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image uploads are allowed.'));
    }
  },
});

router.post('/', upload.single('productImage'), addProduct);
router.get('/', getProducts);
router.patch('/:id', updateProductStatus);

module.exports = router;
