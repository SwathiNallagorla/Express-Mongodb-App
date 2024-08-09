const express = require('express');
const {
  createUser,
  getAllUsers,
  getUsersByAge,
  getUsersAboveAge,
  getUsersByName,
  getUsersOrderedByName,
  updateUser,
  deleteUser,
  deleteUsersByEmail,
} = require('../controllers/userController');

const router = express.Router();

router.post('/user', createUser);
router.get('/users', getAllUsers);
router.get('/usersbyage/:age', getUsersByAge);
router.get('/usersaboveage/:age', getUsersAboveAge);
router.get('/users/name/:name', getUsersByName);
router.get('/users/orderByName', getUsersOrderedByName);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.delete('/users/email/:email', deleteUsersByEmail);

module.exports = router;
