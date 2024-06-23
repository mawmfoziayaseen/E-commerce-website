import express from 'express';
import colors from 'colors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

// mongoose connection
connectDB();

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173/", credentials: true }));

// importing routes
import userRoutes from './routes/userRoutes.js';

app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`server is listening at port ${PORT}`.bgMagenta) });
