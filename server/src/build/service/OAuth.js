"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_1 = require("../models/user");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.createSocialUser = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findOne({
        where: {
            username: data.username,
            email: data.email
        },
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    });
    if (!user) {
        const createdSocialUser = yield user_1.User.create({
            realname: data.realname,
            username: data.username,
            password: null,
            salt: null,
            email: data.email,
            userimage: data.userimage
        });
        return createdSocialUser;
    }
    return user;
});
exports.getToken = function (data) {
    let accessSecret = process.env.ACCESS_SECRET ? process.env.ACCESS_SECRET : undefined;
    if (accessSecret) {
        return jsonwebtoken_1.sign({
            id: data.id,
            username: data.username,
            realname: data.realname,
            email: data.email,
        }, accessSecret, { expiresIn: "1800s" });
    }
    else {
        return accessSecret;
    }
};
exports.default = {
    createSocialUser: exports.createSocialUser,
    getToken: exports.getToken
};
