
const app = require("../server");
const connectDB = require("../config/db");

let dbConnectionPromise;

module.exports = async (req, res) => {
  try {
    if (!dbConnectionPromise) {
      dbConnectionPromise = connectDB();
    }

    await dbConnectionPromise;
    return app(req, res);
  } catch (error) {
    dbConnectionPromise = null;
    console.error("Database connection failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Database connection failed.",
    });
  }
};
