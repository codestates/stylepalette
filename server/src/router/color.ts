import { Router } from 'express';
import { color } from '../controllers';

const router = Router();

router.post('/roulette', color.roulette);
router.post('/recommend', color.recommend);


export default router;