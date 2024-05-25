import { DataTypes } from 'sequelize';
import { sequelize } from '../connectionDB.js';
import User from './user.model.js';

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    paranoid: true // Enable soft deletes
});

// Define associations
Post.belongsTo(User, { foreignKey: 'userId' });

export default Post;
