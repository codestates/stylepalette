import { Router } from 'express';
import { signing } from '../controllers';

const router = Router();

router.post('/signup', signing.signUp);
router.post('/signin', signing.signIn);
router.get('/signout', signing.signOut);

export default router;