const router = require('express').Router();
const {
  createUser,
  getUsers,
  getCurrentUser,
  updateUserData,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getCurrentUser);
router.post('/', createUser);
router.patch('/me', updateUserData);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
