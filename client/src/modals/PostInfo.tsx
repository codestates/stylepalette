import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { serverUrl } from '../utils/constants';
import Modal from './Modal';
import { ReactComponent as HeartIcon } from '../images/heart.svg';
import { getPosts, getUser } from '../redux/selectors';

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

export default function PostInfo() {
  // TODO: Create a selector to retrieve only one post based on id
  const posts = useSelector(getPosts);
  const post = posts[0];
  const user = useSelector(getUser);
  console.log('user: ', user);
  console.log('posts: ', posts);
  return (
    <PostInfoWrapper>
      <PostImage src={post.image} alt="post-img" />
      <LikeContainer>
        <LikeIconWrapper>
          <HeartIcon />
        </LikeIconWrapper>
        <LikeCount>32 likes</LikeCount>
      </LikeContainer>
      <PostContentContainer>
        <PostOwnerProfileImage src={user.userimage} alt="user-profile-pic" />
        <PostOwerUserName>{user.username}</PostOwerUserName>
        <PostTitle>{post.title}</PostTitle>
      </PostContentContainer>
    </PostInfoWrapper>
  );
}
