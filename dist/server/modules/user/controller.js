"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var service_1 = require("./service");
var handlers_1 = require("../../api/responses/handlers");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.listUsers = function (req, res) {
        service_1.default.listUsers()
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Error on get users'));
    };
    UserController.prototype.getUserById = function (req, res) {
        var id = parseInt(req.params.id);
        service_1.default.getUserById(id)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Error on get user by ID'));
    };
    UserController.prototype.createUser = function (req, res) {
        var newUser = req.body;
        service_1.default.create(newUser)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Error on Create a new User'));
    };
    UserController.prototype.updateUser = function (req, res) {
        var userUpdate = req.body;
        var id = parseInt(req.params.id);
        service_1.default.update(id, userUpdate)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Error on Update user'));
    };
    UserController.prototype.deleteUser = function (req, res) {
        var id = parseInt(req.params.id);
        service_1.default.delete(id)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Error on Delete User'));
    };
    return UserController;
}());
exports.default = new UserController();
