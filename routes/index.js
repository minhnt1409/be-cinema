import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import cinemaRoutes from "./cinema.route.js";
import roomRoutes from "./room.route.js";
import seatRoutes from "./seat.route.js";
import movieRoutes from "./movie.route.js";
import scheduleRoutes from "./schedule.route.js";
import ticketRoutes from "./ticket.route.js";

const route = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/cinema', cinemaRoutes);
  app.use('/api/room', roomRoutes);
  app.use('/api/seat', seatRoutes);
  app.use('/api/movie', movieRoutes);
  app.use('/api/schedule', scheduleRoutes);
  app.use('/api/ticket', ticketRoutes);
  app.get('/check', (req, res) => res.status(200).json({ message: "Healthy!" }))
}

export default route;