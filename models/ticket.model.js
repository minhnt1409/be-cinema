import db from '../config/database.js';

// Function to create a new ticket
const createTicket = (ticketData, callback) => {
  const { user_id, schedule_id, seats_id, price, ticket_status } = ticketData;
  const query = `INSERT INTO ticket (user_id, schedule_id, seats_id, price, ticket_status) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [user_id, schedule_id, seats_id, price, ticket_status || 'booked'], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

// Function to get all tickets
const getAllTickets = (callback) => {
  const query = `SELECT * FROM ticket`;
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Function to get a single ticket by ID
const getTicketById = (ticket_id, callback) => {
  const query = `SELECT * FROM ticket WHERE ticket_id = ?`;
  db.query(query, [ticket_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length === 0) {
      return callback(new Error('Ticket not found'), null);
    }
    return callback(null, result[0]);
  });
};

// Function to get all tickets by user_id
const getTicketsByUserId = (user_id, callback) => {
  const query = `SELECT * FROM ticket WHERE user_id = ?`;
  db.query(query, [user_id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Function to update a ticket by ID
const updateTicket = (ticket_id, ticketData, callback) => {
  const { seats_id, price, ticket_status } = ticketData;
  const query = `UPDATE ticket SET seats_id = ?, price = ?, ticket_status = ? WHERE ticket_id = ?`;
  db.query(query, [seats_id, price, ticket_status, ticket_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('Ticket not found or no changes made'), null);
    }
    return callback(null, result);
  });
};

// Function to delete a ticket by ID
const deleteTicket = (ticket_id, callback) => {
  const query = `DELETE FROM ticket WHERE ticket_id = ?`;
  db.query(query, [ticket_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('Ticket not found'), null);
    }
    return callback(null, result);
  });
};

export default {
  createTicket,
  getAllTickets,
  getTicketById,
  getTicketsByUserId,
  updateTicket,
  deleteTicket,
};
