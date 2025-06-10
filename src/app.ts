import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import basicAuth from 'basic-auth';

import postRoutes from './routes/postRoutes';
import fs from 'fs';
import path from 'path';
import { User } from './types/User';

const app: Express = express();
dotenv.config();

app.use(express.json());

app.use('/api', postRoutes);
app.post('/auth/login', function (req: Request, res: Response) {
    // Record<string, User> -> obj where keys are string and values are obj with password: string
    // { users: User[] } // obj containg with key users containing arr of User
    const users: { users: User[] } = JSON.parse(
        fs.readFileSync(path.resolve('users.json'), {
            encoding: 'utf-8',
        })
    );

    const credentials = basicAuth(req);

    if (!credentials) {
        res.status(400).json({ error: 'User credentials not provided' });
        return;
    }

    users.users.forEach((user) => {
        if (user.username === credentials.name && user.password === credentials.pass) {
            res.json({ message: 'Logged in' });
            return;
        }
    });

    res.json({ message: 'User not found' }).send();
    return;
});

export default app;
