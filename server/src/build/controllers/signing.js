"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const service_1 = require("../service");
const signUp = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield service_1.signing.createUser(req.body);
    if (!foundUser.username && !foundUser.email) {
        res.status(201).send({ message: "Completed sign up" });
    }
    else if (foundUser.username) {
        res.status(400).send({ message: "Already existed username" });
    }
    else if (foundUser.email) {
        res.status(400).send({ message: "Already existed email" });
    }
});
const signIn = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield service_1.signing.checkUser(req.body);
    if (typeof foundUser === "string") {
        res.status(400).send({ message: "Wrong password" });
    }
    if (foundUser && typeof foundUser !== "string") {
        const accessToken = service_1.signing.getToken(foundUser);
        if (accessToken) {
            res.cookie("jwt", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: "/",
                secure: true,
                httpOnly: true,
                sameSite: 'none'
            }).status(200).send({ message: "Successed Sign in", payload: { accessToken: accessToken, user: foundUser } });
        }
        else {
            res.status(400).send({ message: "Failed Sign in, No Token" });
        }
    }
    else {
        res.status(400).send({ message: "There is no such a username" });
    }
});
const signOut = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies.jwt;
    console.log(cookie);
    if (cookie) {
        res.clearCookie(cookie).status(200).send({ message: "Successed Sign out" });
    }
    else {
        res.status(404).send({ message: "Not found" });
    }
    ;
});
exports.default = {
    signUp,
    signIn,
    signOut
};
