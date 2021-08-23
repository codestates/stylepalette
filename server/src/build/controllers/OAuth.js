"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const service_1 = require("../service");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const google = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.post("https://oauth2.googleapis.com/token", {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: req.body.code,
        grant_type: 'authorization_code',
        redirect_uri: "https://localhost:3000"
    })
        .then(response => {
        let params = new URLSearchParams(response.data);
        let accessToken = params.get("access_token");
        let id_token = params.get("id_token");
        axios_1.default.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`, {
            withCredentials: true
        }).then((response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const username = response.data.id;
            const nickname = response.data.id;
            const email = response.data.email;
            const userimage = response.data.picture;
            const data = {
                username: username,
                realname: nickname,
                email: email,
                userimage: userimage
            };
            const user = yield service_1.OAuth.createSocialUser(data);
            const accessToken = service_1.OAuth.getToken(user);
            if (accessToken) {
                res.cookie("jwt", accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    path: "/",
                    secure: true,
                    httpOnly: true,
                    sameSite: 'none'
                }).status(200).send({ message: "Successed Sign in", payload: { accessToken: accessToken, user: user } });
            }
            else {
                res.status(400).send({ message: "Failed Sign in, No Token" });
            }
        })).catch(e => res.status(400).send({ message: e }));
    })
        .catch(e => res.status(404).send({ meassage: e }));
});
const kakao = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=https://localhost:3000&code=${req.body.code}`, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
        .then((response) => {
        let access_token = response.data.access_token;
        axios_1.default.get(`https://kapi.kakao.com/v2/user/me`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
            .then((response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            console.log(response);
            const username = response.data.id;
            const nickname = response.data.properties.nickname;
            const email = response.data.kakao_account.email;
            const userimage = response.data.properties.profile_image;
            const data = {
                username: username,
                realname: nickname,
                email: email,
                userimage: userimage
            };
            const user = yield service_1.OAuth.createSocialUser(data);
            const accessToken = service_1.OAuth.getToken(user);
            if (accessToken) {
                res.cookie("jwt", accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    path: "/",
                    secure: true,
                    httpOnly: true,
                    sameSite: 'none'
                }).status(200).send({ message: "Successed Sign in", payload: { accessToken: accessToken, user: user } });
            }
            else {
                res.status(400).send({ message: "Failed Sign in, No Token" });
            }
        })).catch(e => res.status(400).send({ message: e }));
    }).catch(e => res.status(404).send({ meassage: e }));
});
exports.default = {
    google,
    kakao
};
