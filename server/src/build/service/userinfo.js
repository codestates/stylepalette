"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const IUser_1 = require("../interfaces/IUser");
const user_1 = require("../models/user");
const post_1 = require("../models/post");
const getuserinfo = (tokenInfo) => {
    const info = user_1.User.findAll({
        where: {
            id: tokenInfo.id
        },
        attributes: {
            exclude: ["password", "salt", "createdAt", "updatedAt"]
        },
        include: [
            {
                model: post_1.Post,
                as: 'post',
                attributes: {
                    exclude: ["updatedAt"]
                }
            }
        ]
    });
    return info;
};
const patchuserinfo = (payload, pathParameter) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (payload.password) {
        const newPasswordAndSalt = yield IUser_1.createHashedPassword(payload.password);
        payload.password = newPasswordAndSalt.password;
        payload.salt = newPasswordAndSalt.salt;
    }
    const updatedUserInfo = user_1.User.update(payload, {
        where: {
            id: pathParameter
        }
    });
    return updatedUserInfo;
});
const imageUpload = (location, pathParameter) => {
    const updateUserImage = user_1.User.update({
        userimage: location
    }, {
        where: {
            id: pathParameter
        }
    });
    return updateUserImage;
};
const checkUser = (payload) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findOne({
        where: {
            username: payload.username,
        }
    });
    const salt = user === null || user === void 0 ? void 0 : user.salt;
    if (salt) {
        const checkecdPassword = yield IUser_1.checkHashedPassword(payload.password, salt);
        if ((user === null || user === void 0 ? void 0 : user.password) === checkecdPassword.password) {
            return user;
        }
        else {
            return undefined;
        }
    }
    else {
        return undefined;
    }
});
exports.default = {
    getuserinfo,
    patchuserinfo,
    imageUpload,
    checkUser
};
