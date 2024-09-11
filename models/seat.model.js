import db from '../config/database.js';

// Function to create a new seat
const createSeat = (seatData, callback) => {
  const { seat_type, seat_status, room_id, seat_row, number } = seatData;
  const query = `INSERT INTO seats (seat_type, seat_status, room_id, seat_row, number) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [seat_type, seat_status, room_id, seat_row, number], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

// Function to get all seats
const getAllSeats = (callback) => {
  const query = `SELECT * FROM seats`;
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Function to get one seat by ID
const getOneSeat = (seat_id, callback) => {
  const query = `SELECT * FROM seats WHERE seat_id = ?`;
  db.query(query, [seat_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length === 0) {
      return callback(new Error('Seat not found'), null);
    }
    return callback(null, result[0]);
  });
};

// Function to get all seats in a specific room by room_id
const getSeatsByRoomId = (room_id, callback) => {
  const query = `SELECT * FROM seats WHERE room_id = ?`;
  db.query(query, [room_id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Function to update a seat by ID
const updateSeat = (seat_id, seatData, callback) => {
  const { seat_type, seat_status, seat_row, number } = seatData;
  const query = `UPDATE seats SET seat_type = ?, seat_status = ?, seat_row = ?, number = ? WHERE seat_id = ?`;
  db.query(query, [seat_type, seat_status, seat_row, number, seat_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('Seat not found or no changes made'), null);
    }
    return callback(null, result);
  });
};

// Function to delete a seat by ID
const deleteSeat = (seat_id, callback) => {
  const query = `DELETE FROM seats WHERE seat_id = ?`;
  db.query(query, [seat_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('Seat not found'), null);
    }
    return callback(null, result);
  });
};

export default {
  createSeat,
  getAllSeats,
  getOneSeat,
  getSeatsByRoomId,
  updateSeat,
  deleteSeat,
};
