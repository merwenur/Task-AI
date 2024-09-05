import { EventEmitter } from 'events';
import { redisClientManager } from '@config/redis-client.manager';

class CustomEventEmitter extends EventEmitter {
  private static instance: CustomEventEmitter;
  private redisClient;

  private constructor() {
    super();
    this.redisClient = redisClientManager.getClient();
  }

  public static getInstance(): CustomEventEmitter {
    if (!CustomEventEmitter.instance) {
      CustomEventEmitter.instance = new CustomEventEmitter();
    }
    return CustomEventEmitter.instance;
  }

  public async emitEvent(event: string, data: any) {
    console.log('Emitting event: ', event);
    await this.redisClient.rpush('eventQueue', JSON.stringify({ event, data }));
  }
}

export const eventEmitter = CustomEventEmitter.getInstance();