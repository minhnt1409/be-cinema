import Schedule from '../models/schedule.model.js';

// Add a new schedule
const addSchedule = (req, res) => {
  const { cinema_id, movie_id, room_id, schedule_date, schedule_start, schedule_end, booked_seats, holding_seats } = req.body;

  // Validate required fields
  if (!movie_id || !room_id || !schedule_date || !schedule_start || !schedule_end) {
    return res.status(400).json({ message: 'Movie ID, Room ID, schedule date, start time, and end time are required' });
  }

  Schedule.createSchedule({ cinema_id, movie_id, room_id, schedule_date, schedule_start, schedule_end, booked_seats, holding_seats }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(201).json({ message: 'Schedule added successfully', scheduleId: result.insertId });
  });
};

// Get all schedules with optional filters for cinema_id, movie_id, and room_id
const getAllSchedules = (req, res) => {
  const { cinema_id, movie_id, room_id } = req.query;  // Fetching filters from query params

  const filters = {
    cinema_id: cinema_id || null,
    movie_id: movie_id || null,
    room_id: room_id || null,
  };

  Schedule.getAllSchedules(filters, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(results);
  });
};


// Get schedule by ID
const getScheduleById = (req, res) => {
  const { schedule_id } = req.params;

  Schedule.getScheduleById(schedule_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json(result);
  });
};

// Update schedule by ID
const updateSchedule = (req, res) => {
  const { schedule_id } = req.params;
  const { cinema_id, movie_id, room_id, schedule_date, schedule_start, schedule_end, booked_seats, holding_seats } = req.body;

  // Validate required fields
  if (!movie_id || !room_id || !schedule_date || !schedule_start || !schedule_end) {
    return res.status(400).json({ message: 'Movie ID, Room ID, schedule date, start time, and end time are required' });
  }

  Schedule.updateSchedule(schedule_id, { cinema_id, movie_id, room_id, schedule_date, schedule_start, schedule_end, booked_seats, holding_seats }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(200).json({ message: 'Schedule updated successfully' });
  });
};

// Delete schedule by ID
const deleteSchedule = (req, res) => {
  const { schedule_id } = req.params;

  Schedule.deleteSchedule(schedule_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json({ message: 'Schedule deleted successfully' });
  });
};

export default {
  addSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
