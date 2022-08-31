import 'module-alias/register';
import 'dotenv/config';
import App from './app';
import PackageController from '@/resources/package/package.controller';
import DeliveryController from '@/resources/delivery/delivery.controller';

const app = new App(
  [new PackageController(), new DeliveryController()],
  Number(process.env.PORT) || 8080
);
app.startEngine();
