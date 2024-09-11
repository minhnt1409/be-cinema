import Seat from '../models/seat.model.js';

// Get all seats
const getAllSeats = (req, res) => {
  Seat.getAllSeats((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(results);
  });
};

// Get one seat by ID
const getOneSeat = (req, res) => {
  const { seat_id } = req.params;

  Seat.getOneSeat(seat_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json(result);
  });
};

// Get all seats by room ID
const getSeatsByRoomId = (req, res) => {
  const { room_id } = req.params;

  Seat.getSeatsByRoomId(room_id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(results);
  });
};

// Add a new seat
const addSeat = (req, res) => {
  const { seat_type, seat_status, room_id, seat_row, number } = req.body;

  // Validate request
  if (!seat_type || !room_id || !seat_row || !number) {
    return res.status(400).json({ message: 'Seat type, room ID, seat row, and number are required' });
  }

  Seat.createSeat({ seat_type, seat_status, room_id, seat_row, number }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(201).json({ message: 'Seat added successfully', seatId: result.insertId });
  });
};

// Update a seat by ID
const updateSeat = (req, res) => {
  const { seat_id } = req.params;
  const { seat_type, seat_status, seat_row, number } = req.body;

  // Validate request
  if (!seat_type || !seat_row || !number) {
    return res.status(400).json({ message: 'Seat type, row, and number are required' });
  }

  Seat.updateSeat(seat_id, { seat_type, seat_status, seat_row, number }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(200).json({ message: 'Seat updated successfully' });
  });
};

// Delete a seat by ID
const deleteSeat = (req, res) => {
  const { seat_id } = req.params;

  Seat.deleteSeat(seat_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json({ message: 'Seat deleted successfully' });
  });
};

export default {
  getAllSeats,
  getOneSeat,
  getSeatsByRoomId,
  addSeat,
  updateSeat,
  deleteSeat,
};
