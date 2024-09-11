import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import seatController from "../controllers/seat.controller.js";
const router = express.Router();

router.get("/", authMiddleware.verifyToken, seatController.getAllSeats);
router.post("/", authMiddleware.verifyToken, seatController.addSeat);
router.get("/:seat_id", authMiddleware.verifyToken, seatController.getOneSeat);
router.put("/:seat_id", authMiddleware.verifyToken, seatController.updateSeat);
router.delete("/:seat_id", authMiddleware.verifyToken, seatController.deleteSeat);
router.get('/room/:room_id', authMiddleware.verifyToken, seatController.getSeatsByRoomId);

export default router;