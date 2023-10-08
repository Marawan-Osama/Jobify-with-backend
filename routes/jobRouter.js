import { Router } from 'express';
import {
  validateIdParam,
  validateJobInput,
} from '../middleware/validationMiddleware.js';
import {
  getAllJobs,
  getSingleJob,
  deleteJob,
  createJob,
  patchJob,
} from '../controllers/jobController.js';

const router = Router();

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router
  .route('/:id')
  .get(validateIdParam, getSingleJob)
  .patch(validateJobInput, validateIdParam, patchJob)
  .delete(validateIdParam, deleteJob);

export default router;
