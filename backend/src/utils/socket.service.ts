import { Server } from 'socket.io';
import { createAdapter } from "@socket.io/redis-adapter";
import { redisClientManager } from '../config/redis-client.manager';
import { AuthRepository } from '@features/auth/auth.repository';
import { Role } from '@prisma/client';

class SocketService {
  private static instance: SocketService;
  private io: Server;

  private constructor(io: Server) {
    this.io = io;
  }

  public static getInstance(httpServer?: any): SocketService {
    if (!SocketService.instance) {
      if (!httpServer) {
        throw new Error('HTTP server instance is required for the first initialization');
      }
      const pubClient = redisClientManager.getClient();
      const subClient = pubClient.duplicate();

      const io = new Server(httpServer, {
        cors: {
          origin: process.env.FRONTEND_URL,
          methods: ['GET', 'POST'],
          credentials: true,
        },
        adapter: createAdapter(pubClient as any, subClient as any)
      });

      pubClient.on('error', (err) => {
        console.error('Redis pub/sub client error:', err);
      });
      
      SocketService.instance = new SocketService(io);
      SocketService.instance.initializeSocket();
    }
    return SocketService.instance;
  }

  public initializeSocket() {
    this.io.on('connection', async (socket) => {
      console.log('a user connected');
      const userId = socket.handshake.auth.userId;
      const authRepository = new AuthRepository();
      const user = await authRepository.findById(Number(userId));
      
      if (userId) {
        this.joinUserRoom(userId, socket.id);
        if (user?.role === Role.Admin) {
          this.joinAdminRoom(socket.id);
        }
      }
      this.registerSocketEvents(socket);
    });

    return this.io;
  }

  private registerSocketEvents(socket: any) {
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('checkRooms', () => {
      const rooms = this.io.sockets.adapter.rooms;
      console.log("All rooms:", rooms); // Log all rooms for debugging
    });

    
  }

  public sendMessageToUser(userId: number, event: string, message: string) {
    console.log("Sending notification to user", userId);
    this.io.to(`user_${userId}`).emit(event, message);
  }

  public sendMessageToAdmins(event: string, message: string) {
    this.io.to('admins').emit(event, message);
  }

  public joinUserRoom(userId: number, socketId: string) {
    console.log(`Joining user_${userId} room with socket ID: ${socketId}`);
    const socket = this.io.sockets.sockets.get(socketId);

    if (socket) {
      socket.join(`user_${userId}`);
      console.log(`Socket ${socketId} joined room user_${userId}`);
    } else {
      console.log(`Socket ${socketId} not found`);
    }
  }

  public joinAdminRoom(socketId: string) {
    console.log(`Joining admins room with socket ID: ${socketId}`);
    this.io.to('admins').emit('notification', 'New message from admin');
  }
}

export default SocketService;