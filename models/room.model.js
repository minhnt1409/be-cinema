import db from '../config/database.js';

// Function to create a new room
const createRoom = (roomData, callback) => {
  const { cinema_id, room_name } = roomData;
  const query = `INSERT INTO room (cinema_id, room_name) VALUES (?, ?)`;
  db.query(query, [cinema_id, room_name], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

// Function to get all rooms
const getAllRooms = (callback) => {
  const query = `SELECT * FROM room`;
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Function to get one room by ID
const getOneRoom = (room_id, callback) => {
  const query = `SELECT * FROM room WHERE room_id = ?`;
  db.query(query, [room_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length === 0) {
      return callback(new Error('Room not found'), null);
    }
    return callback(null, result[0]);
  });
};

// Function to update a room by ID
const updateRoom = (room_id, roomData, callback) => {
  const { cinema_id, room_name } = roomData;
  const query = `UPDATE room SET cinema_id = ?, room_name = ? WHERE room_id = ?`;
  db.query(query, [cinema_id, room_name, room_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('Room not found or no changes made'), null);
    }
    return callback(null, result);
  });
};

// Function to delete a room by ID
const deleteRoom = (room_id, callback) => {
  const query = `DELETE FROM room WHERE room_id = ?`;
  db.query(query, [room_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('Room not found'), null);
    }
    return callback(null, result);
  });
};

// Function to get all rooms for a specific cinema by cinema_id
const getRoomsByCinemaId = (cinema_id, callback) => {
  const query = `SELECT * FROM room WHERE cinema_id = ?`;
  db.query(query, [cinema_id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

export default {
  createRoom,
  getAllRooms,
  getOneRoom,
  updateRoom,
  deleteRoom,
  getRoomsByCinemaId,
};
