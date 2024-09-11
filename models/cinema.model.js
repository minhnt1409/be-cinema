import db from '../config/database.js';

// Function to create a new cinema
const createCinema = (cinemaData, callback) => {
  const { cinema_name, cinema_address } = cinemaData;

  const query = `INSERT INTO cinemas (cinema_name, cinema_address) VALUES (?, ?)`;
  db.query(query, [cinema_name, cinema_address], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

// Function to find all cinemas
const findAllCinemas = (callback) => {
  const query = `SELECT * FROM cinemas`;
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const getOneCinema = (cinema_id, callback) => {
  const query = `SELECT * FROM cinemas WHERE cinema_id = ?`;
  db.query(query, [cinema_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length === 0) {
      return callback(new Error('Cinema not found'), null);
    }
    return callback(null, result[0]);
  });
};

// Function to update a cinema by ID
const updateCinema = (cinema_id, cinemaData, callback) => {
  const { cinema_name, cinema_address } = cinemaData;
  const query = `UPDATE cinemas SET cinema_name = ?, cinema_address = ? WHERE cinema_id = ?`;
  db.query(query, [cinema_name, cinema_address, cinema_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('Cinema not found or no changes made'), null);
    }
    return callback(null, result);
  });
};

// Function to delete a cinema by ID
const deleteCinema = (cinema_id, callback) => {
  const query = `DELETE FROM cinemas WHERE cinema_id = ?`;
  db.query(query, [cinema_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('Cinema not found'), null);
    }
    return callback(null, result);
  });
};

export default {
  createCinema,
  findAllCinemas,
  getOneCinema,
  updateCinema,
  deleteCinema,
};
