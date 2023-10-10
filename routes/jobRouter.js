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
  showStats,
} from '../controllers/jobController.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

const router = Router();

router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(validateIdParam, getSingleJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, patchJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
