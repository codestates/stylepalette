"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1637",
    port: 3306
});
connection.connect((err) => {
    if (err) {
        connection.end();
    }
});
exports.default = connection;
