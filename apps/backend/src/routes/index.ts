import userRouter from './users.route.js';
import gameRouter from './game.route.js';
import questionRouter from './question.route.js';
import type { Express } from 'express';
export default function routes(app: Express) {
  app.use('/api/users', userRouter);
  app.use('/api/game', gameRouter);
  app.use('/api/question', questionRouter);
}
