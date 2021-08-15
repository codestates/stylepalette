import { NextFunction, Request, Response } from "express";
import { signing } from "../service";


const signUp = async (req: Request, res: Response, next: NextFunction) => {

  const foundUser = await signing.createUser(req.body)
  res.status(201).send(foundUser)

};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  //데이터베이스 조회
  const foundUser = await signing.checkUser(req.body)
  //데이터베이스에 있으면 토큰생성하여 리스폰스로 전달
  if (foundUser) {
    const accessToken = signing.getToken(foundUser)
    if (accessToken) {
      res.cookie("jwt", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        domain: "https://api.stylepalette.net",
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: 'none'
      }).status(200).send({ message : "Successed Sign in"})
    } else {
      res.status(400).send({ message : "Failed Sign in, No Token"})
    }
  } else {
    res.status(400).send({ message : "Failed Sign in"})
  }
};

const signOut = async (req: Request, res: Response, next: NextFunction) => {
  //토큰조회
  const cookie = req.headers.cookie?.split("=") 
  if (cookie) {
    const accessToken = cookie[0]
    res.clearCookie(accessToken).status(200).send({ message : "Successed Sign out" })
  } else {
    res.status(404).send({ message : "Not found"})
  };
  
 

}

export default {
  signUp,
  signIn,
  signOut
}
