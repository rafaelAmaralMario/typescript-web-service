"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
    }
    UserRoutes.prototype.listUsers = function (req, res) {
        return controller_1.default.listUsers(req, res);
    };
    UserRoutes.prototype.getUserById = function (req, res) {
        return controller_1.default.getUserById(req, res);
    };
    UserRoutes.prototype.create = function (req, res) {
        return controller_1.default.createUser(req, res);
    };
    UserRoutes.prototype.update = function (req, res) {
        return controller_1.default.updateUser(req, res);
    };
    UserRoutes.prototype.delete = function (req, res) {
        return controller_1.default.deleteUser(req, res);
    };
    return UserRoutes;
}());
exports.default = new UserRoutes();
