import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({ msg: 'hello' });
});

app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data recieved', data: req.body });
});

app.listen(5001, () => {
  console.log('listening on port 5001');
});
