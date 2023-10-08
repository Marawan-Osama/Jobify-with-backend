import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import { validateRegister } from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/register').post(validateRegister, register);
router.route('/login').post(login);

export default router;
