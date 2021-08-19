"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
exports.createSalt = function () {
    return new Promise((resolve, reject) => {
        crypto_1.default.randomBytes(64, (err, buf) => {
            if (err)
                reject(err);
            resolve(buf.toString('base64'));
        });
    });
};
exports.createHashedPassword = function (password) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const salt = yield exports.createSalt();
        return new Promise((resolve, reject) => {
            crypto_1.default.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
                if (err)
                    reject(err);
                resolve({ password: key.toString('base64'), salt: salt });
            });
        });
    });
};
exports.checkHashedPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        crypto_1.default.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
            if (err)
                reject(err);
            resolve({ password: key.toString('base64') });
        });
    });
};
