import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import Job from '../models/jobModel.js';

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) throw new NotFoundError(`no job found with id: ${id}`);
  res.status(200).json({ job });
};

export const patchJob = async (req, res) => {
  const { id } = req.params;
  const patchedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!patchedJob) {
    throw new NotFoundError(`no job found with id: ${id}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: 'job modified successfully', patchedJob });
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  if (!removedJob) {
    throw new NotFoundError(`no job found with id: ${id}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: 'job deleted successfully', removedJob });
};
