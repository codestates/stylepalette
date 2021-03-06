"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const models_1 = require("./models");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const fs = tslib_1.__importStar(require("fs"));
const https_1 = tslib_1.__importDefault(require("https"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const router_1 = tslib_1.__importDefault(require("./router"));
const app = express_1.default();
app.use(cors_1.default({
    origin: ['https://www.stylepalette.net', 'https://stylepalette.net', 'https://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
}));
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(router_1.default);
app.get("/", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield models_1.sequelize.authenticate()
        .then(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        res.send("connection success with DB");
    }))
        .catch((e) => {
        res.send("Error : " + e);
    });
}));
let server;
if (fs.existsSync("./../cert/key.pem") &&
    fs.existsSync("./../cert/cert.pem")) {
    const privateKey = fs.readFileSync("/home/kyu/projects/stylepalette/cert/key.pem", "utf8");
    const certificate = fs.readFileSync("/home/kyu/projects/stylepalette/cert/cert.pem", "utf8");
    const credentials = { key: privateKey, cert: certificate };
    server = https_1.default.createServer(credentials, app);
    server.listen(443, function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`${443}번 포트에서 서버가 열렸습니다.`);
            yield models_1.sequelize.authenticate()
                .then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                console.log("connection success with DB");
            }))
                .catch((e) => {
                console.log("Error : " + e);
            });
        });
    });
}
else {
    app.listen(80, function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`${80}번 포트에서 서버가 열렸습니다.`);
            yield models_1.sequelize.authenticate()
                .then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                console.log("connection success with DB");
            }))
                .catch((e) => {
                console.log("Error : " + e);
            });
        });
    });
}
