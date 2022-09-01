import WebSocket from 'ws';
import { TSocketMessage } from '@/resources/socket/socket.type';
import IDelivery from '@/resources/delivery/delivery.interface';
import DeliveryService from '@/resources/delivery/delivery.service';
import constants from '@/utils/constants';
class SocketHandler {
  public connection;
  public deliveryService = new DeliveryService();
  constructor(conn: WebSocket) {
    this.connection = conn;
  }

  public HandleMessage(message: TSocketMessage): void {
    console.log('ws connected and event triggered ....');
    if (typeof message === 'string') {
      const reqBody = JSON.parse(message);
      if (reqBody.eventType === 'STATUS_CHANGED') {
        this.HandleStatusUpdate(reqBody);
      } else if (reqBody.eventType === 'LOCATION_CHANGED') {
        this.HandleLocationUpdate(reqBody);
      } else {
        const errMsg = JSON.stringify({
          success: false,
          messages: ['bad event type, event doesnt exist.'],
        });
        this.connection.send(errMsg);
      }
    } else {
      const errMsg = JSON.stringify({
        success: false,
        messages: ['please parse data into string and resend'],
      });
      this.connection.send(errMsg);
    }
    this.connection.send('message from server socket handler');
  }

  private async HandleStatusUpdate(message: Partial<IDelivery>): Promise<void> {
    try {
      let payload = {};
      if (message.status === constants.DELIVERY_STATUS.PICKED_UP) {
        payload = {
          delivery_id: message.delivery_id,
          status: message.status,
          pickup_time: Date(),
        };
      } else if (message.status === constants.DELIVERY_STATUS.IN_TRANSIT) {
        payload = {
          delivery_id: message.delivery_id,
          status: message.status,
          start_time: Date(),
        };
      } else if (
        message.status === constants.DELIVERY_STATUS.DELIVERED ||
        message.status === constants.DELIVERY_STATUS.FAILED
      ) {
        payload = {
          delivery_id: message.delivery_id,
          status: message.status,
          end_time: Date(),
        };
      }
      console.log(`Event Triggered => `, payload);
      const delivery = await this.deliveryService.updateStatus(payload);
      const deliveryStr = JSON.stringify(delivery);
      this.connection.send(deliveryStr);
    } catch (error: any) {
      const errMsg = JSON.stringify({
        success: false,
        messages: [error.message],
      });
      this.connection.send(errMsg);
    }
  }
  private HandleLocationUpdate(reqBody: TSocketMessage): void {
    console.log('LOCATION CHANGED EVENT TRIGGERED =>', reqBody);
  }
}

export default SocketHandler;
