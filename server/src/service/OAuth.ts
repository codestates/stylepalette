import { User } from "../models/user";
import { ISocialUserInputDTO, ISocialUser } from "../interfaces/IOAuth";
import { sign, verify } from "jsonwebtoken"

export const createSocialUser = async (data: ISocialUserInputDTO) => {
    const user = await User.findOne({
      where : {
        username : data.username,
        email : data.email
      },
      attributes : {
        exclude : ["createdAt", "updatedAt"]
      }
    })
  
    if (!user) {
    
      const createdSocialUser = await User.create({
        realname : data.realname,
        username : data.username,
        password :null,
        salt : null,
        email : data.email,
        userimage : data.userimage
      })
      
      return createdSocialUser
    }
  
    return user
}

export const getToken = function (data : ISocialUser) {
  let accessSecret = process.env.ACCESS_SECRET ? process.env.ACCESS_SECRET : undefined

  if (accessSecret) {
    return sign(
      {
        id: data.id,
        username: data.username,
        realname: data.realname,
        email: data.email,
      },
      accessSecret,
      { expiresIn: "1800s" }
    );
  } else {
    return accessSecret
  }
}

export default {
  createSocialUser,
  getToken
};