const { uploadFiles } = require("../Storage/imagekit_storage");
const FoodItem = require("../Models/foodItem.model");

const foodController = async (req, res) => {
  try {
    console.log("Partner Info:", req.partner);

    if (!req.partner) {
      return res.status(401).json({ error: "Unauthorized partner" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload image/video to ImageKit
    const uploaded = await uploadFiles(req.file.buffer, req.file.originalname);

    // Save new food item
    const newFood = await FoodItem.create({
      foodName: req.body.name,
      description: req.body.description,
      video: uploaded.url,
      foodPartner: req.partner._id,
    });

    res.status(201).json({
      message: "Food uploaded successfully!",
      food: newFood,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: "Image upload failed",
      details: error.message,
    });
  }
};

const getFood = async (req, res) => {
  try {
    const allFoodItems = await FoodItem.find({});
    res.status(200).json(allFoodItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food items" });
  }
};

module.exports = { foodController, getFood };
