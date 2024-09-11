import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import cinemaController from "../controllers/cinema.controller.js";
const cinemaRouter = express.Router();

cinemaRouter.get("/", authMiddleware.verifyToken, cinemaController.getAllCinemas);
cinemaRouter.post("/", authMiddleware.verifyAdmin, cinemaController.addCinema);
cinemaRouter.get("/:cinema_id", authMiddleware.verifyToken, cinemaController.getOneCinema);
cinemaRouter.put("/:cinema_id", authMiddleware.verifyAdmin, cinemaController.updateCinema);
cinemaRouter.delete("/:cinema_id", authMiddleware.verifyAdmin, cinemaController.deleteCinema);

export default cinemaRouter;