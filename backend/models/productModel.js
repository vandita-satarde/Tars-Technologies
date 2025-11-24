import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  images: {
    type: [
      {
        url: { type: String, required: false },
        public_id: { type: String, required: false }
      }
    ],
    default: []
  },

  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },

  technologies: {
    type: [String],
    default: []
  },

  uses: {
    type: [
      {
        title: String,
        description: String
      }
    ],
    default: []
  },

  benefits: {
    type: [
      {
        title: String,
        description: String
      }
    ],
    default: []
  },

  problemsSolutions: {
    type: [
      {
        problem: String,
        solution: String
      }
    ],
    default: []
  },

  features: {
    type: [String],
    default: []
  },

  specifications: {
    type: Object,
    default: {}
  }
});

export default mongoose.model("Product", productSchema);
