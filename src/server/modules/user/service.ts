import { IUser, IUserDetail, createUser, createUserByEmail, createUserById, createUsers } from './interface';
import * as Bluebird from 'bluebird';

const model = require('../../models');

class User implements IUser {
  public id: number;
  public name: String;
  public email: String;
  public password: String;

  constructor () {}

  create (user: any) {
    return model.User.create(user);
  }

  listUsers (): Bluebird<IUser[]> {
    return model.User
      .findAll({
        order:
          [
            'name',
          ],
      })
      .then(createUsers);
  }

  getUserById (id: number): Bluebird<IUser> {
    return model.User
      .findOne({
        where: { id },
      })
      .then(createUserById);
  }

  getUserByEmail (email: string): Bluebird<IUser> {
    return model.User
      .findOne({
        where: { email },
      })
      .then(createUserByEmail);
  }

  update (id: number, user: any) {
    return model.User.update(user, {
      where: { id },
      fields:
        [
          'name',
          'email',
          'password',
        ],
      hooks: true,
      individualHooks: true,
    });
  }

  delete (id: number) {
    return model.User.destroy({
      where: { id },
    });
  }
}

export default new User();
