import { Application, Request, Response } from 'express';
import UserRoutes from '../../modules/user/routes';
import TokenRoutes from '../../modules/auth/auth';

class Routes {
  constructor () {}

  initRoutes (app: Application, auth: any): void {
    app.route('/api/users').all(auth.config().authenticate()).get(UserRoutes.listUsers);
    app.route('/api/user/:id').all(auth.config().authenticate()).get(UserRoutes.getUserById);
    app.route('/api/user/').all(auth.config().authenticate()).post(UserRoutes.create);
    app.route('/api/user/:id').all(auth.config().authenticate()).put(UserRoutes.update);
    app.route('/api/user/:id').all(auth.config().authenticate()).delete(UserRoutes.delete);
    app.route('/token').post(TokenRoutes.auth);
  }
}

export default new Routes();
