import Room from '../models/room.model.js';

// Get all rooms
const getAllRooms = (req, res) => {
  Room.getAllRooms((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(results);
  });
};

// Get one room by ID
const getOneRoom = (req, res) => {
  const { room_id } = req.params;

  Room.getOneRoom(room_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json(result);
  });
};

// Add a new room
const addRoom = (req, res) => {
  const { cinema_id, room_name } = req.body;

  // Validate request
  if (!cinema_id || !room_name) {
    return res.status(400).json({ message: 'Cinema ID and room name are required' });
  }

  Room.createRoom({ cinema_id, room_name }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(201).json({ message: 'Room added successfully', roomId: result.insertId });
  });
};

// Update a room by ID
const updateRoom = (req, res) => {
  const { room_id } = req.params;
  const { cinema_id, room_name } = req.body;

  // Validate request
  if (!cinema_id || !room_name) {
    return res.status(400).json({ message: 'Cinema ID and room name are required' });
  }

  Room.updateRoom(room_id, { cinema_id, room_name }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(200).json({ message: 'Room updated successfully' });
  });
};

// Delete a room by ID
const deleteRoom = (req, res) => {
  const { room_id } = req.params;

  Room.deleteRoom(room_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json({ message: 'Room deleted successfully' });
  });
};

// Get rooms by cinema ID
const getRoomsByCinemaId = (req, res) => {
  const { cinema_id } = req.params;

  Room.getRoomsByCinemaId(cinema_id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No rooms found for this cinema' });
    }
    return res.status(200).json(results);
  });
};

export default {
  getAllRooms,
  getOneRoom,
  addRoom,
  updateRoom,
  deleteRoom,
  getRoomsByCinemaId,
};
