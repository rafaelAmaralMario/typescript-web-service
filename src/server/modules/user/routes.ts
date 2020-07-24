import { Request, Response } from 'express';
import UserController from './controller';

class UserRoutes {
  constructor () {}

  listUsers (req: Request, res: Response) {
    return UserController.listUsers(req, res);
  }
  getUserById (req: Request, res: Response) {
    return UserController.getUserById(req, res);
  }
  create (req: Request, res: Response) {
    return UserController.createUser(req, res);
  }
  update (req: Request, res: Response) {
    return UserController.updateUser(req, res);
  }
  delete (req: Request, res: Response) {
    return UserController.deleteUser(req, res);
  }
}

export default new UserRoutes();
