import express from 'express';
import data from './data.js';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'


dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI);
      console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};
connectDB();



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use(cors(corsOptions));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`server at localhost : ${port} is ready`);
});
