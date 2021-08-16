import {rgbvalue, monotone, tonInton, tonOnton, hexademical, demical } from "../interfaces/IColor";

const roulette = (colorcode : string) => {
  let demiColor = demical(colorcode)
  let rouletteColor = tonOnton(demiColor)
  let hexRouletteColor = rouletteColor.map((el:rgbvalue) => hexademical(el))
  return hexRouletteColor
}

const recommend = async (colorcode : string) => {
  let demiColor = demical(colorcode)
  let titColor = tonInton(demiColor)
  let totColor = tonOnton(demiColor)
  let monoColor = monotone(demiColor, 25)

  let recommendColors  = {
    tonInton : titColor.map((el:rgbvalue) => hexademical(el)), 
    tonOnton : totColor.map((el:rgbvalue) => hexademical(el)), 
    monoton : monoColor.map((el:rgbvalue) => hexademical(el))
  }
 
  return recommendColors
}

export default {
  roulette,
  recommend
};