'use strict';

import * as jwt from 'jwt-simple';
import { app, request, expect } from './config/helpers';
import * as httpStatus from 'http-status';
import { before } from 'mocha';

describe('Integration tests', () => {
  const config = require('../../server/config/env/config')();
  const model = require('../../server/models');

  const userTest = {
    id: 100,
    name: 'Rafael Test',
    email: 'test@gmail.com',
    password: 'test123',
  };

  const userDefault = {
    id: 1,
    name: 'Rafael Default',
    email: 'default@gmail.com',
    password: 'default123',
  };

  let token;

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
      .then(() => {
        return model.User.create(userDefault).then((user) => {
          model.User.create(userTest).then(() => {
            token = jwt.encode(
              {
                id: user.id,
              },
              config.secret,
            );

            done();
          });
        });
      });
  });

  describe('POST/ Token', () => {
    it('Should return a JWT', (done) => {
      const credentials = {
        email: userDefault.email,
        password: userDefault.password,
      };

      request(app).post('/token').send(credentials).end((err: any, res: any) => {
        expect(res.status).to.equal(httpStatus.OK);
        expect(res.body.token).to.equal(`${token}`);
        done(err);
      });
    });

    it("Shouldn't return a JWT", (done) => {
      const credentials = {
        email: 'email.@mail.com',
        password: 'password',
      };

      request(app).post('/token').send(credentials).end((err: any, res: any) => {
        expect(res.status).to.equal(httpStatus.UNAUTHORIZED);
        expect(res.body).to.empty;
        done(err);
      });
    });
  });

  describe('GET /api/users', () => {
    it('Should return all users from db', (done) => {
      request(app)
        .get('/api/users')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(userDefault.name);
          expect(res.body[0].email).to.be.equal(userDefault.email);
          expect(res.body[0].id).to.be.equal(userDefault.id);
          done(error);
        });
    });
  });

  describe('POST /api/user/', () => {
    it('Should create a new user', (done) => {
      const user = {
        id: 2,
        name: 'Rafael new Test',
        email: 'nwtestUSER@mail.com',
        password: 'newtest',
      };

      request(app)
        .post('/api/user')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body.id).to.be.equal(user.id);
          expect(res.body.name).to.be.equal(user.name);
          expect(res.body.email).to.be.equal(user.email);
          done(error);
        });
    });
  });

  describe('GET /api/user/:id', () => {
    it('Should return an user by the id', (done) => {
      request(app)
        .get(`/api/user/${userDefault.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body.id).to.be.equal(userDefault.id);
          expect(res.body).to.have.all.keys([
            'id',
            'name',
            'password',
            'email',
          ]);
          done(error);
        });
    });
  });

  describe('PUT /api/user/:id', () => {
    it('Should update the user by the id', (done) => {
      const user = {
        name: 'Test Update',
        email: 'update@mail.com',
      };

      request(app)
        .put(`/api/user/${userDefault.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body[0]).to.be.equal(1);
          done(error);
        });
    });
  });

  describe('DELETE /api/user/:id', () => {
    it('Should delete the user by the id', (done) => {
      request(app)
        .delete(`/api/user/${userDefault.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body).to.be.equal(1);
          done(error);
        });
    });
  });
});
