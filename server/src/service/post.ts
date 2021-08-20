import { IPost } from "../interfaces/IPost";
import { Post } from "../models/post";
import { tb_like } from "../models/tb_like";

const getpost = async (pathParameter : string) => {
  const post = Post.findOne({
    where : {
      id : pathParameter
    },
    include : [
      {
        model : tb_like,
        as : 'like',
        attributes : {
          exclude : ["id", "postId", "createdAt", "updatedAt"]
        }
      }
    ]
  })
  
  return post
}

const getposts = async () => {
  const posts = Post.findAll()
 
  return posts
}

const postpost = (payload : IPost) => {
  const createdPost = Post.create(payload)

  return createdPost
}

const postresult = (payload : string, pathParameter: string) => {
  const updatedPost = Post.update({
    image : payload
  },
  {
    where : {
      id : pathParameter
    }
  })

  return updatedPost
}

const postlike = async (postid : string, userid : string)=> {
  const likeRecord = await tb_like.findOne({
    where : {
      userId : userid,
      postId : postid
    }
  })
  console.log(likeRecord)

  if (!likeRecord) {
    await tb_like.create({
      userId : userid,
      postId : postid
    })
    const incrementLikeCount = await Post.increment('likeCount', {
      where : {
        id : postid
      }
    })
    return incrementLikeCount
  } else {
    await tb_like.destroy({
      where : {
        userId : userid,
        postId : postid
      }
    })
    const decrementLikeCount = await Post.increment('likeCount', {
      by: -1,
      where : {
        id : postid
      }
    })
    return decrementLikeCount
  }

}


const deletepost = async (postid: string) => {
  const deletedPost = Post.destroy({
    where : {
      id : postid
    }
  })

  return deletedPost
}

export default {
  getpost,
  getposts,
  postpost,
  postresult,
  postlike,
  deletepost
};