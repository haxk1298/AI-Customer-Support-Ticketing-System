const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  getAnalytics,
} = require("../controllers/adminController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.get(
  "/stats",
  protect,
  authorize("admin"),
  getDashboardStats
);

router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);

router.put(
  "/users/:id",
  protect,
  authorize("admin"),
  updateUserRole
);

router.get(
  "/analytics",
  protect,
  authorize("admin"),
  getAnalytics
);

module.exports = router;