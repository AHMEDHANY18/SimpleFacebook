import { DataTypes } from 'sequelize';
import { sequelize } from '../connectionDB.js';
import Post from './post.model.js'; // Import Post model
import User from './user.model.js'; // Import User model

const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// Define associations
Comment.belongsTo(Post, { foreignKey: 'postId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

export default Comment;