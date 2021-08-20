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

//본문내용 저장
const postPost = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body && req.params) {
    const payload : IPost = req.body
    const result = await post.postpost(payload)
    if (result) {
      res.status(201).send({ message : "Successed saving post", postid : result.id})
    } else {
      res.status(404).send({ message : "Failed saving post" })
    }
  }
};

//결과이미지 저장
const postResult = async (req: Request, res: Response, next: NextFunction) => {
  if (req.file && req.params) {
    const pathPatameter : string = req.params.postid
    const payload : string = req.file.location
    const result = await post.postresult(payload, pathPatameter)
    if (result) {
      res.status(201).send({ message : "Successed saving result image" })
    } else {
      res.status(404).send({ message : "Failed saving result image" })
    }
  }
}

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
  postResult,
  postLike,
  deletePost
}
