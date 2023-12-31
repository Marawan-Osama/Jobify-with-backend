import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import cloudinary from 'cloudinary';

dotenv.config();
const app = express();
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './client/dist')));

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

app.get('/', (req, res) => {
  res.json({ msg: 'hello' });
});

const port = process.env.PORT || 5001;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
