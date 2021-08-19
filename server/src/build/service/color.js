"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const IColor_1 = require("../interfaces/IColor");
const roulette = (colorcode) => {
    let demiColor = IColor_1.demical(colorcode);
    let rouletteColor = IColor_1.tonOnton(demiColor, 7);
    let hexRouletteColor = rouletteColor.map((el) => IColor_1.hexademical(el));
    return hexRouletteColor;
};
const recommend = (colorcode) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let demiColor = IColor_1.demical(colorcode);
    let titColor = IColor_1.tonInton(demiColor);
    let totColor = IColor_1.tonOnton(demiColor, 5);
    let monoColor = IColor_1.monotone(demiColor, 25);
    let recommendColors = {
        tonInton: titColor.map((el) => IColor_1.hexademical(el)),
        tonOnton: totColor.map((el) => IColor_1.hexademical(el)),
        monoton: monoColor.map((el) => IColor_1.hexademical(el))
    };
    return recommendColors;
});
exports.default = {
    roulette,
    recommend
};
