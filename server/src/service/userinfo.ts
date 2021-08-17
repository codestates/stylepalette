import { ITokenInfo, IPatchUserInfo } from "../interfaces/IUserinfo";
import { createHashedPassword, IHashedPasswordSalt } from "../interfaces/IUser";
import awsSDK from "aws-sdk"
import {User} from "../models/user";
import {Post} from "../models/post";

const getuserinfo = (tokenInfo : ITokenInfo) => {
  const info = User.findAll({
    where : {
      id : tokenInfo.id
    },
    attributes : {
      exclude : ["password", "salt", "createdAt", "updatedAt"]
    },
    include : [
      {
        model : Post,
        as : 'post',
        attributes : {
          exclude : ["updatedAt"]
        }
      }
    ]
  })
  
  return info
} 

const patchuserinfo = async (payload : IPatchUserInfo, pathParameter : string) => {
  if (payload.password) {
    const newPasswordAndSalt : IHashedPasswordSalt = await createHashedPassword(payload.password)
    payload.password = newPasswordAndSalt.password
    payload.salt = newPasswordAndSalt.salt
  }
  console.log(payload)
  const updatedUserInfo = User.update(payload, {
    where : {
      id : pathParameter
    }
  })

  return updatedUserInfo
}
const imageUpload = () => {
  
}

export default {
  getuserinfo,
  patchuserinfo,
  imageUpload
};

// {
//   "username" : "ggh0223",
//   "password" : "163700as",
//   "realname" : "kyu",
//   "email" : "ggh163700@gmail.com",
//   "userimage" : "image"
// }