import { IUserInputDTO, userUniqueSearchInput } from "../interfaces/IUser";
import {User} from "../models/user";

const createUser = async (data: IUserInputDTO) => {
  console.log(data)
    const user = await User.findOne({
      where : {
        email : data.email
      }
    })
    
    if (!user) {
      await User.create({
        realname : data.realname,
        username : data.username,
        password : data.password,
        email : data.email,
        userimage : data.userimage
      })
      .then(res => console.log(res))
    }
    return user
}



export default {
    createUser,

};