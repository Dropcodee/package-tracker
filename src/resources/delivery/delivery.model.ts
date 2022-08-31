import { Schema, model } from 'mongoose';
import IDelivery from '@/resources/delivery/delivery.interface';
import crypto from 'crypto';

const DeliverySchema = new Schema(
  {
    delivery_id: {
      type: String,
      unique: true,
      default: crypto.randomUUID(),
    },
    package_id: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      required: true,
    },
    pickup_time: { type: Date, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    location: {
      type: Object,
      longitude: { type: String, required: true },
      latitude: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

export default model<IDelivery>('Delivery', DeliverySchema);
