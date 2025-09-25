import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    
    details: {
        problemBefore: { type: String, required: true },
        problemSolved: { type: String, required: true },
        whatWeAdd: { type: String, required: true },
    }

}, { timestamps: true })

export default mongoose.model("Cases", formSchema)