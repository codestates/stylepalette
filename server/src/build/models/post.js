"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const tb_like_1 = require("./tb_like");
const user_1 = require("./user");
let Post = class Post extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Post.prototype, "image", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Post.prototype, "topcolor", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Post.prototype, "bottomcolor", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "likeCount", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Boolean)
], Post.prototype, "isPublic", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.ForeignKey(() => user_1.User),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "userId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.BelongsTo(() => user_1.User),
    tslib_1.__metadata("design:type", user_1.User)
], Post.prototype, "user", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.BelongsToMany(() => user_1.User, () => tb_like_1.tb_like),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "userlike", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.HasMany(() => tb_like_1.tb_like),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "like", void 0);
Post = tslib_1.__decorate([
    sequelize_typescript_1.Table
], Post);
exports.Post = Post;
