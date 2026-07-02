const Ticket = require("../models/Ticket");

// Create Ticket
const createTicket = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority,
      customer: req.user._id,
    });

    res.status(201).json({
      success: true,
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Tickets
const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      customer: req.user._id,
    });

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTicket,
  getMyTickets,
};