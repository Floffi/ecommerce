const { Router } = require('express');
const auth = require('./auth');
const categories = require('./categories');

const router = Router();

router.use('/auth', auth);
router.use('/categories', categories);

module.exports = router;
