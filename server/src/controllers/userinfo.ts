import { NextFunction, Request, Response } from "express";
import { ITokenInfo, IPatchUserInfo } from "../interfaces/IUserinfo";
import { verify } from "jsonwebtoken"
import { userinfo } from "../service";
import dotenv from "dotenv"
dotenv.config()


const getUserinfo = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.jwt) {
    const accessSecret = process.env.ACCESS_SECRET ? process.env.ACCESS_SECRET : undefined

    if (accessSecret) {
      const tokenInfo = verify(req.cookies.jwt, accessSecret)
      const userInfo = await userinfo.getuserinfo(tokenInfo as ITokenInfo)
      res.status(200).send(userInfo)
    } else {
      res.status(400).send({ message : "No access secret"})
    }
  } else {
    res.status(404).send({ message : "No token"})
  }
};

const patchUserinfo = async (req: Request, res: Response, next: NextFunction) => {
  
  if (req.params && req.body) {
    const payload : IPatchUserInfo = req.body
    const pathParameter : string = req.params.userid
    const result = await userinfo.patchuserinfo(payload, pathParameter)
    if (result) {
      res.status(200).send({ message : "Successed changing your information" })
    } else {
      res.status(400).send({ message : "Failed changing your information" })
    }
  } else {
    res.status(400).send({ message : "Failed changing your information" })
  }


};

export default {
  getUserinfo,
  patchUserinfo
}
