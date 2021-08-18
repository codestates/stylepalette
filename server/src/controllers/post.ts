import { NextFunction, Request, Response } from "express";
import { IPost } from "../interfaces/IPost";
import { post } from "../service";


const getPost = async (req: Request, res: Response, next: NextFunction) => {
  if (req.params) {
    const pathPatameter : string = req.params.postid
    const result = await post.getpost(pathPatameter)
    if (result) {
      res.status(200).send(result)
    } else {
      res.status(404).send({ message : "There is no post"})
    }
  }

};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const results = await post.getposts()
  console.log(results)
    if (results) {
      res.status(200).send(results)
    } else {
      res.status(404).send({ message : "There is no post"})
    }

};

//파일업로드부분과 본문내용에 관한 요청을 분리
const postPost = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body && req.file) {
    const payload : IPost = req.body
    payload.image = req.file.location

    console.log(payload)
    const result = await post.postpost(payload)
    console.log(result)
    if (result) {
      res.status(201).send({ message : "Successed saving post" })
    } else {
      res.status(404).send({ message : "Failed saving post" })
    }
  }

};

const postLike = async (req: Request, res: Response, next: NextFunction) => {
  const pathPatameter : string = req.params.postid
  const bodyParameter : string = req.body.userid
  const result = await post.postlike(pathPatameter, bodyParameter)
  const castingResult = result as unknown as Array<[undefined, number]>
  console.log(castingResult)
  if (castingResult[0][1]) {
    res.status(201).send({ message : "Successed your request"})
  } else {
    res.status(400).send({ message : "Failed your request"})
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const pathPatameter : string = req.params.postid
  const result = await post.deletepost(pathPatameter)
  if (result) {
    res.status(200).send({ message : "Successed deleting post" })
  } else {
    res.status(404).send({ message : "Failed deleting post" })
  }
  
};



export default {
  getPost,
  getPosts,
  postPost,
  postLike,
  deletePost
}
