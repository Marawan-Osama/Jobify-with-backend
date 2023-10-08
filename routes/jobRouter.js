import { Router } from 'express';
import { validateJobInput } from '../middleware/validationMiddleware.js';
import {
  getAllJobs,
  getSingleJob,
  deleteJob,
  createJob,
  patchJob,
} from '../controllers/jobController.js';

const router = Router();

//even though middleware is added, it still does not work as expected. this is due to the fact that the middleware is not being called in the correct order. the correct order is as follows:
//1. validation middleware
//2. controller
// even though it is like that here, it is still not working as expected. this is because the validation middleware is not being called in the correct order. the correct order is as follows:
// so it will look like this in code

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router
  .route('/:id')
  .get(getSingleJob)
  .patch(validateJobInput, patchJob)
  .delete(deleteJob);

export default router;
