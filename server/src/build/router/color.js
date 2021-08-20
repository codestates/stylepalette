"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = express_1.Router();
router.post('/roulette', controllers_1.color.roulette);
router.post('/recommend', controllers_1.color.recommend);
exports.default = router;
