import db from '../config/database.js';

// Function to create a new schedule
const createSchedule = (scheduleData, callback) => {
  const { cinema_id, movie_id, room_id, schedule_date, schedule_start, schedule_end, booked_seats, holding_seats } = scheduleData;
  const query = `INSERT INTO schedule (cinema_id, movie_id, room_id, schedule_date, schedule_start, schedule_end, booked_seats, holding_seats) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [cinema_id, movie_id, room_id, schedule_date, schedule_start, schedule_end, booked_seats, holding_seats], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

// Function to get all schedules with optional filters
const getAllSchedules = (filters, callback) => {
  let query = `SELECT * FROM schedule`;
  const filterParams = [];
  const conditions = [];

  if (filters.cinema_id) {
    conditions.push(`cinema_id = ?`);
    filterParams.push(filters.cinema_id);
  }
  if (filters.movie_id) {
    conditions.push(`movie_id = ?`);
    filterParams.push(filters.movie_id);
  }
  if (filters.room_id) {
    conditions.push(`room_id = ?`);
    filterParams.push(filters.room_id);
  }

  // Add the WHERE clause if there are conditions
  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(' AND ');
  }

  console.log(query);
  console.log(filterParams);

  db.query(query, filterParams, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};


// Function to get a schedule by ID
const getScheduleById = (schedule_id, callback) => {
  const query = `SELECT * FROM schedule WHERE schedule_id = ?`;
  db.query(query, [schedule_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length === 0) {
      return callback(new Error('Schedule not found'), null);
    }
    return callback(null, result[0]);
  });
};

// Function to update a schedule by ID
const updateSchedule = (schedule_id, scheduleData, callback) => {
  const { cinema_id, movie_id, room_id, schedule_date, schedule_start, schedule_end, booked_seats, holding_seats } = scheduleData;

  const query = `UPDATE schedule 
                 SET cinema_id = ?, movie_id = ?, room_id = ?, schedule_date = ?, schedule_start = ?, schedule_end = ?, booked_seats = ?, holding_seats = ?
                 WHERE schedule_id = ?`;

  db.query(query, [cinema_id, movie_id, room_id, schedule_date, schedule_start, schedule_end, booked_seats, holding_seats, schedule_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('Schedule not found or no changes made'), null);
    }
    return callback(null, result);
  });
};


// Function to delete a schedule by ID
const deleteSchedule = (schedule_id, callback) => {
  const query = `DELETE FROM schedule WHERE schedule_id = ?`;
  db.query(query, [schedule_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('Schedule not found'), null);
    }
    return callback(null, result);
  });
};

export default {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
