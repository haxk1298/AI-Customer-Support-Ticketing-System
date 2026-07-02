const express = require("express");

const router = express.Router();

const {
  createTicket,
  getMyTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createTicket);

router.get("/", protect, getMyTickets);

router.get("/:id", protect, getTicketById);

router.put("/:id", protect, updateTicket);

router.delete("/:id", protect, deleteTicket);

module.exports = router;