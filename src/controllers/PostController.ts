import { Request, Response } from 'express';
import { Post } from '../models/post';
import { ControllerType } from '../types/ControllerType';
import { exit } from 'process';
import { PostBody } from '../types/PostBody';

export class PostController {
    constructor(private readonly posts: Post[]) {}
    // IF REGULAR FUNCTION WERE TO USED THIS IS HOW WOULD I BIND IT
    // constructor(private readonly posts: Post[]) {
    //     this.getAllPosts = this.getAllPosts.bind(this);
    // }

    // used arrow function here because regular methods lose this when passed as callback
    getAllPosts: ControllerType = (req, res) => {
        res.status(200).json(this.posts);
        return;
    };

    getPostById: ControllerType = (req, res) => {
        const id: number = Number(req.params.id);
        const post = this.posts.find((p) => p.id === id);
        if (!post) {
            res.status(404).json({ error: 'post not found' });
            return;
        }

        res.status(200).json(post);
        return;
    };

    createPost: ControllerType = (req, res) => {
        //* Extracting with explicit union types (string | undefined)
        // const title: string | undefined = req.body?.title;
        // const content: string | undefined = req.body?.content;
        //* Destructuring with inline type annotation using an object type
        // const { title, content }: { title?: string, content?: string } = req.body;
        //* Destructuring with a named interface for cleaner code and reusability
        const { title, content }: PostBody = req.body; // type annotation with interface

        // getting id of last element
        const lastId =
            this.posts.length > 0
                ? this.posts[this.posts.length - 1].id + 1
                : 0;

        const newPost: Post = {
            id: lastId,
            title,
            content,
        };
        this.posts.push(newPost);
        res.status(200).json(newPost);
    };
}
