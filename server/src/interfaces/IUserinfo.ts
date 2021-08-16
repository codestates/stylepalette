export interface ITokenInfo {
  id: number
  username: string
  realname: string
  email: string
  salt: string
  userimage: string
  iat: number
  exp: number 
}

export interface IPatchUserInfo {
  realname? : string
  email? : string
  password? : string
  salt? : string
}