const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    lot: {
      type: String,
      required: true,
    },

    value0h: Number,
    value24h: Number,
    value96h: Number,
    value168h: Number,

    // Keep the original component information if available
    risk: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Component", componentSchema);