const mongoose = require("mongoose");

const foodDatabase = () => {
  mongoose
    .connect(process.env.Database)
    .then(() => console.log("✅ Connected to foodDB successfully"))
    .catch((err) => console.error("❌ Connection error:", err));
};

module.exports = foodDatabase;
