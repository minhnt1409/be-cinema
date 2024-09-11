import express from "express";
import movieController from "../controllers/movie.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const movieRouter = express.Router();
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

movieRouter.get("/", authMiddleware.verifyToken, movieController.getAllMovies);
movieRouter.post("/", upload.single("movie_poster"), authMiddleware.verifyToken, movieController.addMovie);
movieRouter.get("/:movie_id", authMiddleware.verifyToken, movieController.getMovieById);
movieRouter.put("/:movie_id", upload.single("movie_poster"), authMiddleware.verifyToken, movieController.updateMovie);
movieRouter.delete("/:movie_id", authMiddleware.verifyToken, movieController.deleteMovie);
export default movieRouter;