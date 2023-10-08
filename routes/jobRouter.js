import { Router } from 'express';
import {
  getAllJobs,
  getSingleJob,
  deleteJob,
  createJob,
  patchJob,
} from '../controllers/jobController.js';

const router = Router();

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getSingleJob).patch(patchJob).delete(deleteJob);

export default router;
