import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mongoose from'mongoose';
import authRouter from './routes/authRoutes.js';

const app = express();

dotenv.config();


const PORT = process.env.PORT || 3000;
const mongoDBURL = process.env.MONGODB_URI;

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

app.get('/', (req, res) => {
  res.send('Hello Server!');
});
app.use('/api/auth', authRouter);



if (!mongoDBURL) {
    console.error("MONGODB_URL is not defined in the environment variables");
    process.exit(1);
  }
  
  mongoose
    .connect(mongoDBURL)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => { 
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB:", error);
      process.exit(1);
    });