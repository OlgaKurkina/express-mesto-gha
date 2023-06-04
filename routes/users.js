const router = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  updateUserData,
  updateUserAvatar,
  getUserById,
} = require('../controllers/users');
const {
  userIdValidation,
  userDataValidation,
  avatarValidation,
} = require('../middlewares/validation');

router.get('/', userIdValidation, getUsers);
router.get('/me', userIdValidation, getCurrentUser);
router.get('/:userId', userIdValidation, getUserById);

router.patch('/me', userDataValidation, updateUserData);
router.patch('/me/avatar', avatarValidation, updateUserAvatar);

module.exports = router;
