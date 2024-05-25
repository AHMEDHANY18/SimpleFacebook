import express from 'express';
import cors from 'cors';
import connectionDB from './db/connectionDB.js';
import userRouter from './src/modules/users/user.routes.js';
import postRouter from './src/modules/post/post.routes.js'; // Ensure this file exists
import commentRouter from './src/modules/comment/comment.routes.js'; // Ensure this file exists

const app = express();
const port = process.env.PORT||3000;

app.use(express.json());
app.use(cors());
connectionDB();

// Register routes
app.use('/', userRouter);
app.use('/', postRouter);
app.use('/', commentRouter);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json("404 Not Found");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
