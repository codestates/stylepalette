"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const post_1 = require("../models/post");
const tb_like_1 = require("../models/tb_like");
const getpost = (pathParameter) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const post = post_1.Post.findOne({
        where: {
            id: pathParameter
        },
        include: [
            {
                model: tb_like_1.tb_like,
                as: 'like',
                attributes: {
                    exclude: ["id", "postId", "createdAt", "updatedAt"]
                }
            }
        ]
    });
    return post;
});
const getposts = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const posts = post_1.Post.findAll();
    return posts;
});
const postpost = (payload) => {
    const createdPost = post_1.Post.create(payload);
    return createdPost;
};
const postresult = (payload, pathParameter) => {
    const updatedPost = post_1.Post.update({
        location: payload
    }, {
        where: {
            id: pathParameter
        }
    });
    return updatedPost;
};
const postlike = (postid, userid) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const likeRecord = yield tb_like_1.tb_like.findOne({
        where: {
            userId: userid,
            postId: postid
        }
    });
    console.log(likeRecord);
    if (!likeRecord) {
        yield tb_like_1.tb_like.create({
            userId: userid,
            postId: postid
        });
        const incrementLikeCount = yield post_1.Post.increment('likeCount', {
            where: {
                id: postid
            }
        });
        return incrementLikeCount;
    }
    else {
        yield tb_like_1.tb_like.destroy({
            where: {
                userId: userid,
                postId: postid
            }
        });
        const decrementLikeCount = yield post_1.Post.increment('likeCount', {
            by: -1,
            where: {
                id: postid
            }
        });
        return decrementLikeCount;
    }
});
const deletepost = (postid) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const deletedPost = post_1.Post.destroy({
        where: {
            id: postid
        }
    });
    return deletedPost;
});
exports.default = {
    getpost,
    getposts,
    postpost,
    postresult,
    postlike,
    deletepost
};
