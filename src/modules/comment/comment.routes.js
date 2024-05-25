import { Router } from 'express';
import * as commentController from './comment.controller.js';

const router = Router();
//get comments
router.get('/Getcomment',commentController.Getcomment);

// Create a new comment
router.post('/createComment',commentController.createComment);

// Update a comment by ID
router.put('/updateComment/:id',commentController.updateComment);

// Delete a comment by ID
router.delete('/deleteComment/:id',commentController.deleteComment);

export default router;
