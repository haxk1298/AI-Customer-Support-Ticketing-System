const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(cookieParser());

app.use(helmet());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Ticket System API Running"
    });
});

module.exports = app;