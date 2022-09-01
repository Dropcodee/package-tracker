import 'module-alias/register';
import 'dotenv/config';
import App from './app';
import WebSocket from 'ws';
import PackageController from '@/resources/package/package.controller';
import DeliveryController from '@/resources/delivery/delivery.controller';
import SocketHandler from '@/resources/socket/socket.handler';
import { TSocketMessage } from '@/resources/socket/socket.type';

const app = new App(
  [new PackageController(), new DeliveryController()],
  Number(process.env.PORT) || 8080
);
const server = app.startEngine();

function webSocketEngine(): void {
  const wss = new WebSocket.Server({ server });
  wss.on('connection', function (ws) {
    const socketHandler = new SocketHandler(ws);
    ws.on('message', function (data, isBinary) {
      const message: TSocketMessage = isBinary ? data : data.toString();
      socketHandler.HandleMessage(message);
    });
    // ws.on('status_changed', function (data, isBinary) {
    //   const message = isBinary ? data : data.toString();
    //   socketHandler.HandleStatusUpdate(message);
    // });
  });
}
webSocketEngine()
