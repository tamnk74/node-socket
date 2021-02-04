import { Router } from 'express';
import { authController } from './controllers';
import { loginValidation, refreshTokenValidation } from './middlewares';
import { auth } from '../../middlewares';

const router = Router();

router.post('/login', loginValidation, authController.login);
router.post('/logout', auth, authController.logout);
router.post('/refresh-token', refreshTokenValidation, authController.refrehToken);
router.get('/me', auth, authController.getProfile);

export default router;
