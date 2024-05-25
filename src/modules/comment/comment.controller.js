import Comment from '../../../db/models/comment.model.js';
import Post from '../../../db/models/post.model.js';
import User from '../../../db/models/user.model.js';

export const Getcomment = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json({ msg: 'done', comments });
    } catch (err) {
        res.status(500).json({ msg: 'Error retrieving comments', error: err });
    }
};

// Create a new comment
export const createComment = async (req, res) => {
    try {
        const { content, postId, userId } = req.body;

        // التحقق من وجود البوست
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newComment = await Comment.create({ content, postId, userId });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a comment by ID
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, postId, userId } = req.body;

        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        comment.content = content;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete a comment by ID
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            await comment.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
