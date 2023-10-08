import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import jobRouter from './routes/jobRouter.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/jobs', jobRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ msg: 'an error occurred', err });
});

app.get('/', (req, res) => {
  res.json({ msg: 'hello' });
});

app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data recieved', data: req.body });
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
