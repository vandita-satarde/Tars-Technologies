import express from "express";
import Quote from "../models/quoteModel.js";

const router = express.Router();

// GET ALL QUOTES
router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quotes" });
  }
});

// POST NEW QUOTE
router.post("/", async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    res.status(201).json({ message: "Quote submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit quote" });
  }
});


// DELETE quote
router.delete("/:id", async (req, res) => {
  await Quote.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE remark
router.put("/:id/remark", async (req, res) => {
  try {
    const { id } = req.params;
    const { remark } = req.body;

    const updated = await Quote.findByIdAndUpdate(
      id,
      { remark },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Quote not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
