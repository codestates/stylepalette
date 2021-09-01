import { Router } from 'express';
import { OAuth } from '../controllers';

const router = Router();

router.post('/google', OAuth.google);
router.post('/kakao', OAuth.kakao);



export default router;