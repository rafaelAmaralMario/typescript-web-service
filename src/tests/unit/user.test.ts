import { expect } from './config/helpers';
import User from '../../server/modules/user/service';
import { IUser } from '../../server/modules/user/interface';

const model = require('../../server/models');

const userDefault = {
  id: 1,
  name: 'Rafael Default',
  email: 'default@gmail.com',
  password: 'default123',
};

before((done) => {
  model.sequelize.sync().then(() => {
    done();
  });
});

beforeEach((done) => {
  model.User
    .destroy({
      where: {},
    })
    .then(async () => {
      model.User.create(userDefault).then(() => {
        done();
      });
    });
});

describe('User Controller unit tests', () => {
  describe('Create Method Test', () => {
    it('Should Create a new user', () => {
      const newUser = {
        id: 2,
        name: 'New User',
        email: 'new@mail.com',
        password: 'newpass',
      };
      return User.create(newUser).then((data) => {
        expect(data.dataValues).to.have.all.keys([
          'email',
          'id',
          'name',
          'password',
          'updatedAt',
          'createdAt',
        ]);
      });
    });
  });

  describe('Delete Method Test', () => {
    it('Should delete an user', () => {
      return User.delete(userDefault.id).then((data) => {
        expect(data).to.be.equal(1);
      });
    });
  });

  describe('Update Method Test', () => {
    it('Should update an user', () => {
      const newUserData = {
        name: 'Updated User',
        email: 'update@mail.com',
      };

      return User.update(userDefault.id, newUserData).then((data) => {
        expect(data[0]).to.be.equal(1);
      });
    });
  });

  describe('Get Method Test', () => {
    it('Should Get a list of user', () => {
      return User.listUsers().then((data: IUser[]) => {
        expect(data).to.be.an('array');
        expect(data[0]).to.be.all.keys([
          'email',
          'id',
          'name',
          'password',
        ]);
      });
    });
    it('Should Get the user by an ID', () => {
      return User.getUserById(userDefault.id).then((data: IUser) => {
        expect(data).to.be.all.keys([
          'email',
          'id',
          'name',
          'password',
        ]);
      });
    });
    it('Should Get the user by an Email', () => {
      return User.getUserByEmail(userDefault.email).then((data: IUser) => {
        expect(data).to.be.all.keys([
          'email',
          'id',
          'name',
          'password',
        ]);
      });
    });
  });
});
