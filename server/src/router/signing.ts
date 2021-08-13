import { Router } from 'express';
import { signing } from '../controllers';

const router = Router();

router.post('/signup', signing.signUp);
router.post('/signin', signing.signIn);
router.post('/signout', signing.signOut);

export default router;