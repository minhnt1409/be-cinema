import Movie from '../models/movie.model.js';
import cloudinary from "../config/cloudinaryConfig.js"

// Add a new movie
const addMovie = async (req, res) => {
  const { movie_name, movie_description, movie_trailer, movie_genres, movie_release, movie_lenght } = req.body;

  try {
    const movie_poster = req.file.path
    // Validate required fields
    if (!movie_name || !movie_release || !movie_lenght) {
      return res.status(400).json({ message: 'Movie name, release date, and length are required' });
    }
  
    const result = await cloudinary.uploader.upload(movie_poster)
  
    Movie.createMovie({ movie_name, movie_description, movie_trailer, movie_genres, movie_release, movie_lenght, movie_poster: result.secure_url }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(201).json({ message: 'Movie added successfully', movieId: result.insertId });
    });
  } catch (error) {
    res.status(500).send('Error uploading image or params: ' + error.message);
  }
};

// Get all movies
const getAllMovies = (req, res) => {
  Movie.getAllMovies((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(results);
  });
};

// Get movie by ID
const getMovieById = (req, res) => {
  const { movie_id } = req.params;

  Movie.getMovieById(movie_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json(result);
  });
};

// Update movie by ID
const updateMovie = async (req, res) => {
  const { movie_id } = req.params;
  const { movie_name, movie_description, movie_trailer, movie_genres, movie_release, movie_lenght } = req.body;
  // Validate required fields
  if (!movie_name || !movie_release || !movie_lenght) {
    return res.status(400).json({ message: 'Movie name, release date, and length are required' });
  }
  try {
    const movie_poster = req.file.path
    const result = await cloudinary.uploader.upload(movie_poster)
    Movie.updateMovie(movie_id, { movie_name, movie_description, movie_trailer, movie_genres, movie_release, movie_lenght, movie_poster: result.secure_url }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      return res.status(200).json({ message: 'Movie updated successfully' });
    });
  } catch (error) {
    res.status(500).send('Error uploading image or params: ' + error.message);
  }
};

// Delete movie by ID
const deleteMovie = (req, res) => {
  const { movie_id } = req.params;

  Movie.deleteMovie(movie_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json({ message: 'Movie deleted successfully' });
  });
};

export default {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
