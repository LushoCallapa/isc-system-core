import { Router } from 'express';
import login from '../controllers/authController';

const router = Router();

router.route('/login').post(login);

export default router;
