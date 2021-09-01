"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const service_1 = require("../service");
const roulette = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let colors = yield service_1.color.roulette(req.body.maincolor);
    console.log(colors);
    res.status(200).send(colors);
});
const recommend = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let colors = yield service_1.color.recommend(req.body.selectedcolor);
    console.log(colors);
    res.status(200).send(colors);
});
exports.default = {
    roulette,
    recommend
};
