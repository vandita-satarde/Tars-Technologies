import express from "express";
import productModel from "../models/productModel.js";

const router = express.Router();

// Create Product
router.post("/", async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Get Single Product
router.get("/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Update Product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true  }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

export default router;
