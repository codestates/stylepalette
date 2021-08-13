export interface IPost{
  title: string;
  image: string;
  topcolor: string;
  bottomcolor: string;
  isPublic: boolean;
  userid: number;

}

export interface postUniqueSearchInput {
  postid : number;
}