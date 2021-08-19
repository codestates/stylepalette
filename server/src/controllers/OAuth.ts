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
      }).then(response => {
        res.status(200).send({ username : response.data.id, id_token : id_token })
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
      .then((response) => {
        console.log(response)
        let name = response.data.id
        
        // 유저 데이터베이스에 생성
        res.status(200).send({ username : name, id_token : access_token })
      }).catch(e => res.status(400).send({ message : e }))

    }).catch(e => res.status(404).send({ meassage : e }))
};

export default {
  google,
  kakao
}
