const mongoose = require('mongoose'); // Import mongoose at the top of your file
const Product = require("../models/product.models");

exports.store = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json({ status: 200, message: "Product created Successfully", product });
    } catch (err) {
        console.error("Error creating product:", err); // Log the error
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.index = async (req, res) => {
    try {
        const { category, search } = req.query;
        const query = {};
        if (category) {
            query.category = category; // Corrected the logic
        }
        if (search) {
            query.title = { $regex: search, $options: 'i' }; // Make search case-insensitive
        }
        const products = await Product.find(query);
        res.json({ status: 200, message: "Products fetched Successfully", products });
    } catch (err) {
        console.error("Error fetching products:", err); // Log the error
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.get = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate that the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const product = await Product.findOne({ _id: id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Couldn't find product" });
        }
        res.json({ status: 200, message: "Product fetched successfully", product });
    } catch (err) {
        console.error("Error fetching product:", err); // Log the error
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate that the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const product = await Product.findOneAndDelete({ _id: id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Couldn't find product" });
        }
        res.json({ status: 200, message: "Product deleted Successfully" });
    } catch (err) {
        console.error("Error deleting product:", err); // Log the error
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate that the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ success: false, message: "Couldn't find product" });
        }
        res.json({ status: 200, message: "Product Updated Successfully", product });
    } catch (err) {
        console.error("Error updating product:", err); // Log the error
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}
