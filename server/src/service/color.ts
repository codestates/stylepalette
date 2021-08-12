import {rgbvalue, tone} from "./utils";
import { tonInton, tonOnton, hexademical, demical} from "./utils";

const roulette = async (colorcode : string) => {
  let demiColor = demical(colorcode)
  let rouletteColor = tonOnton(demiColor)
  let hexRouletteColor = rouletteColor.map((el:rgbvalue) => hexademical(el))
  return hexRouletteColor
}

const recommend = async () => {

}

export default {
  roulette,
  recommend
};