import { Request, Response } from 'express';
import { Post } from '../models/post';
import { ControllerType } from '../types/ControllerType';
import { exit } from 'process';
import { PostBody } from '../types/PostBody';

export class PostController {
    constructor(private readonly posts: Post[]) {}
    // IF REGULAR FUNCTION WERE TO USED THIS IS HOW WOULD I BIND IT
    // constructor(private readonly posts: Post[]) {
    //     this.getAllPosts = this.getAllPosts.bind(this); // creates a new version of the function with this permanently set to the current instance
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
        let { title, content }: PostBody = req.body; // type annotation with interface

        // getting id of last element
        const lastId =
            this.posts.length > 0
                ? this.posts[this.posts.length - 1].id + 1
                : 1; // default to one if none posts are found

        content = content ?? '';

        const newPost: Post = {
            id: lastId,
            title,
            content,
            createdAt: new Date(),
        };
        this.posts.push(newPost);
        res.status(201).json(newPost);
    };

    editPost: ControllerType = (req, res) => {
        const id: number = Number(req.params.id);
        const { title, content }: PostBody = req.body;
        const post: Post | undefined = this.posts.find((p) => p.id === id);
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }

        // since content can be null, always have to make use of type narrowing; OPTION 1:
        // if (!content) {
        //     return;
        // }

        // OPTION 2:
        post.title = title;
        post.updatedAt = new Date();
        if (content) {
            post.content = content;
        }
        res.status(200).json(post);
        return;
    };

    deletePost: ControllerType = (req, res) => {
        const id: number = Number(req.params.id);
        const post = this.posts.find((p) => p.id === id);
        if (!post) {
            res.status(404).json({ error: 'post not found!' });
            return;
        }
        // deleting post; since I know that ids are oredered, can safely assume that post's id is gonne be post.id - 1
        this.posts.splice(post.id - 1, 1);

        res.status(204).send(); // gotta use send() or end() to actually send response
        return;
    };
}
