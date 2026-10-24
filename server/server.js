
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const entryRoutes = require("./routes/entryRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/entries", entryRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Folio API is running!",
  });
});

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Folio API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}
if (require.main === module) {
  startServer();
}
module.exports = app;
