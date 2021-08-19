"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const post_1 = require("./post");
const tb_like_1 = require("./tb_like");
let User = class User extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], User.prototype, "realname", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], User.prototype, "salt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Default("https://stylepalette-s3.s3.ap-northeast-2.amazonaws.com/profileimage/1629174885444.png"),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], User.prototype, "userimage", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.HasMany(() => post_1.Post),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "post", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.BelongsToMany(() => post_1.Post, () => tb_like_1.tb_like),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "postlike", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.HasMany(() => tb_like_1.tb_like),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "like", void 0);
User = tslib_1.__decorate([
    sequelize_typescript_1.Table
], User);
exports.User = User;
