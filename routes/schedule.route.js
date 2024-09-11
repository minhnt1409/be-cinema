import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import scheduleController from "../controllers/schedule.controller.js";
const scheduleRouter = express.Router();

scheduleRouter.get("/", authMiddleware.verifyToken, scheduleController.getAllSchedules);
scheduleRouter.post("/", authMiddleware.verifyToken, scheduleController.addSchedule);
scheduleRouter.get("/:schedule_id", authMiddleware.verifyToken, scheduleController.getScheduleById);
scheduleRouter.put("/:schedule_id", authMiddleware.verifyToken, scheduleController.updateSchedule);
scheduleRouter.delete("/:schedule_id", authMiddleware.verifyToken, scheduleController.deleteSchedule);

export default scheduleRouter;