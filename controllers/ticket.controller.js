import Ticket from '../models/ticket.model.js';
import Schedule from '../models/schedule.model.js';

// Add a new ticket with multiple seats and update booked_seat in Schedule
const addTicket = (req, res) => {
  const { user_id, schedule_id, seats_id, price, ticket_status } = req.body;

  // Validate required fields
  if (!user_id || !schedule_id || !seats_id || !price) {
    return res.status(400).json({ message: 'User ID, Schedule ID, Seats ID, and price are required' });
  }

  // Step 1: Create the ticket with seats_id
  Ticket.createTicket({ user_id, schedule_id, seats_id, price, ticket_status }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Step 2: Update the booked_seat field in the Schedule table
    Schedule.getScheduleById(schedule_id, (err, schedule) => {
      if (err || !schedule) {
        return res.status(500).json({ error: 'Error fetching schedule for updating booked seats.' });
      }

      // Parse existing booked seats and merge with new seats_id
      let updatedBookedSeats = schedule.booked_seats ? schedule.booked_seats.split(',').map(seat => seat.trim()) : [];
      const newSeats = seats_id.split(',').map(seat => seat.trim());
      newSeats?.forEach(seat => {
        updatedBookedSeats.push(seat)
      })

      // Update booked_seat in the schedule table
      Schedule.updateSchedule(schedule_id, { 
        cinema_id: schedule.cinema_id,
        movie_id: schedule.movie_id,
        room_id: schedule.room_id,
        schedule_date: schedule.schedule_date,
        schedule_start: schedule.schedule_start,
        schedule_end: schedule.schedule_end,
        booked_seats: updatedBookedSeats.join(', '),
        holding_seats: schedule.holding_seats,
      }, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error updating booked seats in the schedule.' });
        }
        // Send response after ticket and schedule are updated
        return res.status(201).json({ message: 'Ticket added and booked seats updated successfully', ticketId: result.insertId });
      });
    });
  });
};

// Get all tickets
const getAllTickets = (req, res) => {
  Ticket.getAllTickets((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(results);
  });
};

// Get ticket by ID
const getTicketById = (req, res) => {
  const { ticket_id } = req.params;

  Ticket.getTicketById(ticket_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json(result);
  });
};

// Get all tickets by user ID
const getTicketsByUserId = (req, res) => {
  const { user_id } = req.params;

  Ticket.getTicketsByUserId(user_id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(results);
  });
};

// Update ticket by ID
const updateTicket = (req, res) => {
  const { ticket_id } = req.params;
  const { seat_id, price, ticket_status } = req.body;

  // Validate required fields
  if (!seat_id || !price || !ticket_status) {
    return res.status(400).json({ message: 'Seat ID, price, and ticket status are required' });
  }

  Ticket.updateTicket(ticket_id, { seat_id, price, ticket_status }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(200).json({ message: 'Ticket updated successfully' });
  });
};

// Delete ticket by ID
const deleteTicket = (req, res) => {
  const { ticket_id } = req.params;

  Ticket.deleteTicket(ticket_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json({ message: 'Ticket deleted successfully' });
  });
};

export default {
  addTicket,
  getAllTickets,
  getTicketById,
  getTicketsByUserId,
  updateTicket,
  deleteTicket,
};
