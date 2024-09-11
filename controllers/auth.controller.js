import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import cloudinary from "../config/cloudinaryConfig.js"
import generateToken from "../helpers/generateToken.js";

// Đăng ký
const register = async (req, res) => {
  try {
    const { username, password, email, fullname, birthday, gender, phone } = req.body;
    const images = req.files.map(file => file.path)
    // Upload avatar file to Cloudinary
    if (images.length == 1) {
      const uploadedImages = []
      for (let image of images){
        const result = await cloudinary.uploader.upload(image)
        uploadedImages.push({
          url: result.secure_url,
          publicId: result.public_id,
        })
      }
      // Create user with the avatar URL
      User.create({
        username,
        password: password,
        email,
        avatar: uploadedImages[0].url, // Save the Cloudinary URL
        fullname,
        birthday,
        gender,
        phone
      }, (err, result) => {
        if (err) return res.status(500).send('Error registering user: ' + err);
        res.status(201).send('User registered successfully');
      });
    } else {
      return res.status(400).send('Avatar file is required');
    }
  } catch (error) {
    res.status(500).send('Error uploading avatar or registering user: ' + error.message);
  }
};

// Đăng nhập
const login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, result) => {
    if (err || result.length === 0) return res.status(404).send('User not found');
    const user = result[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send('Invalid credentials');
    const token = generateToken.generateAccessToken(user)
    res.status(200).json({ token, user });
  });
};

const logout = (req, res) => {
  return res.status(200).json({ message: 'Logged out successfully' });
};

export default {
  register,
  login,
  logout,
}
