import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import auth from '../controllers/auth.controller.js'
const router = express.Router();
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from "../config/cloudinaryConfig.js";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cinema",
    format: "jpg"
  }
})

const upload = multer({ storage: storage })

router.post('/register', upload.array("images", 10), auth.register);
router.post('/login', auth.login);
router.post('/logout', authMiddleware.verifyToken, auth.logout);

export default router;
