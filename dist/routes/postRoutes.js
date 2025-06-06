"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postControllers_1 = require("../controllers/postControllers");
const PostController_1 = require("../controllers/PostController");
const router = (0, express_1.Router)(); // type is inferred
const posts = [
    { id: 1, title: 'Post 1', content: 'Post 1' },
    { id: 2, title: 'Post 2', content: 'Post 2' },
    { id: 3, title: 'Post 3', content: 'Post 3' },
];
const postController = new PostController_1.PostController(posts);
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.post('/posts', postControllers_1.createPost);
router.put('/posts/:id', postControllers_1.updatePost);
router.delete('/posts/:id', postControllers_1.deletePost);
exports.default = router;
