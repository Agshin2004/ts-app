import { Router } from 'express';
import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from '../controllers/postControllers';
import { PostController } from '../controllers/PostController';
import { Post } from '../models/post';

const router = Router(); // type is inferred

const posts: Post[] = [
    { id: 1, title: 'Post 1', content: 'Post 1' },
    { id: 2, title: 'Post 2', content: 'Post 2' },
    { id: 3, title: 'Post 3', content: 'Post 3' },
];

const postController: PostController = new PostController(posts);

router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.editPost);
router.delete('/posts/:id', postController.deletePost);

export default router;
