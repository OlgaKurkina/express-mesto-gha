const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

const {
  loginUser,
  createNewUser,
} = require('../controllers/users');
const {
  registerValidation,
  loginValidation,
} = require('../middlewares/validation');
const { NotFound } = require('../utils/errors/errors');

router.post('/signup', registerValidation, createNewUser);
router.post('/signin', loginValidation, loginUser);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('/*', (req, res, next) => next(new NotFound('Страница не найдена')));

module.exports = router;
