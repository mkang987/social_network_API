const router = require('express').Router();
const {
  getUsers,
  getSpecificUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSpecificUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/
router.route('/:userId/friends/').post(addFriend).delete(removeFriend);

module.exports = router;