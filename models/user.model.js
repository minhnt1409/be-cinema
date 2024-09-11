import db from '../config/database.js';


// Function to get a user by ID
const getOneUser = (user_id, callback) => {
  const query = `SELECT * FROM users WHERE user_id = ?`;
  db.query(query, [user_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length === 0) {
      return callback(new Error('User not found'), null);
    }
    return callback(null, result[0]); // Return the first user found
  });
};

// Function to update a user's information
const updateUser = (user_id, userData, callback) => {
  const { username, email, avatar, fullname, birthday, gender, phone } = userData;

  const query = `UPDATE users SET username = ?, email = ?, avatar = ?, fullname = ?, birthday = ?, gender = ?, phone = ? WHERE user_id = ?`;
  db.query(query, [username, email, avatar, fullname, birthday, gender, phone, user_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('User not found or no changes made'), null);
    }
    return callback(null, result);
  });
};

// Function to delete a user by ID
const deleteUser = (user_id, callback) => {
  const query = `DELETE FROM users WHERE user_id = ?`;
  db.query(query, [user_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('User not found'), null);
    }
    return callback(null, result);
  });
};

export default {
  getOneUser,
  updateUser,
  deleteUser
}