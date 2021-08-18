import crypto from "crypto"

export interface IUser{
  id: number;
  realname: string;
  username: string;
  email: string;
  salt: string;
  password: string;
  userimage: string;
}

export interface IUserInputDTO {
  realname: string;
  username: string;
  email: string;
  password: string;
  userimage: string;
}

export interface IHashedPasswordSalt {
  password : string;
  salt : string;
}

export interface IUserCheck {
  username : string;
  password : string;
}

export interface ICheckPassword {
  password : string
}

export const createSalt = function () : Promise<string>{
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('base64'));
    });
  })
}

export const createHashedPassword = async function(password : string) : Promise<IHashedPasswordSalt> {

  const salt = await createSalt();
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err)
      resolve({ password : key.toString('base64'), salt : salt})
    })
  })
}


export const checkHashedPassword = (password : string, salt : string) : Promise<ICheckPassword> => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve({ password: key.toString('base64') });
    });
  })
}
