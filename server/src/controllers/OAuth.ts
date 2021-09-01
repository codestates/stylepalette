import { NextFunction, Request, Response } from "express";
import axios from "axios"
import { OAuth } from "../service";
import dotenv from "dotenv"
dotenv.config()


const google = async (req: Request, res: Response, next: NextFunction) => {
  await axios.post("https://oauth2.googleapis.com/token", {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    code: req.body.code,
    grant_type : 'authorization_code',
    redirect_uri : "https://stylepalette.net"
  })
  .then(response => {
    let params = new URLSearchParams(response.data);
    let accessToken = params.get("access_token")
    let id_token = params.get("id_token")

      axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`,{
        withCredentials : true
      }).then(async response => {
        // 유저 데이터베이스에 유저정보 저장
        const username = response.data.id
        const nickname = response.data.id
        const email = response.data.email
        const userimage = response.data.picture
        const data = { 
          username : username, 
          realname : nickname, 
          email : email, 
          userimage : userimage
        }
        const user = await OAuth.createSocialUser(data)
        const accessToken = OAuth.getToken(user)
        if (accessToken) {
          res.cookie("jwt", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            domain: ".stylepalette.net",
            path: "/",
            secure: true,
            httpOnly: true,
            sameSite: 'none'
          }).status(200).send({ message : "Successed Sign in", payload : {accessToken : accessToken, user : user}})
        } else {
          res.status(400).send({ message : "Failed Sign in, No Token"})
        }
      }).catch(e => res.status(400).send({ message : e }))
  })
  .catch(e => res.status(404).send({ meassage : e }))
};

const kakao = async (req: Request, res: Response, next: NextFunction) => {
  await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=https://stylepalette.net&code=${req.body.code}`, 
    {
      headers : {
        'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
    .then((response) => {
      let access_token = response.data.access_token
      axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers : {
          Authorization: `Bearer ${access_token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      .then(async (response) => {
        console.log(response)
        const username = response.data.id
        const nickname = response.data.properties.nickname
        const email = response.data.kakao_account.email
        const userimage = response.data.properties.profile_image
        // 유저 데이터베이스에 유저정보 저장
        const data = { 
          username : username, 
          realname : nickname, 
          email : email, 
          userimage : userimage
        }
        const user = await OAuth.createSocialUser(data)
        const accessToken = OAuth.getToken(user)
        if (accessToken) {
          res.cookie("jwt", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            domain: ".stylepalette.net",
            path: "/",
            secure: true,
            httpOnly: true,
            sameSite: 'none'
          }).status(200).send({ message : "Successed Sign in", payload : {accessToken : accessToken, user : user}})
        } else {
          res.status(400).send({ message : "Failed Sign in, No Token"})
        }

      }).catch(e => res.status(400).send({ message : e }))

    }).catch(e => res.status(404).send({ meassage : e }))
};

export default {
  google,
  kakao
}
