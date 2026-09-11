import mongoose from "mongoose";

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

    risk: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Component =
  mongoose.models.Component ||
  mongoose.model("Component", componentSchema);

export default Component;
