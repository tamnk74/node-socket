import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => res.send('OK'));
router.get('/', (req, res) => res.render('pages/home', { page: 'Home', menuId: 'home' }));

export default router;
