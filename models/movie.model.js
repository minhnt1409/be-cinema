import db from '../config/database.js';

// Function to create a new movie
const createMovie = (movieData, callback) => {
  const { movie_name, movie_description, movie_trailer, movie_genres, movie_release, movie_lenght, movie_poster } = movieData;
  const query = `INSERT INTO movies (movie_name, movie_description, movie_trailer, movie_genres, movie_release, movie_lenght, movie_poster) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [movie_name, movie_description, movie_trailer, movie_genres, movie_release, movie_lenght, movie_poster], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

// Function to get all movies
const getAllMovies = (callback) => {
  const query = `SELECT * FROM movies`;
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Function to get a single movie by ID
const getMovieById = (movie_id, callback) => {
  const query = `SELECT * FROM movies WHERE movie_id = ?`;
  db.query(query, [movie_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length === 0) {
      return callback(new Error('Movie not found'), null);
    }
    return callback(null, result[0]);
  });
};

// Function to update a movie by ID
const updateMovie = (movie_id, movieData, callback) => {
  const { movie_name, movie_description, movie_trailer, movie_genres, movie_release, movie_lenght, movie_poster } = movieData;
  const query = `UPDATE movies SET movie_name = ?, movie_description = ?, movie_trailer = ?, movie_genres = ?, movie_release = ?, movie_lenght = ?, movie_poster = ? WHERE movie_id = ?`;
  db.query(query, [movie_name, movie_description, movie_trailer, movie_genres, movie_release, movie_lenght, movie_poster, movie_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('Movie not found or no changes made'), null);
    }
    return callback(null, result);
  });
};

// Function to delete a movie by ID
const deleteMovie = (movie_id, callback) => {
  const query = `DELETE FROM movies WHERE movie_id = ?`;
  db.query(query, [movie_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('Movie not found'), null);
    }
    return callback(null, result);
  });
};

export default {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
