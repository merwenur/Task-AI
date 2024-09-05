import 'tsconfig-paths/register';

import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { redisClientManager } from './config/redis-client.manager';
import { createServer } from 'http';
import SocketService from './utils/socket.service';
import { authRouter } from '@features/auth/auth.routes';
import { userRouter } from '@features/user/user.routes';
import { fileRouter } from '@features/file/file.routes';
import './features/auth/auth.events';
import './features/user/user.events';
import './utils/event.worker';

declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}

dotenv.config();
const redisClient = redisClientManager.getClient();

const app = express();
const httpServer = createServer(app);
const socketService = SocketService.getInstance(httpServer);
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    name: process.env.SESSION_NAME,
    store: new RedisStore({ client: redisClient, ttl: 3600 }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour in milliseconds
    },
  })
);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use('/api/files', fileRouter);

app.get("/", (_, res) => {
  res.json({ message: "Hello World" });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});