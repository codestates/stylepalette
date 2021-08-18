"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monotone = function (rgbvalue, distance) {
    let mono = Math.floor((rgbvalue.r + rgbvalue.g + rgbvalue.b) / 3);
    let rgb = { r: mono, g: mono, b: mono };
    let tones = [rgb];
    while (tones[0].r > 0 || tones[0].g > 0 || tones[0].b > 0) {
        let r = (tones[0].r - distance > 0) ? tones[0].r - distance : 0;
        let g = (tones[0].g - distance > 0) ? tones[0].g - distance : 0;
        let b = (tones[0].b - distance > 0) ? tones[0].b - distance : 0;
        let rgb = { r: r, g: g, b: b };
        tones.unshift(rgb);
    }
    while (tones[tones.length - 1].r < 255 || tones[tones.length - 1].g < 255 || tones[tones.length - 1].b < 255) {
        let r = (tones[tones.length - 1].r + distance < 255) ? tones[tones.length - 1].r + distance : 255;
        let g = (tones[tones.length - 1].g + distance < 255) ? tones[tones.length - 1].g + distance : 255;
        let b = (tones[tones.length - 1].b + distance < 255) ? tones[tones.length - 1].b + distance : 255;
        let rgb = { r: r, g: g, b: b };
        tones.push(rgb);
    }
    return tones;
};
exports.tonInton = function (rgbvalue) {
    let max = Math.max(rgbvalue.r, rgbvalue.g, rgbvalue.b);
    let min = Math.min(rgbvalue.r, rgbvalue.g, rgbvalue.b);
    let mid = Math.round((max + min) / 2);
    let tones = [
        rgbvalue,
        { r: max, g: min, b: min },
        { r: min, g: max, b: min },
        { r: min, g: min, b: max },
        { r: max, g: max, b: min },
        { r: max, g: min, b: max },
        { r: min, g: max, b: max },
        { r: max, g: mid, b: min },
        { r: max, g: min, b: mid },
        { r: mid, g: max, b: min },
        { r: mid, g: max, b: mid },
        { r: mid, g: min, b: max },
        { r: min, g: mid, b: max },
    ];
    return tones;
};
exports.tonOnton = function (rgbvalue) {
    let tones = [rgbvalue];
    let Cmax = Math.max(rgbvalue.r / 255, rgbvalue.g / 255, rgbvalue.b / 255);
    let Cmim = Math.min(rgbvalue.r / 255, rgbvalue.g / 255, rgbvalue.b / 255);
    let lightness = Math.floor(((Cmax + Cmim) / 2) * 1000) / 10;
    let lighterValue = Math.floor((100 - lightness) / 5);
    let darkerValue = Math.floor(lightness / 5);
    let lighterR = (255 - rgbvalue.r) / lighterValue;
    let lighterG = (255 - rgbvalue.g) / lighterValue;
    let lighterB = (255 - rgbvalue.b) / lighterValue;
    let darkerR = rgbvalue.r / darkerValue;
    let darkerG = rgbvalue.g / darkerValue;
    let darkerB = rgbvalue.b / darkerValue;
    for (let i = 1; i <= lighterValue; i++) {
        tones.push({
            r: rgbvalue.r + lighterR * i,
            g: rgbvalue.g + lighterG * i,
            b: rgbvalue.b + lighterB * i,
        });
    }
    for (let i = 1; i <= darkerValue; i++) {
        tones.unshift({
            r: rgbvalue.r - darkerR * i,
            g: rgbvalue.g - darkerG * i,
            b: rgbvalue.b - darkerB * i,
        });
    }
    let mathTones = tones.map((el) => {
        return { r: Math.round(el.r), g: Math.round(el.g), b: Math.round(el.b) };
    });
    return mathTones;
};
exports.hexademical = function (rgbvalue) {
    let r = rgbvalue.r < 16 ? `0${rgbvalue.r.toString(16)}` : rgbvalue.r.toString(16);
    let g = rgbvalue.g < 16 ? `0${rgbvalue.g.toString(16)}` : rgbvalue.g.toString(16);
    let b = rgbvalue.b < 16 ? `0${rgbvalue.b.toString(16)}` : rgbvalue.b.toString(16);
    return `#${r}${g}${b}`;
};
exports.demical = function (str) {
    let arr = str.split("");
    let r = parseInt(`${arr[1]}${arr[2]}`, 16);
    let g = parseInt(`${arr[3]}${arr[4]}`, 16);
    let b = parseInt(`${arr[5]}${arr[6]}`, 16);
    let rgb = { r: r, g: g, b: b };
    return rgb;
};
