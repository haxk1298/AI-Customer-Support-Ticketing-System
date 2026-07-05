const User = require("../models/User");
const Ticket = require("../models/Ticket");

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalTickets = await Ticket.countDocuments();

    const totalAgents = await User.countDocuments({
      role: "agent",
    });

    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const openTickets = await Ticket.countDocuments({
      status: "Open",
    });

    const resolvedTickets = await Ticket.countDocuments({
      status: "Resolved",
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalTickets,
        totalAgents,
        totalCustomers,
        openTickets,
        resolvedTickets,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.json({
      success: true,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Change User Role
const updateUserRole = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = req.body.role;

    await user.save();

    res.json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getAnalytics = async (req, res) => {
  try {

    const tickets = await Ticket.find();

    const categoryData = {};

    const statusData = {};

    tickets.forEach(ticket => {

      categoryData[ticket.category] =
        (categoryData[ticket.category] || 0) + 1;

      statusData[ticket.status] =
        (statusData[ticket.status] || 0) + 1;

    });

    const categoryChart = Object.keys(categoryData).map(key => ({
      name: key,
      value: categoryData[key]
    }));

    const statusChart = Object.keys(statusData).map(key => ({
      name: key,
      value: statusData[key]
    }));

    res.json({
      success: true,
      categoryChart,
      statusChart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  getAnalytics,
};