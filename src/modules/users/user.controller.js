import bcrypt from 'bcrypt';
import Post from '../../../db/models/post.model.js';
import User from '../../../db/models/user.model.js';
import Comment from '../../../db/models/comment.model.js';

// Get all users
export const GetUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ msg: 'done', users });
    } catch (err) {
        res.status(500).json({ msg: 'Error retrieving users', error: err });
    }
};

// User registration
export const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (err) {
        res.status(500).json({ msg: 'Error registering user', error: err });
    }
};

// User login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ msg: 'Incorrect password' });
        }

        res.status(200).json({ msg: 'Login successful' });
    } catch (err) {
        res.status(500).json({ msg: 'Error logging in', error: err });
    }
};

// Special endpoint to get a specific user with a specific post and post’s comments
export const getUserWithPostAndComments = async (req, res) => {
    try {
        const { userId, postId } = req.params;

        const user = await User.findByPk(userId, {
            include: {
                model: Post,
                where: { id: postId },
                include: [Comment]
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User or Post not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
