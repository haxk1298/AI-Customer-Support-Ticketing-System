const express = require("express");

const router = express.Router();

const {
  createTicket,
  getMyTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const {
  getAllTickets,
  assignTicket,
  updateTicketStatus,
} = require("../controllers/ticketController");

const { authorize } = require("../middleware/authMiddleware");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createTicket);

router.get("/", protect, getMyTickets);

router.get(
  "/all",
  protect,
  authorize("agent", "admin"),
  getAllTickets
);

router.get("/:id", protect, getTicketById);

router.put("/:id", protect, updateTicket);

router.delete("/:id", protect, deleteTicket);

router.put(
  "/assign/:id",
  protect,
  authorize("agent", "admin"),
  assignTicket
);

router.put(
  "/status/:id",
  protect,
  authorize("agent", "admin"),
  updateTicketStatus
);

module.exports = router;