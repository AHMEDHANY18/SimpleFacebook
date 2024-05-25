import { Router } from 'express';
import * as postController from './post.controller.js';

const router = Router();
// get a post
router.get('/post', postController.Getpost);

//create a post
router.post('/createPost', postController.createPost);

// Update a post by ID
router.put('/updatePost/:id', postController.updatePost);

// Delete a post by ID
router.delete('/posts/:id', postController.deletePost);

//Get a specific post with the author
router.get('/posts/:postId',postController.getPostWithUser);



export default router;
