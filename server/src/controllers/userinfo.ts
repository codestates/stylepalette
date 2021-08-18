import { NextFunction, Request, Response } from "express";
import { ITokenInfo, IPatchUserInfo, ICheckUser } from "../interfaces/IUserinfo";
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

//사진업로드부분과 본문내용에 관한 요청을 분리
const patchUserinfo = async (req: Request, res: Response, next: NextFunction) => {
  
  if (req.file || req.body) {
    const payload : IPatchUserInfo = req.body
    const location = req.file?.location
    const pathParameter : string = req.params.userid
    let resultArray = []
    if (location) {
      const result = await userinfo.imageUpload(location, pathParameter)
      resultArray.push(result)
    }
    if (payload) {
      const result = await userinfo.patchuserinfo(payload, pathParameter)
      resultArray.push(result)
    }
    
    if (resultArray.length > 0) {
      res.status(200).send({ message : "Successed changing your information" })
    } else {
      res.status(400).send({ message : "Failed changing your information" })
    }
  } else {
    res.status(400).send({ message : "There is no information to change" })
  }
};

const postCheckUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    const payload : ICheckUser = req.body
    const result = await userinfo.checkUser(payload)

    if (result) {
      res.status(200).send({ message : "This user is verified"})
    } else {
      res.status(400).send({ message : "Invalid user"})
    }
  }
 

}
export default {
  getUserinfo,
  patchUserinfo,
  postCheckUser
}
