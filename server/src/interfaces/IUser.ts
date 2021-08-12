export interface IUser{
  realname: string;
  username: string;
  email: string;
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

export interface userUniqueSearchInput {
  email : string;
}