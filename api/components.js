import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const ComponentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    lot: String,
    value0h: Number,
    value24h: Number,
    value96h: Number,
    value168h: Number,
    reason: String,
    confidence: Number
  },
  { strict: false }
);

const Component =
  mongoose.models.Component ||
  mongoose.model("Component", ComponentSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  await mongoose.connect(MONGODB_URI);
}

export default async function handler(req, res) {
  try {
    await connectDB();

    // GET /api/components
    if (req.method === "GET") {
      const components = await Component.find({});
      return res.status(200).json(components);
    }

    // POST /api/components/bulk
    if (req.method === "POST") {
      const components = req.body;

      if (!Array.isArray(components) || components.length === 0) {
        return res.status(400).json({
          message: "No component data received"
        });
      }

      await Component.deleteMany({});

      const savedComponents = await Component.insertMany(components);

      return res.status(201).json({
        message: "Components uploaded successfully",
        count: savedComponents.length
      });
    }

    return res.status(405).json({
      message: "Method not allowed"
    });
  } catch (error) {
    console.error("API error:", error);

    return res.status(500).json({
      message: "Backend error",
      error: error.message
    });
  }
}
