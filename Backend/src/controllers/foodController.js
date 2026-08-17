import Food from "../models/foodModel.js";
import fs from "fs/promises";
import uploadOnCloudinary from "../middlewares/cloudinary.js";
import cloudinary from "cloudinary";

const addFood = async (req, res) => {
    try {
        const canteenId = req.user?.canteenId;
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }
        const imageUpload = await uploadOnCloudinary(req.file.path);
        if (!imageUpload || !imageUpload.secure_url) {
            return res.status(500).json({ success: false, message: "Failed to upload image" });
        }
        const imageUrl = imageUpload.secure_url;

        const food = new Food({
            canteenId: canteenId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imageUrl,
            cloudinary_id: imageUpload.public_id,
        });

        await food.save();
        res.json({ success: true, message: "Food Added Successfully!" });
    } catch (error) {
        console.error("Error in addFood API:", error);
        res.status(500).json({ success: false, message: "Error adding food item" });
    }
};

const removeFood = async (req, res) => {
    try {
        const foodId = req.body.id;
        if (!foodId) {
            return res.status(400).json({ success: false, message: "Food ID is required" });
        }
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        if (food.cloudinary_id) {
            await cloudinary.uploader.destroy(food.cloudinary_id);
        }
        await food.deleteOne();
        res.json({ success: true, message: "Food Removed Successfully!" });
    } catch (error) {
        console.error("Error in removeFood API:", error.message);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};

export { addFood, removeFood };
