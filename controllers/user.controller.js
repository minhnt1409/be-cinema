import User from '../models/user.model.js';

// Get one user by ID
const getOneUser = (req, res) => {
  const { user_id } = req.params;

  // Call the model function to get the user by ID
  User.getOneUser(user_id, (err, user) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json(user);
  });
};

// Update user information
const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { username, email, fullname, birthday, gender, phone } = req.body;

  // Validate required fields
  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required' });
  }

  try {
    const avatar = req.file.path
    const result = await cloudinary.uploader.upload(avatar)
    // Call the model function to update the user
    User.updateUser(user_id, { username, email, avatar: result.secure_url, fullname, birthday, gender, phone }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      return res.status(200).json({ message: 'User updated successfully' });
    });
  } catch (error) {
    res.status(500).send('Error uploading image or params: ' + error.message);
  }
};

// Delete one user by ID
const deleteUser = (req, res) => {
  const { user_id } = req.params;

  // Call the model function to delete the user by ID
  User.deleteUser(user_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  });
};

export default {
  getOneUser,
  updateUser,
  deleteUser
}