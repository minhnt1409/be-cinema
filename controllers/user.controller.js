import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { JWT_ACCESS_KEY } from "../helpers/config-env.js";

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

// Send OTP to email
const sendOtp = (req, res) => {
  const { email } = req.body;

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Get user by email
  User.getUserByEmail(email, (err, user) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }

    // Store OTP and expiration in the database
    User.storeOtpForUser(user.user_id, otp, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error storing OTP:' + err});
      }

      // Send OTP via email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'admin@gmail.com',       // Email gửi otp cho người dùng
          pass: '**** **** **** ****', // mật khẩu ứng dụng của gmail
        },
      });

      const mailOptions = {
        from: 'admin@gmail.com',       // Email gửi otp cho người dùng
        to: email,
        subject: 'Your OTP for Password Reset',
        text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Error sending OTP:' + error });
        }
        return res.status(200).json({ message: 'OTP sent successfully' });
      });
    });
  });
};

// Verify OTP
const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  User.verifyOtp(email, otp, (err, user) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(200).json({ message: 'OTP verified successfully', user_id: user.user_id });
  });
};

// Reset password
const resetPassword = (req, res) => {
  const { user_id, newPassword } = req.body;

  // Hash the new password
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  // Update password in the database
  User.updatePassword(user_id, hashedPassword, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating password' });
    }
    return res.status(200).json({ message: 'Password reset successfully' });
  });
};

const changePassword = (req, res) => {
  // Lấy token từ header Authorization
  const token = req.headers['authorization'].split(" ")[1];

  // Kiểm tra nếu token không tồn tại
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Giải mã token để lấy user_id
  jwt.verify(token, JWT_ACCESS_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token'});
    }

    const user_id = decoded.id;

    const { oldPassword, newPassword } = req.body;

    // Validate required fields
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Old and new passwords are required' });
    }

    // Step 1: Get the user by ID
    User.getOneUser(user_id, (err, user) => {
      if (err || !user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Step 2: Validate the old password
      const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: 'Invalid current password' });
      }

      // Step 3: Hash the new password
      const hashedPassword = bcrypt.hashSync(newPassword, 10);

      // Step 4: Update the password in the database
      User.updatePassword(user.user_id, hashedPassword, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating password' });
        }
        return res.status(200).json({ message: 'Password changed successfully' });
      });
    });
  });
};

export default {
  changePassword,
  getOneUser,
  updateUser,
  deleteUser,
  sendOtp,
  resetPassword,
  verifyOtp
}