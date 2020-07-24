"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpStatus = require("http-status");
var jwt = require("jwt-simple");
var bcrypt = require("bcrypt");
var config = require('../../config/env/config')();
var Handlers = /** @class */ (function () {
    function Handlers() {
    }
    Handlers.prototype.authFailed = function (req, res) {
        res.sendStatus(httpStatus.UNAUTHORIZED);
    };
    Handlers.prototype.authSuccess = function (res, credential, data) {
        var isMatch = bcrypt.compareSync(credential.password, data.password);
        if (isMatch) {
            var payload = {
                id: data.id,
            };
            res.json({
                token: jwt.encode(payload, config.secret),
            });
        }
        else {
            res.sendStatus(httpStatus.UNAUTHORIZED);
        }
    };
    Handlers.prototype.onError = function (res, message, err) {
        console.log("Error " + err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: message });
    };
    Handlers.prototype.onSuccess = function (res, data) {
        res.status(httpStatus.OK).json(data);
    };
    Handlers.prototype.errorHandlerAPI = function (err, req, res, next) {
        console.log("API Error: " + err);
        res.status(500).json({
            errorCode: 'ERR-001',
            message: 'Server internal errror',
        });
    };
    Handlers.prototype.dbErrorHandler = function (res, err) {
        console.log("DataBase Error " + err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'unexpected Error' });
    };
    return Handlers;
}());
exports.default = new Handlers();
