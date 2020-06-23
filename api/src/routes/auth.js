const cookieParser = require('cookie-parser');
const { Router } = require('express');
const auth = require('../controllers/auth');
const protect = require('../middlewares/protect');
const { schemas, validate } = require('../middlewares/validations');

const router = Router();

router.post('/register', validate(schemas.register, 'body'), auth.register);
router.post('/login', validate(schemas.login, 'body'), auth.login);
router.get('/logout', auth.logout);
router.get('/refresh_token', cookieParser(), auth.refreshToken);
router.get('/load_session', protect, auth.loadSession);

module.exports = router;
