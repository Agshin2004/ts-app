"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
let posts = [
    { id: 1, title: 'Post 1', content: 'Post 1' },
    { id: 2, title: 'Post 2', content: 'Post 2' },
    { id: 3, title: 'Post 3', content: 'Post 3' },
];
const getAllPosts = (req, res) => {
    res.status(200).json(posts);
    return;
};
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    const post = posts.find((p) => p.id === id);
    if (!post) {
        res.status(404).json({ error: 'post not found' });
        return;
    }
    res.status(200).json(post);
    return;
};
exports.getPostById = getPostById;
const createPost = (req, res) => { };
exports.createPost = createPost;
const updatePost = (req, res) => { };
exports.updatePost = updatePost;
const deletePost = (req, res) => { };
exports.deletePost = deletePost;
