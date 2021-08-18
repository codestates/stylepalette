"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const IUser_1 = require("../interfaces/IUser");
const user_1 = require("../models/user");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const createUser = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const userUsername = yield user_1.User.findOne({
        where: {
            username: data.username
        },
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    });
    const userEmail = yield user_1.User.findOne({
        where: {
            email: data.email
        },
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    });
    if (!userUsername && !userEmail) {
        const passwordAndSalt = yield IUser_1.createHashedPassword(data.password);
        yield user_1.User.create({
            realname: data.realname,
            username: data.username,
            password: passwordAndSalt.password,
            salt: passwordAndSalt.salt,
            email: data.email,
            userimage: data.userimage
        })
            .then(res => console.log(res));
    }
    return { username: userUsername, email: userEmail };
});
exports.checkUser = function (data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.User.findOne({
            where: {
                username: data.username
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });
        const salt = user === null || user === void 0 ? void 0 : user.salt;
        if (salt) {
            const checkecdPassword = yield IUser_1.checkHashedPassword(data.password, salt);
            if ((user === null || user === void 0 ? void 0 : user.password) === checkecdPassword.password) {
                return user;
            }
            else {
                const message = "Wrong password";
                return message;
            }
        }
        else {
            return user;
        }
    });
};
exports.getToken = function (data) {
    let accessSecret = process.env.ACCESS_SECRET ? process.env.ACCESS_SECRET : undefined;
    if (accessSecret) {
        return jsonwebtoken_1.sign({
            id: data.id,
            username: data.username,
            realname: data.realname,
            email: data.email,
            salt: data.salt,
        }, accessSecret, { expiresIn: "1800s" });
    }
    else {
        return accessSecret;
    }
};
exports.checkToken = function () {
};
exports.default = {
    createUser,
    checkUser: exports.checkUser,
    getToken: exports.getToken
};
