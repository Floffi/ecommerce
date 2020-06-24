const { Router } = require('express');
const categories = require('../controllers/categories');
const protect = require('../middlewares/protect');
const { schemas, validate } = require('../middlewares/validations');

const router = Router();

router
  .route('/')
  .post(protect, validate(schemas.category, 'body'), categories.createCategory)
  .get(categories.getCategories);
router
  .route('/:category_id')
  .get(categories.getCategory)
  .patch(categories.updateCategory);

module.exports = router;
