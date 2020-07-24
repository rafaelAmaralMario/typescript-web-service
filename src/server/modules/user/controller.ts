import { Request, Response } from 'express';
import * as _ from 'lodash';

import User from './service';
import Handlers from '../../api/responses/handlers';

class UserController {
  constructor () {}

  listUsers (req: Request, res: Response) {
    User.listUsers()
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, 'Error on get users'));
  }

  getUserById (req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    User.getUserById(id)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, 'Error on get user by ID'));
  }

  createUser (req: Request, res: Response) {
    const newUser = req.body;

    User.create(newUser)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.dbErrorHandler, res))
      .catch(_.partial(Handlers.onError, res, 'Error on Create a new User'));
  }

  updateUser (req: Request, res: Response) {
    const userUpdate = req.body;
    const id: number = parseInt(req.params.id);

    User.update(id, userUpdate)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, 'Error on Update user'));
  }

  deleteUser (req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    User.delete(id)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, 'Error on Delete User'));
  }
}

export default new UserController();
