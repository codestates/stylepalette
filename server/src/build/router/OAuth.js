"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = express_1.Router();
router.post('/google', controllers_1.OAuth.google);
router.post('/kakao', controllers_1.OAuth.kakao);
exports.default = router;
