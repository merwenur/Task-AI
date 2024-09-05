import { eventEmitter } from '@utils/event.emitter';
import { redisClientManager } from '@config/redis-client.manager';

let redisClient = redisClientManager.getClient();

async function processEvents() {
  while (true) {
    if (!redisClient) {
      redisClient = redisClientManager.getClient();
      await redisClient.connect();
    }

    const event = await redisClient.lpop('eventQueue');
    if (event) {
      const { event: eventName, data } = JSON.parse(event);
      eventEmitter.emit(eventName, data);
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 saniye bekle
    }
  }
}

processEvents().catch(console.error);