"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/user/service");
var model = require('../../server/models');
var userDefault = {
    id: 1,
    name: 'Rafael Default',
    email: 'default@gmail.com',
    password: 'default123',
};
before(function (done) {
    model.sequelize.sync().then(function () {
        done();
    });
});
beforeEach(function (done) {
    model.User
        .destroy({
        where: {},
    })
        .then(function () {
        model.User.create(userDefault).then(function () {
            done();
        });
    });
});
describe('Controller unit tests', function () {
    describe('Create Method Test', function () {
        it('Should Create a new user', function () {
            var newUser = {
                id: 2,
                name: 'New User',
                email: 'new@mail.com',
                password: 'newpass',
            };
            return service_1.default.create(newUser).then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys([
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
    describe('Delete Method Test', function () {
        it('Should delete an user', function () {
            return service_1.default.delete(userDefault.id).then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
    describe('Update Method Test', function () {
        it('Should update an user', function () {
            var newUserData = {
                name: 'Updated User',
                email: 'update@mail.com',
            };
            return service_1.default.update(userDefault.id, newUserData).then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Get Method Test', function () {
        it('Should Get a list of user', function () {
            return service_1.default.listUsers().then(function (data) {
                helpers_1.expect(data).to.be.an('array');
                helpers_1.expect(data[0]).to.be.all.keys([
                    'email',
                    'id',
                    'name',
                    'password',
                ]);
            });
        });
        it('Should Get the user by an ID', function () {
            return service_1.default.getUserById(userDefault.id).then(function (data) {
                helpers_1.expect(data).to.be.all.keys([
                    'email',
                    'id',
                    'name',
                    'password',
                ]);
            });
        });
        it('Should Get the user by an Email', function () {
            return service_1.default.getUserByEmail(userDefault.email).then(function (data) {
                helpers_1.expect(data).to.be.all.keys([
                    'email',
                    'id',
                    'name',
                    'password',
                ]);
            });
        });
    });
});
