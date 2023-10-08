import { nanoid } from 'nanoid';
import Job from '../models/jobModel.js';

//for ensuring everything works.. WILL BE REMOVED
let jobs = [
  { id: nanoid(), company: 'google', position: 'backend' },
  { id: nanoid(), company: 'apple', position: 'frontend' },
  { id: nanoid(), company: 'netflix', position: 'midend lol' },
];

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `No job with id ${id}` });
  }
  res.status(200).json({ job });
};

export const patchJob = async (req, res) => {
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
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job found with id: ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: 'job deleted successfully', jobs });
};
