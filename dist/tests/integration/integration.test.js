'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jwt-simple");
var helpers_1 = require("./config/helpers");
var httpStatus = require("http-status");
var mocha_1 = require("mocha");
describe('Integration tests', function () {
    var config = require('../../server/config/env/config')();
    var model = require('../../server/models');
    var userTest = {
        id: 100,
        name: 'Rafael Test',
        email: 'test@gmail.com',
        password: 'test123',
    };
    var userDefault = {
        id: 1,
        name: 'Rafael Default',
        email: 'default@gmail.com',
        password: 'default123',
    };
    var token;
    mocha_1.before(function (done) {
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
            return model.User.create(userDefault).then(function (user) {
                model.User.create(userTest).then(function () {
                    token = jwt.encode({
                        id: user.id,
                    }, config.secret);
                    done();
                });
            });
        });
    });
    describe('POST/ Token', function () {
        it('Should return a JWT', function (done) {
            var credentials = {
                email: userDefault.email,
                password: userDefault.password,
            };
            helpers_1.request(helpers_1.app).post('/token').send(credentials).end(function (err, res) {
                helpers_1.expect(res.status).to.equal(httpStatus.OK);
                helpers_1.expect(res.body.token).to.equal("" + token);
                done(err);
            });
        });
        it("Shouldn't return a JWT", function (done) {
            var credentials = {
                email: 'email.@mail.com',
                password: 'password',
            };
            helpers_1.request(helpers_1.app).post('/token').send(credentials).end(function (err, res) {
                helpers_1.expect(res.status).to.equal(httpStatus.UNAUTHORIZED);
                helpers_1.expect(res.body).to.empty;
                done(err);
            });
        });
    });
    describe('GET /api/users', function () {
        it('Should return all users from db', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/users')
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(httpStatus.OK);
                helpers_1.expect(res.body).to.be.an('array');
                helpers_1.expect(res.body[0].name).to.be.equal(userDefault.name);
                helpers_1.expect(res.body[0].email).to.be.equal(userDefault.email);
                helpers_1.expect(res.body[0].id).to.be.equal(userDefault.id);
                done(error);
            });
        });
    });
    describe('POST /api/user/', function () {
        it('Should create a new user', function (done) {
            var user = {
                id: 2,
                name: 'Rafael new Test',
                email: 'nwtestUSER@mail.com',
                password: 'newtest',
            };
            helpers_1.request(helpers_1.app)
                .post('/api/user')
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(httpStatus.OK);
                helpers_1.expect(res.body.id).to.be.equal(user.id);
                helpers_1.expect(res.body.name).to.be.equal(user.name);
                helpers_1.expect(res.body.email).to.be.equal(user.email);
                done(error);
            });
        });
    });
    describe('GET /api/user/:id', function () {
        it('Should return an user by the id', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/user/" + userDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(httpStatus.OK);
                helpers_1.expect(res.body.id).to.be.equal(userDefault.id);
                helpers_1.expect(res.body).to.have.all.keys([
                    'id',
                    'name',
                    'password',
                    'email',
                ]);
                done(error);
            });
        });
    });
    describe('PUT /api/user/:id', function () {
        it('Should update the user by the id', function (done) {
            var user = {
                name: 'Test Update',
                email: 'update@mail.com',
            };
            helpers_1.request(helpers_1.app)
                .put("/api/user/" + userDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(httpStatus.OK);
                helpers_1.expect(res.body[0]).to.be.equal(1);
                done(error);
            });
        });
    });
    describe('DELETE /api/user/:id', function () {
        it('Should delete the user by the id', function (done) {
            helpers_1.request(helpers_1.app)
                .delete("/api/user/" + userDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "Bearer " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(httpStatus.OK);
                helpers_1.expect(res.body).to.be.equal(1);
                done(error);
            });
        });
    });
});
