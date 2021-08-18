"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
let development = {
    username: "root",
    password: "1637",
    database: "stylepalette_dev",
    host: "127.0.0.1",
    dialect: "mysql"
};
let test = {
    username: "root",
    password: "",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
};
let production = {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "stylepalett",
    host: process.env.DATABASE_HOST,
    dialect: "mysql"
};
exports.default = {
    development, test, production
};
