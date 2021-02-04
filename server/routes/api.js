import { Router } from 'express';
import authModule from '../modules/auth';
import userModule from '../modules/users';

const router = Router();

router.use('/', authModule);
router.use('/', userModule);

export default router;