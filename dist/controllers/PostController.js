"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
class PostController {
    constructor(posts) {
        this.posts = posts;
        // IF REGULAR FUNCTION WERE TO USED THIS IS HOW WOULD I BIND IT
        // constructor(private readonly posts: Post[]) {
        //     this.getAllPosts = this.getAllPosts.bind(this);
        // }
        // used arrow function here because regular methods lose this when passed as callback
        this.getAllPosts = (req, res) => {
            res.status(200).json(this.posts);
            return;
        };
        this.getPostById = (req, res) => {
            const id = Number(req.params.id);
            console.log(id);
            const post = this.posts.find((p) => p.id === id);
            if (!post) {
                res.status(404).json({ error: 'post not found' });
                return;
            }
            res.status(200).json(post);
            return;
        };
    }
}
exports.PostController = PostController;
