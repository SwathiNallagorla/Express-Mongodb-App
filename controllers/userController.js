const User = require('../models/user');

// Validate user data
const validateUser = (user) => {
  if (!user.name || !user.email || !user.age || !user.password) {
    return { code: 300, message: 'Invalid data' };
  }
  if (user.name.length < 5 || user.name.length > 10) {
    return { code: 301, message: 'Invalid name' };
  }
  if (user.password.length < 5 || user.password.length > 10) {
    return { code: 302, message: 'Invalid password' };
  }
  if (user.age < 18) {
    return { code: 303, message: 'Invalid age' };
  }
  return null;
};

// Create a new user
const createUser = async (req, res) => {
  const validationError = validateUser(req.body);
  if (validationError) {
    return res.status(400).json(validationError);
  }

  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({ code: 201, message: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get users by age
const getUsersByAge = async (req, res) => {
  const age = parseInt(req.params.age);
  try {
    const users = await User.find({ age });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get users above a certain age
const getUsersAboveAge = async (req, res) => {
  const age = parseInt(req.params.age);
  try {
    const users = await User.find({ age: { $gt: age } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get users by name (partial match)
const getUsersByName = async (req, res) => {
  const name = req.params.name;
  try {
    const users = await User.find({ name: new RegExp(name, 'i') });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get users ordered by name
const getUsersOrderedByName = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const validationError = validateUser(req.body);
  if (validationError) {
    return res.status(400).json(validationError);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ code: 404, message: 'User not found' });
    }
    res.status(200).json({ code: 201, message: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ code: 404, message: 'User not found' });
    }
    res.status(200).json({ message: deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Delete users by email
const deleteUsersByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const deletedUsers = await User.deleteMany({ email });
    res.status(200).json({ message: deletedUsers });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting users', error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUsersByAge,
  getUsersAboveAge,
  getUsersByName,
  getUsersOrderedByName,
  updateUser,
  deleteUser,
  deleteUsersByEmail,
};
