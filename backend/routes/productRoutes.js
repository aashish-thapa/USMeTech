const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 📌 GET All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 📌 GET a Single Product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 📌 POST (Add a New Product)
router.post("/", async (req, res) => {
  try {
    const { name, description, category, price, image, seller } = req.body;

    if (!name || !category || !price || !seller) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({ name, description, category, price, image, seller });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 📌 DELETE a Product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
