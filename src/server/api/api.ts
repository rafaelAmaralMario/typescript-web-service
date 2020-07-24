import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { Application } from 'express';

import Handlers from './responses/handlers';
import Routes from './routes/routes';
import Auth from '../auth';
class API {
  public express: Application;

  constructor () {
    this.express = express();
    this.middleware();
  }

  middleware (): void {
    this.express.use(morgan('dev'));
    this.express.use(Handlers.errorHandlerAPI);
    this.express.use(Auth.config().initialize());
    this.express.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    this.express.use(bodyParser.json());

    this.router(this.express, Auth);
  }

  private router (app: Application, auth: any): void {
    Routes.initRoutes(app, auth);
  }
}

export default new API().express;
