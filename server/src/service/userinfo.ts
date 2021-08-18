import { ITokenInfo, IPatchUserInfo, ICheckUser } from "../interfaces/IUserinfo";
import { createHashedPassword, IHashedPasswordSalt, checkHashedPassword } from "../interfaces/IUser";
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
  const updatedUserInfo = User.update(payload, {
    where : {
      id : pathParameter
    }
  })

  return updatedUserInfo
}
const imageUpload = (location : string, pathParameter : string) => {
  const updateUserImage = User.update({
    userimage : location
  }, {
    where : {
      id : pathParameter
    }
  })

  return updateUserImage
}

const checkUser = async (payload : ICheckUser) => {

  const user = await User.findOne({
    where : {
      username : payload.username,
    }
  })

  const salt =  user?.salt
  if (salt) {
    const checkecdPassword = await checkHashedPassword(payload.password, salt)
    if (user?.password === checkecdPassword.password) {
      return user
    } else {
      return undefined
    }
  } else {
    return undefined
  }
}

export default {
  getuserinfo,
  patchuserinfo,
  imageUpload,
  checkUser
};

// {
//   "username" : "ggh0223",
//   "password" : "163700as",
//   "realname" : "kyu",
//   "email" : "ggh163700@gmail.com",
//   "userimage" : "image"
// }