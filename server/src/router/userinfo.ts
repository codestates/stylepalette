import { Router } from 'express';
import { userinfo } from '../controllers';
import { profileUpload } from '../interfaces/awsS3'

const router = Router();

router.get('/', userinfo.getUserinfo);
router.post('/checkuser', userinfo.postCheckUser)
router.patch('/:userid/profile', profileUpload.single("profile"), userinfo.patchProfile);
router.patch('/:userid/password', userinfo.patchPassword)
router.patch('/:userid/info', userinfo.patchUserinfo);

export default router;