import { Router } from 'express';
import { SubscribeController } from './controllers';
import { auth, validator } from '../../middlewares';
import { subscribeSchema } from './schemas';

const router = Router();

router.post('/me/subscribe', auth, validator(subscribeSchema), SubscribeController.subscribe);
router.post('/me/unsubscribe', auth, validator(subscribeSchema), SubscribeController.unsubscribe);

// router.get('/users/', [auth], userController.index);
// router.post('/users', userController.create);
// router.get('/users/:id', [auth], userController.show);
// router.put('/users/:id', [auth], userController.update);
// router.delete('/users/:id', [auth], userController.delete);

export default router;
