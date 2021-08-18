import { Router } from 'express';
import { userinfo } from '../controllers';
import { profileUpload } from '../interfaces/awsS3'

const router = Router();

router.get('/', userinfo.getUserinfo);
router.post('/checkuser', userinfo.postCheckUser)
router.patch('/:userid', profileUpload.single("profile"), userinfo.patchUserinfo);

export default router;