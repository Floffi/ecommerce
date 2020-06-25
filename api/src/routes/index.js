const { Router } = require('express');
const auth = require('./auth');
const categories = require('./categories');
const products = require('./products');

const router = Router();

router.use('/auth', auth);
router.use('/categories', categories);
router.use('/products', products);

module.exports = router;
