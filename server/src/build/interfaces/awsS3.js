"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
const multer_1 = tslib_1.__importDefault(require("multer"));
const multer_s3_1 = tslib_1.__importDefault(require("multer-s3"));
const path_1 = tslib_1.__importDefault(require("path"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const bucket = "stylepalette-s3";
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_PASSWORD,
    region: process.env.AWS_REGION
});
exports.profileUpload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: bucket,
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: 'public-read-write',
        key: (req, file, cb) => {
            let extension = path_1.default.extname(file.originalname);
            cb(null, 'profileimage/' + Date.now().toString() + extension);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
});
exports.resultUpload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: bucket,
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: 'public-read-write',
        key: (req, file, cb) => {
            let extension = path_1.default.extname(file.originalname);
            cb(null, 'resultimage/' + Date.now().toString() + extension);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
});
