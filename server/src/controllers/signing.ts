import { NextFunction, Request, Response } from "express";
import { signing } from "../service";


const signUp = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  const founduser = await signing.createUser(req.body)
  console.log(founduser)
  res.send(founduser)

};
const signIn = async () => {
 
}
const signOut = async () => {
 
}

export default {
  signUp,
  signIn,
  signOut
}
