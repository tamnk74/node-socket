import {Router} from 'express';
import UserRouter from './UserRouter';
// import ProfileRouter from './ProfileRouter';

const router = Router();

router.use('/users', UserRouter);

export default router;
