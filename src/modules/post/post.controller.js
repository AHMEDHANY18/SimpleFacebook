import Post from '../../../db/models/post.model.js';
import User from '../../../db/models/user.model.js';
import Comment from '../../../db/models/comment.model.js';

//get all posts
export const Getpost = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json({ msg: 'done', posts });
    } catch (err) {
        res.status(500).json({ msg: 'Error retrieving posts', error: err });
    }
};

//create a new post
export const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newPost = await Post.create({ title, content, userId });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//updatePost
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, userId } = req.body;
        const post = await Post.findByPk(id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        }
        if (post.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Update the post
        post.title = title;
        post.content = content;
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//deletePost
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the post by ID
        const post = await Post.findByPk(id);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.authorId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        post.deletedAt = new Date();
        await post.save();

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//Get a specific post with the author
export const getPostWithUser = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findByPk(postId, {
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'username', 'email']
            }]
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};