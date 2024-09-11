import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import roomController from "../controllers/room.controller.js";
const roomRouter = express.Router();

roomRouter.get("/", authMiddleware.verifyToken, roomController.getAllRooms);
roomRouter.post("/", authMiddleware.verifyToken, roomController.addRoom);
roomRouter.get("/:room_id", authMiddleware.verifyToken, roomController.getOneRoom);
roomRouter.put("/:room_id", authMiddleware.verifyToken, roomController.updateRoom);
roomRouter.delete("/:room_id", authMiddleware.verifyToken, roomController.deleteRoom);
roomRouter.get('/cinema/:cinema_id', authMiddleware.verifyToken, roomController.getRoomsByCinemaId);

export default roomRouter;