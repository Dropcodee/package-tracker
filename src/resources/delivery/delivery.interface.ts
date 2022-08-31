import { Document } from 'mongoose';

export default interface IDelivery extends Document {
  delivery_id: string;
  package_id: string;
  pickup_time: string;
  start_time: string;
  end_time: string;
  location: Location;
  status: DeliveryStatus;
}

enum  DeliveryStatus {
  OPEN = 'open',
  PICKUP = 'picked-up',
  TRANSIT = 'in-transit',
  DELIVERED = 'delivered',
  FAILED = 'failed',
}

type Location = {
  latitude: string;
  longitude: string;
};
