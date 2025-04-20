// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ' + client.id);
  }

  @SubscribeMessage('sendOrder')
  handleSendOrder(@MessageBody() data: any) {
    console.log('📥 Đơn hàng mới:', data);
    // Có thể emit đến các client bếp hoặc client theo dõi
    this.server.emit('orderReceived', data);
  }

  @SubscribeMessage('orderHistoryUpdated')
  handleOrderHistoryUpdated(@MessageBody() data: any) {
    console.log('Lịch sử đơn hàng đã được cập nhật:', data);
    this.server.emit('orderHistoryUpdated', data);
  }
}
