import express from 'express';
import colors from 'colors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

// mongoose connection
connectDB();


const app = express();

// midlewares
app.use(morgan("dev"));
app.use(express.json());

// importing routes
import userRoutes from './routes/userRoutes.js';

// http://localhost:8080/
// http://localhost:8080/api/v1/users/register


app.use("/api/v1/users", userRoutes);


const PORT = process.env.PORT || 5000


app.listen(PORT, () => { console.log(`server is listing at port ${PORT} `.bgMagenta) });