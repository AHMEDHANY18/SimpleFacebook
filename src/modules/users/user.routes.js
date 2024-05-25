import { Router } from 'express';
import * as userController from './user.controller.js';

const router = Router();

router.get('/GetUser', userController.GetUser);
router.post('/Register', userController.Register);
router.get('/login', userController.login);
router.get('/user/:userId/post/:postId/comments', userController.getUserWithPostAndComments); //مش شغال 

export default router;
