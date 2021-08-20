"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = require("jsonwebtoken");
const service_1 = require("../service");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const getUserinfo = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.jwt) {
        const accessSecret = process.env.ACCESS_SECRET ? process.env.ACCESS_SECRET : undefined;
        if (accessSecret) {
            const tokenInfo = jsonwebtoken_1.verify(req.cookies.jwt, accessSecret, { ignoreExpiration: true });
            const userInfo = yield service_1.userinfo.getuserinfo(tokenInfo);
            res.status(200).send(userInfo);
        }
        else {
            res.status(400).send({ message: "No access secret" });
        }
    }
    else {
        res.status(404).send({ message: "No token" });
    }
});
const patchProfile = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.file && req.params) {
        const pathParameter = req.params.userid;
        const location = (_a = req.file) === null || _a === void 0 ? void 0 : _a.location;
        const result = yield service_1.userinfo.imageUpload(location, pathParameter);
        if (result) {
            res.status(200).send({ message: "Successed changing your Profile", location: location });
        }
        else {
            res.status(400).send({ message: "Failed changing your Profile" });
        }
    }
    else {
        res.status(400).send({ message: "There is no Profile to change" });
    }
});
const patchPassword = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (req.params && req.body) {
        const pathParameter = req.params.userid;
        const payload = req.body;
        const result = yield service_1.userinfo.patchPassword(payload, pathParameter);
        if (result) {
            res.status(200).send({ message: "Successed changing your password" });
        }
        else {
            res.status(400).send({ message: "Failed changing your password" });
        }
    }
    else {
        res.status(400).send({ message: "There is no information to change" });
    }
});
const patchUserinfo = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (req.params && req.body) {
        const pathParameter = req.params.userid;
        const payload = req.body;
        const result = yield service_1.userinfo.patchuserinfo(payload, pathParameter);
        if (result) {
            res.status(200).send({ message: "Successed changing your information" });
        }
        else {
            res.status(400).send({ message: "Failed changing your information" });
        }
    }
    else {
        res.status(400).send({ message: "There is no information to change" });
    }
});
const postCheckUser = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (req.body) {
        const payload = req.body;
        const result = yield service_1.userinfo.checkUser(payload);
        if (result) {
            res.status(200).send({ message: "This user is verified" });
        }
        else {
            res.status(400).send({ message: "Invalid user" });
        }
    }
});
exports.default = {
    getUserinfo,
    patchUserinfo,
    patchPassword,
    patchProfile,
    postCheckUser
};
