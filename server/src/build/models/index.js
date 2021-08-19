"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
const post_1 = require("./post");
const tb_like_1 = require("./tb_like");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DATABASE ? process.env.DATABASE : "stylepalette_dev",
    username: process.env.DATABASE_USER ? process.env.DATABASE_USER : "root",
    password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : "1637",
    host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : "127.0.0.1",
    dialect: "mysql",
    port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306
});
exports.sequelize.addModels([user_1.User, post_1.Post, tb_like_1.tb_like]);
