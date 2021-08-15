import { IUser, IUserInputDTO, IHashedPasswordSalt, IUserCheck, createHashedPassword, checkHashedPassword } from "../interfaces/IUser";
import {User} from "../models/user";
import { sign, verify } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const createUser = async (data: IUserInputDTO) => {
  console.log(data)
    const user = await User.findOne({
      where : {
        username : data.username,
        email :  data.email
      },
      attributes : {
        exclude : ["createdAt", "updatedAt"]
      }
    })
    
    if (!user) {
      const passwordAndSalt : IHashedPasswordSalt = await createHashedPassword(data.password)

      await User.create({
        realname : data.realname,
        username : data.username,
        password : passwordAndSalt.password,
        salt : passwordAndSalt.salt,
        email : data.email,
        userimage : data.userimage
      })
      .then(res => console.log(res))
    }
    return user
}

export const checkUser = async function (data : IUserCheck) {
  const user = await User.findOne({
    where : {
      username : data.username
    },
    attributes : {
      exclude : ["createdAt", "updatedAt"]
    }
  })

  return user
}


export const getToken = function (data : User) {
  let accessSecret = process.env.ACCESS_SECRET ? process.env.ACCESS_SECRET : undefined

  if (accessSecret) {
    return sign(
      {
        id: data.id,
        username: data.username,
        realname: data.realname,
        email: data.email,
        salt: data.salt,
      },
      accessSecret,
      { expiresIn: "1800s" }
    );
  } else {
    return accessSecret
  }
}

export const checkToken = function () {
  
}


export default {
    createUser,
    checkUser,
    getToken
};