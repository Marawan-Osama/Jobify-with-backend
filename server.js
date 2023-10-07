import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { nanoid } from 'nanoid';

dotenv.config();
const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ msg: 'an error occured', err });
});

let jobs = [
  { id: nanoid(), company: 'google', position: 'backend' },
  { id: nanoid(), company: 'apple', position: 'frontend' },
  { id: nanoid(), company: 'netflix', position: 'midend lol' },
];

app.get('/', (req, res) => {
  res.json({ msg: 'hello' });
});

app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data recieved', data: req.body });
});

app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }
  res.status(200).json({ job });
});

app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ msg: 'Please provide correct data (company and position)' });
  }
  const id = nanoid();
  const job = { id: id, company: company, position: position };
  jobs.push(job);
  res.status(201).json({ job });
});

app.patch('/api/v1/jobs/:id', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(404).json({ msg: `Please insert company and position` });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job found with id: ${id}` });
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'job modified successfully', job });
});

app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job found with id: ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: 'job deleted successfully', jobs });
});

const port = process.env.PORT || 5001;
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${port}`);
});
