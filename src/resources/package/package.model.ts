import { Schema, model } from 'mongoose';
import crypto from 'crypto';
import IPackage from '@/resources/package/package.interface';

const PackageSchema = new Schema(
  {
    package_id: {
      type: String,
      unique: true,
      default: crypto.randomUUID(),
    },
    active_delivery_id: {
      type: Schema.Types.ObjectId,
      ref: 'Delivery',
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    depth: { type: Number, required: true },
    from_name: { type: String, required: true },
    from_address: { type: String, required: true },
    from_location: {
      type: Object,
      required: true,
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
    to_location: {
      type: Object,
      required: true,
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
    to_name: { type: String, required: true },
    to_address: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IPackage>('Package', PackageSchema);
