import { Document } from 'mongoose';

export default interface IPackage extends Document {
  package_id: string;
  active_delivery_id: string;
  description: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  from_name: string;
  from_address: string;
  from_location: Location;
  to_name: string;
  to_address: string;
  to_location: Location;
}

type Location = {
  latitude: string;
  longitude: string;
};
