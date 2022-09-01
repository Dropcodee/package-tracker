import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import IController from '@/utils/interface/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import mongoose from 'mongoose';

class App {
  public port: number;
  public express: Application;

  constructor(controllers: IController[], port: number) {
    this.express = express();
    this.port = port;
    this.initializeMiddleware();
    this.initializeDatabase();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddleware() {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private async initializeDatabase() {
    try {
      const { MONGO_PORT, MONGO_DBNAME, MONGO_USERNAME } = process.env;
      const mongo_url = `mongodb://${MONGO_USERNAME}:${MONGO_PORT}/${MONGO_DBNAME}?readPreference=primary&directConnection=true&ssl=false`;
      await mongoose.connect(mongo_url);
      console.log('DB Connected successfully...');
    } catch (error: any) {
      console.error('Error connecting to DB => ', error.message);
    }
  }
  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller: IController) => {
      this.express.use('/api/', controller.router);
    });
  }
  private initializeErrorHandling() {
    this.express.use(ErrorMiddleware);
  }

  public startEngine(): typeof Server {
    const Server = this.express.listen(this.port, () => {
      console.error(new Date());
      console.log(
        `🚀🚀 backend engine is started and listening on port ${this.port}👌🏾✅`
      );
    });
    return Server
  }
}

export default App;
