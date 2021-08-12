export interface rgbvalue {
  r : number
  g : number
  b : number
}
export interface tone {
  (rgbvalue : rgbvalue) : rgbvalue[]
}
// export const monotone : tone = function(rgbvalue: { r: number, g: number, b: number}) : object {
  
//   let mono = Math.floor((rgbvalue.r+rgbvalue.g+rgbvalue.b)/3)

//   return { r: mono, g: mono, b: mono }
// }
// export const vividtone : tone = function(rgbvalue: { [r:string]: number, g: number, b: number }) : object {
  
//   let max = Math.max(rgbvalue.r, rgbvalue.g, rgbvalue.b)
//   let min = Math.min(rgbvalue.r, rgbvalue.g, rgbvalue.b)

//   for (let keys in rgbvalue) {
//     if (rgbvalue[keys] === max) {
//       rgbvalue[keys] = 255
//     } else if (rgbvalue[keys] === min) {
//       rgbvalue[keys] = 0
//     }
//   }

//   return rgbvalue
// }
export const tonInton : tone = function(rgbvalue: rgbvalue) : rgbvalue[] {

  let max = Math.max(rgbvalue.r, rgbvalue.g, rgbvalue.b)
  let min = Math.min(rgbvalue.r, rgbvalue.g, rgbvalue.b)
  let mid = Math.round((max+min)/2)

  let tones = [
    rgbvalue,
    { r : max, g : min, b : min },
    { r : min, g : max, b : min },
    { r : min, g : min, b : max },
    { r : max, g : max, b : min },
    { r : max, g : min, b : max },
    { r : min, g : max, b : max },
    { r : max, g : mid, b : min },
    { r : max, g : min, b : mid },
    { r : mid, g : max, b : min },
    { r : mid, g : max, b : mid },
    { r : mid, g : min, b : max },
    { r : min, g : mid, b : max },
  ]

  return tones
}
export const tonOnton: tone= function(rgbvalue: rgbvalue) : rgbvalue[] {
  let distance = 18;
  let tones = [rgbvalue];
  //반복문 모든 숫자가 0이나 255가 될때까지 빼거나 더한다.
  while (tones[0].r > 0 || tones[0].g > 0 || tones[0].b > 0) {
    let r: number = (tones[0].r - distance > 0) ? tones[0].r-distance : 0
    let g: number = (tones[0].g - distance > 0) ? tones[0].g-distance : 0
    let b: number = (tones[0].b - distance > 0) ? tones[0].b-distance : 0
    let rgb : rgbvalue = {r: r, g: g, b: b}
    tones.unshift(rgb)
  }

  while (tones[tones.length-1].r < 255 || tones[tones.length-1].g < 255 || tones[tones.length-1].b < 255) {
    let r: number = (tones[tones.length-1].r + distance < 255) ? tones[tones.length-1].r + distance : 255
    let g: number = (tones[tones.length-1].g + distance < 255) ? tones[tones.length-1].g + distance : 255
    let b: number = (tones[tones.length-1].b + distance < 255) ? tones[tones.length-1].b + distance : 255
    let rgb : rgbvalue = {r: r, g: g, b: b}
    tones.push(rgb)
  }

  return tones
}
export const hexademical = function(rgbvalue : rgbvalue) : string {

  let r: string = rgbvalue.r < 17 ? `0${rgbvalue.r.toString(16)}` : rgbvalue.r.toString(16);
  let g: string = rgbvalue.g < 17 ? `0${rgbvalue.g.toString(16)}` : rgbvalue.g.toString(16);
  let b: string = rgbvalue.b < 17 ? `0${rgbvalue.b.toString(16)}` : rgbvalue.b.toString(16);

  return `#${r}${g}${b}`;
}
export const demical = function(str : string) : rgbvalue {
  let arr = str.split("");

  let r: number = parseInt(`${arr[1]}${arr[2]}`, 16);
  let g: number = parseInt(`${arr[3]}${arr[4]}`, 16);
  let b: number = parseInt(`${arr[5]}${arr[6]}`, 16);
  let rgb : rgbvalue = {r: r, g: g, b: b}
  return rgb

}


