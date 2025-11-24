import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import productRoutes from "./routes/productRoutes.js";
import casesRoutes from "./routes/casesRoutes.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import clientRoutes from "./routes/clientImageRoutes.js";
import getintouchRoutes from "./routes/getintouchRoutes.js";
import quoteRoutes from "./routes/getQuoteRoutes.js";
import careerRoutes from "./routes/careerRoute.js";


dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:4173","http://localhost:5174"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Routes

app.use("/api/products", productRoutes);
app.use("/api/cases", casesRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/getintouch", getintouchRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/uploads", express.static("uploads"));

app.use("/api/careers", careerRoutes);
app.use("/api/career", careerRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
