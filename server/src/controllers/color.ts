import { NextFunction, Request, Response } from "express";
import { color } from "../service";

const roulette = async (req: Request, res: Response, next: NextFunction) => {
  let colors = await color.roulette(req.body.maincolor);
  console.log(colors)
  res.status(200).send(colors)

};

const recommend = async (req: Request, res: Response, next: NextFunction) => {
  let colors = await color.recommend(req.body.selectedcolor);
  console.log(colors)
  res.status(200).send(colors)

};


export default {
  roulette,
  recommend
}
