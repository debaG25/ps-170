const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
const componentRoutes = require("./routes/components");


app.use("/api/components", componentRoutes);



mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "BURN AI INSPECTOR Backend",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`BURN AI INSPECTOR backend running on port ${PORT}`);
});