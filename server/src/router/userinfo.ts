import { Router } from 'express';
import { userinfo } from '../controllers';

const router = Router();

router.get('/', userinfo.getUserinfo);
router.patch('/', userinfo.patchUserinfo);

export default router;