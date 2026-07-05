const axios = require("axios");

const Ticket = require("../models/Ticket");

const calculateSLA = require("../utils/slaCalculator");

const updateSLAStatus = require("../utils/updateSLAStatus");

const getRemainingTime = (deadline) => {

  const now = new Date();

  const end = new Date(deadline);

  const diff = end - now;

  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) /
      (1000 * 60)
  );

  if (days > 0)
    return `${days}d ${hours}h`;

  return `${hours}h ${minutes}m`;
};

// Create Ticket
const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    const aiResponse = await axios.post(
      "http://127.0.0.1:5001/predict",
      {
        text: description,
      }
    );

    const predictedCategory = aiResponse.data.category;
    const predictedPriority = aiResponse.data.priority;
    const slaDeadline = calculateSLA(predictedPriority);

    const ticket = await Ticket.create({
        title,
        description,
        category: predictedCategory,
        priority: predictedPriority,
        slaDeadline,
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

    for (const ticket of tickets) {

      const status = updateSLAStatus(ticket);

      if (ticket.slaStatus !== status) {
        ticket.slaStatus = status;
        ticket.remainingTime = getRemainingTime(
        ticket.slaDeadline
        );
        await ticket.save();
      }

    }

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

    const status = updateSLAStatus(ticket);

    if (ticket.slaStatus !== status) {
      ticket.slaStatus = status;
      ticket.remainingTime = getRemainingTime(ticket.slaDeadline);
      await ticket.save();
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

const getAllTickets = async (req, res) => {
  try {

    const tickets = await Ticket.find()
      .populate("customer", "name email")
      .populate("assignedAgent", "name email");

    for (const ticket of tickets) {

      const status = updateSLAStatus(ticket);

      if (ticket.slaStatus !== status) {
        ticket.slaStatus = status;
        ticket.remainingTime = getRemainingTime(ticket.slaDeadline);
        await ticket.save();
      }

    }

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

const assignTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    ticket.assignedAgent = req.user._id;
    ticket.status = "In Progress";

    await ticket.save();

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

const updateTicketStatus = async (req, res) => {
  try {

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    ticket.status = req.body.status;

    await ticket.save();

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


module.exports = {
  createTicket,
  getMyTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getAllTickets,
  assignTicket,
  updateTicketStatus,
};