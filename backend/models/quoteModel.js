import mongoose from "mongoose";

const quoteSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String ,default: "Not selected" },
  message: { type: String, required:true },
  remark: { type: String, default:"" },
}, { timestamps: true });

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
