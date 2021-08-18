"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const service_1 = require("../service");
const getPost = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (req.params) {
        const pathPatameter = req.params.postid;
        const result = yield service_1.post.getpost(pathPatameter);
        if (result) {
            res.status(200).send(result);
        }
        else {
            res.status(404).send({ message: "There is no post" });
        }
    }
});
const getPosts = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const results = yield service_1.post.getposts();
    console.log(results);
    if (results) {
        res.status(200).send(results);
    }
    else {
        res.status(404).send({ message: "There is no post" });
    }
});
const postPost = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (req.body && req.file) {
        const payload = req.body;
        payload.image = req.file.location;
        console.log(payload);
        const result = yield service_1.post.postpost(payload);
        console.log(result);
        if (result) {
            res.status(201).send({ message: "Successed saving post" });
        }
        else {
            res.status(404).send({ message: "Failed saving post" });
        }
    }
});
const postLike = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const pathPatameter = req.params.postid;
    const bodyParameter = req.body.userid;
    const result = yield service_1.post.postlike(pathPatameter, bodyParameter);
    const castingResult = result;
    console.log(castingResult);
    if (castingResult[0][1]) {
        res.status(201).send({ message: "Successed your request" });
    }
    else {
        res.status(400).send({ message: "Failed your request" });
    }
});
const deletePost = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const pathPatameter = req.params.postid;
    const result = yield service_1.post.deletepost(pathPatameter);
    if (result) {
        res.status(200).send({ message: "Successed deleting post" });
    }
    else {
        res.status(404).send({ message: "Failed deleting post" });
    }
});
exports.default = {
    getPost,
    getPosts,
    postPost,
    postLike,
    deletePost
};
