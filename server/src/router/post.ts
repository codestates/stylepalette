import { Router } from 'express';
import { post } from '../controllers';
import { resultUpload, previewUpload } from '../interfaces/awsS3'

const router = Router();

router.get('/:postid', post.getPost);
router.get('/posts/all', post.getPosts);
router.post('/', post.postPost);
router.post('/preview', previewUpload.single("preview"), post.postPreview)
router.post('/:postid/result', resultUpload.single("result"), post.postResult)
router.post('/:postid/like', post.postLike)
router.delete('/:postid', post.deletePost);


export default router;