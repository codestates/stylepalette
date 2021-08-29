import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { SecondaryButton } from '../components/Button/Button.styled';
import { getPost, updateLikeList, deletePost } from '../redux/actions/action';
import { ReactComponent as HeartIcon } from '../images/heart.svg';
import { getPostState, getUser, getLikeState } from '../redux/selectors';
import { PostState, UserState } from '../redux/reducers/initialState';
import { NumberValueToken } from 'html2canvas/dist/types/css/syntax/tokenizer';

const PostInfoWrapper = styled.div`
  width: 400px;
  border: solid 2px black;
  border-radius: 10px;
  background-color: black;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 320px;
  }
`;

const PostTitleContainer = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 2px solid black;
  background-color: black;
`;

const PostTitle = styled.div`
  font-weight: bold;
  align-items: center;
  font-size: 1.2rem;
  padding: 5px;
  color: white;
`;

const PostImage = styled.img`
  width: 100%;
  border-bottom: 2px solid black;
`;

const PostContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.3em 0.3em 0.3em;
`;

const PostOwnerProfileImage = styled.img`
  width: 3.5em;
  border-radius: 50%;
  margin: 5px;
`;

const PostOwerUserName = styled.div`
  padding-top: 3px;
  padding-left: 5px;
  color: white;
`;

const LikeContainer = styled.span`
  display: flex;
  flex-direction: flex-end;
  color: white;
  padding: 0 10px;
  justify-content: flex-end;
  align-items: center;
`;

const LikeIconWrapper = styled.span`
  width: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LikeCount = styled.span`
  padding-left: 5px;
  font-weight: bold;
`;

const OtherUserLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: black;
  align-items: center;
`;

const PostDeleteButton = styled(SecondaryButton)`
  position: relative;
  left: 80%;
  width: 55px;
  height: 30px;
  font-weight: bold;
  @media (max-width: 768px) {
    left: 75%;
  }
`;

export default function PostInfo(modalData: any) {
  // TODO: Create a selector to retrieve only one post based on id
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const post: PostState = useSelector(getPostState);
  const currentUser: UserState = useSelector(getUser);
  // const isLiked: boolean = useSelector(getLikeState);
  const likeList = post.like.map((el) => el.userId);

  console.log('modalData:', modalData);

  useEffect(() => {
    handleIsDelete();
  }, []);

  function handleIsDelete() {
    if (currentUser.userid === post.userId) {
      setIsDelete(true);
    } else {
      setIsDelete(false);
    }
  }

  function handleClickPostDelete() {
    dispatch(
      deletePost({
        postId: post.id,
      }),
    );
  }

  function handleLike(data: { postid: number | null; userid: number | null; like: boolean }) {
    dispatch(updateLikeList(data));
  }

  console.log('Likelist', likeList);
  return (
    <PostInfoWrapper>
      {currentUser.userid === post.userId ? (
        <PostDeleteButton onClick={handleClickPostDelete}>삭제</PostDeleteButton>
      ) : null}
      <PostTitleContainer>
        <PostTitle>{post.title}</PostTitle>
      </PostTitleContainer>
      <PostImage src={post.image} alt="post-img" />
      <PostContentContainer>
        <OtherUserLink to={`/user/${post.userId}`}>
          <PostOwnerProfileImage src={post.user.userimage} />
          <PostOwerUserName>{post.user.username}</PostOwerUserName>
        </OtherUserLink>
        <LikeContainer>
          <LikeIconWrapper>
            {likeList.includes(currentUser.userid) ? (
              <HeartIcon
                fill="#F44336"
                onClick={() =>
                  handleLike({ postid: post.id, userid: currentUser.userid, like: false })
                }
              />
            ) : (
              <HeartIcon
                fill="#FFFFFF"
                onClick={() =>
                  handleLike({ postid: post.id, userid: currentUser.userid, like: true })
                }
              />
            )}
          </LikeIconWrapper>
          <LikeCount>{likeList.length} likes</LikeCount>
        </LikeContainer>
      </PostContentContainer>
    </PostInfoWrapper>
  );
}
