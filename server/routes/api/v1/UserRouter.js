import { Router } from 'express';
import userController from '../../../modules/users/UserController';

const router = Router();

router.route('/').get([], userController.findAll);
router.route('/').post([], userController.create);
router.route('/:id').get([], userController.findOne);
router.route('/:id').put([], userController.update);
router.route('/:id').delete([], userController.delete);

export default router;