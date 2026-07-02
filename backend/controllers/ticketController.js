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

// Get Single Ticket
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    if (ticket.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
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

// Update Ticket
const updateTicket = async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    if (ticket.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
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

// Delete Ticket
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    if (ticket.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await ticket.deleteOne();

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
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
  getTicketById,
  updateTicket,
  deleteTicket,
};