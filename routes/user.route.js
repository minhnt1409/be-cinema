import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import userController from "../controllers/user.controller.js";
const userRouter = express.Router();
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

userRouter.get("/:user_id", authMiddleware.verifyToken, userController.getOneUser);
userRouter.put("/:user_id", upload.single("avatar"), authMiddleware.verifyToken, userController.updateUser);
userRouter.delete("/:user_id", authMiddleware.verifyAdmin, userController.deleteUser);
userRouter.post('/forgot-password', authMiddleware.verifyToken, userController.sendOtp);
userRouter.post('/verify-otp', authMiddleware.verifyToken, userController.verifyOtp);
userRouter.post('/reset-password', authMiddleware.verifyToken, userController.resetPassword);
userRouter.post('/change-password', authMiddleware.verifyToken, userController.changePassword);

export default userRouter;