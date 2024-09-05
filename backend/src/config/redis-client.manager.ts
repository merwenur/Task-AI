import { Redis } from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

class RedisClientManager {
  private static instance: RedisClientManager;
  private client: Redis;

  private constructor() {
    const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;
    const host = process.env.REDIS_HOST ? process.env.REDIS_HOST : "localhost";
    this.client = new Redis(port, host);
    console.log(this.client.options)
  }

  public static getInstance(): RedisClientManager {
    if (!RedisClientManager.instance) {
      RedisClientManager.instance = new RedisClientManager();
    }
    return RedisClientManager.instance;
  }

  public getClient() {
    return this.client;
  }
}

export const redisClientManager = RedisClientManager.getInstance();