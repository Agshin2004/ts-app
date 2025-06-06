import { Request, Response } from 'express';
import { Post } from '../models/post';

let posts: Post[] = [
    { id: 1, title: 'Post 1', content: 'Post 1' },
    { id: 2, title: 'Post 2', content: 'Post 2' },
    { id: 3, title: 'Post 3', content: 'Post 3' },
];

export const getAllPosts = (req: Request, res: Response) => {
    res.status(200).json(posts);
    return;
};

export const getPostById = (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    console.log(id);
    const post = posts.find((p) => p.id === id);
    if (!post) {
        res.status(404).json({ error: 'post not found' });
        return;
    }

    res.status(200).json(post);
    return;
};

export const createPost = (req: Request, res: Response) => {};
export const updatePost = (req: Request, res: Response) => {};
export const deletePost = (req: Request, res: Response) => {};
