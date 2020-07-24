"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("../../modules/user/routes");
var auth_1 = require("../../modules/auth/auth");
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.initRoutes = function (app, auth) {
        app.route('/api/users').all(auth.config().authenticate()).get(routes_1.default.listUsers);
        app.route('/api/user/:id').all(auth.config().authenticate()).get(routes_1.default.getUserById);
        app.route('/api/user/').all(auth.config().authenticate()).post(routes_1.default.create);
        app.route('/api/user/:id').all(auth.config().authenticate()).put(routes_1.default.update);
        app.route('/api/user/:id').all(auth.config().authenticate()).delete(routes_1.default.delete);
        app.route('/token').post(auth_1.default.auth);
    };
    return Routes;
}());
exports.default = new Routes();
