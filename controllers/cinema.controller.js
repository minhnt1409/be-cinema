import Cinema from "../models/cinema.model.js";

const addCinema = (req, res) => {
  const { cinema_name, cinema_address } = req.body;

  // Check for required fields
  if (!cinema_name || !cinema_address) {
    return res.status(400).json({ message: 'Cinema name and address are required' });
  }

  // Create cinema
  Cinema.createCinema({ cinema_name, cinema_address }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(201).json({ message: 'Cinema added successfully', cinemaId: result.insertId });
  });
};

const getAllCinemas = (req, res) => {
  Cinema.findAllCinemas((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(results);
  });
};

const getOneCinema = (req, res) => {
  const { cinema_id } = req.params;

  Cinema.getOneCinema(cinema_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json(result);
  });
};

// Update a cinema by ID
const updateCinema = (req, res) => {
  const { cinema_id } = req.params;
  const { cinema_name, cinema_address } = req.body;

  // Validate request
  if (!cinema_name || !cinema_address) {
    return res.status(400).json({ message: 'Cinema name and address are required' });
  }

  Cinema.updateCinema(cinema_id, { cinema_name, cinema_address }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(200).json({ message: 'Cinema updated successfully' });
  });
};

// Delete a cinema by ID
const deleteCinema = (req, res) => {
  const { cinema_id } = req.params;

  Cinema.deleteCinema(cinema_id, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(200).json({ message: 'Cinema deleted successfully' });
  });
};


export default {
  addCinema,
  getAllCinemas,
  getOneCinema,
  updateCinema,
  deleteCinema,
};
