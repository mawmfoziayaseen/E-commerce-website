import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

// mongoose connection
connectDB();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow only these HTTP methods
  credentials: true, // Allow credentials
  // allowedHeaders: ['Content-Type', 'Credentials'], // Allow only these headers
};

// middlewares
app.use(morgan("dev"));
app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173/", credentials: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

// importing routes
import userRoutes from "./routes/userRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import productsRoutes from "./routes/productRoutes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/products", productsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`.bgMagenta);
});
