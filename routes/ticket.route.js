import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import ticketController from "../controllers/ticket.controller.js";
const ticketRouter = express.Router();

ticketRouter.get("/", authMiddleware.verifyToken, ticketController.getAllTickets);
ticketRouter.post("/", authMiddleware.verifyToken, ticketController.addTicket);
ticketRouter.get("/:ticket_id", authMiddleware.verifyToken, ticketController.getTicketById);
ticketRouter.put("/:ticket_id", authMiddleware.verifyAdmin, ticketController.updateTicket);
ticketRouter.delete("/:ticket_id", authMiddleware.verifyAdmin, ticketController.deleteTicket);
ticketRouter.delete("/user/:user_id/tickets", authMiddleware.verifyToken, ticketController.getTicketsByUserId);

export default ticketRouter;