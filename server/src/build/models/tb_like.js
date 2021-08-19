"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
const post_1 = require("./post");
let tb_like = class tb_like extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.ForeignKey(() => user_1.User),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], tb_like.prototype, "userId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.ForeignKey(() => post_1.Post),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], tb_like.prototype, "postId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.BelongsTo(() => user_1.User),
    tslib_1.__metadata("design:type", user_1.User)
], tb_like.prototype, "userlike", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.BelongsTo(() => post_1.Post),
    tslib_1.__metadata("design:type", post_1.Post)
], tb_like.prototype, "postlike", void 0);
tb_like = tslib_1.__decorate([
    sequelize_typescript_1.Table
], tb_like);
exports.tb_like = tb_like;
