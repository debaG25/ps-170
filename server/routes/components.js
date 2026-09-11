const express = require("express");
const Component = require("../models/Component");

const router = express.Router();

// Get all components
router.get("/", async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch components",
      error: error.message,
    });
  }
});
// Bulk save components
router.post("/bulk", async (req, res) => {
  try {
    const components = req.body;

    if (!Array.isArray(components) || components.length === 0) {
      return res.status(400).json({
        message: "No component data received",
      });
    }

    // Replace the existing dataset with the newly uploaded dataset
    await Component.deleteMany({});

    const savedComponents = await Component.insertMany(components);

    res.status(201).json({
      message: "Components uploaded successfully",
      count: savedComponents.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload components",
      error: error.message,
    });
  }
});
// Get one component by ID
router.get("/:id", async (req, res) => {
  try {
    const component = await Component.findOne({ id: req.params.id });

    if (!component) {
      return res.status(404).json({
        message: "Component not found",
      });
    }

    res.json(component);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch component",
      error: error.message,
    });
  }
});

// Add a component
router.post("/", async (req, res) => {
  try {
    const component = new Component(req.body);
    const savedComponent = await component.save();

    res.status(201).json(savedComponent);
  } catch (error) {
    res.status(400).json({
      message: "Failed to save component",
      error: error.message,
    });
  }
});
// Delete a component by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedComponent = await Component.findOneAndDelete({
      id: req.params.id,
    });

    if (!deletedComponent) {
      return res.status(404).json({
        message: "Component not found",
      });
    }

    res.json({
      message: "Component deleted successfully",
      component: deletedComponent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete component",
      error: error.message,
    });
  }
});
module.exports = router;