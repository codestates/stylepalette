import { IUser, IUserInputDTO, IHashedPasswordSalt, IUserCheck, createHashedPassword, checkHashedPassword } from "../interfaces/IUser";
import {User} from "../models/user";
import { sign, verify } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const createUser = async (data: IUserInputDTO) => {
  console.log(data)
    const userUsername = await User.findOne({
      where : {
        username : data.username
      },
      attributes : {
        exclude : ["createdAt", "updatedAt"]
      }
    })

    const userEmail = await User.findOne({
      where : {
        email : data.email
      },
      attributes : {
        exclude : ["createdAt", "updatedAt"]
      }
    })
    
    if (!userUsername && !userEmail) {
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

    return { username : userUsername, email : userEmail }
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
  const salt =  user?.salt
  if (salt) {
    const checkecdPassword = await checkHashedPassword(data.password, salt)
    if (user?.password === checkecdPassword.password) {
      return user
    } else {
      const message : string = "Wrong password"
      return message
    }
  } else {
    return user
  }
  
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