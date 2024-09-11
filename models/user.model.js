import db from '../config/database.js';
import bcrypt from "bcrypt";

// Function to store OTP for a user in the database
const storeOtpForUser = (user_id, otp, callback) => {
  const query = `UPDATE users SET otp = ?, otp_expiration = DATE_ADD(NOW(), INTERVAL 10 MINUTE) WHERE user_id = ?`;
  db.query(query, [otp, user_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

const create = (data, callback) => {
  const { username, password, email, avatar, fullname, birthday, gender, phone } = data;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = 'INSERT INTO users (username, password, email, avatar, fullname, birthday, gender, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [username, hashedPassword, email, avatar, fullname, birthday, gender, phone], callback);
};

const findByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

// Function to get user by email
const getUserByEmail = (email, callback) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length === 0) {
      return callback(new Error('User not found'), null);
    }
    return callback(null, result[0]);
  });
};

// Function to verify OTP for a user
const verifyOtp = (email, otp, callback) => {
  const query = `SELECT * FROM users WHERE email = ? AND otp = ? AND otp_expiration > NOW()`;
  db.query(query, [email, otp], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length === 0) {
      return callback(new Error('Invalid or expired OTP'), null);
    }
    return callback(null, result[0]);
  });
};

// Function to update the password after OTP verification
const updatePassword = (user_id, hashedPassword, callback) => {
  const query = `UPDATE users SET password = ? WHERE user_id = ?`;
  db.query(query, [hashedPassword, user_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

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
  create,
  findByEmail,
  storeOtpForUser,
  getUserByEmail,
  updatePassword,
  verifyOtp,
  getOneUser,
  updateUser,
  deleteUser
}