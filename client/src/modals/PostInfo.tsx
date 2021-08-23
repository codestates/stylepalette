import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import { getPost, pressLike, deletePost } from '../redux/actions/action';
import { ReactComponent as HeartIcon } from '../images/heart.svg';
import { getPostState, getUser, getLikeState } from '../redux/selectors';
import { PostState, UserState } from '../redux/reducers/initialState';
import { NumberValueToken } from 'html2canvas/dist/types/css/syntax/tokenizer';

const PostInfoWrapper = styled.div`
  width: 400px;
  background-color: white;
  border: solid 1px #dbdbdb;
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.div``;

const PostImage = styled.img`
  width: 100%;
`;

const PostContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0.3em 0.3em 0.3em;
`;

const PostOwnerProfileImage = styled.img`
  width: 2.5em;
  border-radius: 50%;
  padding: 3px;
`;

const PostOwerUserName = styled.div`
  padding-right: 5px;
`;

const LikeContainer = styled.div`
  padding: 0.5em 1em 0 1em;
  display: flex;
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

export default function PostInfo(modalData: any) {
  // TODO: Create a selector to retrieve only one post based on id
  // TODO: 유저 아이디가 동일하면 포스트 삭제 버튼이 나와야함
  // TODO: 리덕스 상태를 사용하는데 상태가 바뀔때마다 속도가 느림(dispatch 를 통해 바꿔줘서 그런듯)
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  let post: PostState = useSelector(getPostState);
  let currentUser: UserState = useSelector(getUser);
  let isLiked: boolean = useSelector(getLikeState);

  console.log('currentUser:', currentUser);

  useEffect(() => {
    dispatch(
      getPost({
        postId: modalData.modalData,
      }),
    );
    handleIsDelete();
  }, [isLiked]);

  function handleIsDelete() {
    if (currentUser.userid === post.userId) {
      setIsDelete(true);
    } else {
      setIsDelete(false);
    }
  }

  function handleClickPostDelete() {
    dispatch(deletePost(modalData.modalData));
  }

  function handleLike(data: { postid: number | null; userid: number | null }) {
    dispatch(pressLike(data));
  }

  return (
    <PostInfoWrapper>
      {currentUser.userid === post.userId ? (
        <Button primary onClick={handleClickPostDelete}>
          삭제
        </Button>
      ) : null}
      <PostImage src={post.image} alt="post-img" />
      <LikeContainer>
        <LikeIconWrapper>
          {isLiked ? (
            <HeartIcon
              fill="red"
              onClick={() => handleLike({ postid: post.id, userid: currentUser.userid })}
            />
          ) : (
            <HeartIcon
              fill=""
              onClick={() => handleLike({ postid: post.id, userid: currentUser.userid })}
            />
          )}
        </LikeIconWrapper>
        <LikeCount>{post.likeCount} likes</LikeCount>
      </LikeContainer>
      <PostContentContainer>
        <Link to={`/${post.userId}`}>
          <PostOwnerProfileImage src={post.user.userimage} />
          <PostOwerUserName>{post.user.username}</PostOwerUserName>
        </Link>
        <PostTitle>{post.title}</PostTitle>
      </PostContentContainer>
    </PostInfoWrapper>
  );
}
