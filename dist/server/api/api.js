"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var handlers_1 = require("./responses/handlers");
var routes_1 = require("./routes/routes");
var auth_1 = require("../auth");
var API = /** @class */ (function () {
    function API() {
        this.express = express();
        this.middleware();
    }
    API.prototype.middleware = function () {
        this.express.use(morgan('dev'));
        this.express.use(handlers_1.default.errorHandlerAPI);
        this.express.use(auth_1.default.config().initialize());
        this.express.use(bodyParser.urlencoded({
            extended: true,
        }));
        this.express.use(bodyParser.json());
        this.router(this.express, auth_1.default);
    };
    API.prototype.router = function (app, auth) {
        routes_1.default.initRoutes(app, auth);
    };
    return API;
}());
exports.default = new API().express;
