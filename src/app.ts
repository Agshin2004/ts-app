import express, { Express } from 'express';
import dotenv from 'dotenv';

import postRoutes from './routes/postRoutes';

const app: Express = express();
dotenv.config();

app.use(express.json())

app.use('/api', postRoutes);

export default app;
