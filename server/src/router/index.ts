import { Router } from 'express';
import signing from './signing';
import color from './color';
import post from './post';
import userinfo from './userinfo';
import OAuth from './OAuth';

const router = Router();

router.use('/', signing);
router.use('/color', color);
router.use('/post', post);
router.use('/userinfo', userinfo);
router.use('/', OAuth);



export default router;