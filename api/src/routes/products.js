const { Router } = require('express');
const products = require('../controllers/products');
const protect = require('../middlewares/protect');
const { schemas, validate } = require('../middlewares/validations');

const router = Router();

router
  .route('/')
  .post(protect, validate(schemas.product, 'body'), products.createProduct)
  .get(products.getProducts);
router
  .route('/:product_id')
  .get(products.getProduct)
  .patch(products.updateProduct);

module.exports = router;
