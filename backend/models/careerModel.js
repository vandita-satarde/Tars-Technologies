import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  description: { type: String, default: "" },
  buttonText: { type: String, default: "" },
  video: {
    url: String,
    public_id: String,
  },

  images: [
    {
      url: String,
      public_id: String,
    },
  ],
   applicants: [
    {
      fullName: String,
      email: String,
      mobile: String,
      jobType: { type: String, default: "Full Time" },
      address: String,
      selectedTechnologies: [String],
      resume: {
        url: String,
        public_id: String,
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});



export default mongoose.model("CareerSection", careerSchema);
