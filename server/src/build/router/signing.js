"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = express_1.Router();
router.post('/signup', controllers_1.signing.signUp);
router.post('/signin', controllers_1.signing.signIn);
router.get('/signout', controllers_1.signing.signOut);
exports.default = router;
